'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { Category } from '@/components/category'
import { BlogPostCard } from './blog-post-card'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({ posts }: { posts: BlogPostMetadata[] }) {
  const pathname = usePathname()
  const searchParamCategories = useSearchParams().getAll('category')

  const allCategories = useMemo(
    () =>
      posts
        .flatMap((post) => post.categories)
        .filter(
          (category, index, categories) =>
            categories.map((c) => c.slug.current).indexOf(category.slug.current) === index
        )
        .filter(notEmpty),
    [posts]
  )

  const filteredPosts =
    searchParamCategories.length === 0
      ? posts
      : posts.filter(
          (p) =>
            p.categories?.some((blogPostCategory) =>
              searchParamCategories.includes(blogPostCategory.slug.current)
            )
        )

  return (
    <>
      <div className="mb-8">
        <p className="mb-2 mt-4 text-center text-2xl font-bold text-gray-500 dark:text-gray-300">
          Filtrer på kategori
        </p>
        {allCategories.map((category, index) => {
          const newCategories = searchParamCategories.includes(category.slug.current)
            ? searchParamCategories.filter(
                (searchCategory) => searchCategory !== category.slug.current
              )
            : [...searchParamCategories, category.slug.current]
          return (
            <Link
              key={index}
              href={{
                pathname,
                query: {
                  category: newCategories
                }
              }}
            >
              <Category
                key={index}
                value={category.title}
                clickable
                clicked={searchParamCategories.includes(category.slug.current)}
              />
            </Link>
          )
        })}
      </div>
      {filteredPosts.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
    </>
  )
}
