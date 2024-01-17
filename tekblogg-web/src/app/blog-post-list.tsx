'use client'

import { Suspense, useCallback, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { CategoryLink } from '@/components/category-link'
import { CategoryUi } from '@/components/category-ui'
import { BlogPostCard } from './blog-post-card'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({ postsMetadata }: { postsMetadata: BlogPostMetadata[] }) {
  const allCategories = useMemo(
    () =>
      postsMetadata
        .flatMap((post) => post.categories)
        .filter(
          (category, index, categories) =>
            categories.map((c) => c.slug.current).indexOf(category.slug.current) === index
        )
        .filter(notEmpty),
    [postsMetadata]
  )

  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryQueryKey = 'category'
  const selectedCategories = searchParams.getAll(categoryQueryKey)

  const filterInvalidCategories = useCallback(() => {
    const validCategories = selectedCategories.filter((selectedCategory) =>
      allCategories.map((c) => c.slug.current).includes(selectedCategory)
    )
    if (validCategories.length === selectedCategories.length) return
    const params = new URLSearchParams()
    validCategories.forEach((c) => params.append(categoryQueryKey, c))
    router.replace(`/?${params.toString()}`)
  }, [allCategories, router, selectedCategories])

  useEffect(() => {
    filterInvalidCategories()
  }, [filterInvalidCategories])

  const filteredPosts =
    selectedCategories.length === 0
      ? postsMetadata
      : postsMetadata.filter((p) =>
          p.categories?.some((category) => selectedCategories.includes(category.slug.current))
        )

  return (
    <>
      <div className="mb-8">
        <p className="mb-2 mt-4 text-center text-xl font-bold text-gray-500 dark:text-gray-300 sm:text-2xl">
          Filtrer på kategori
        </p>
        {allCategories.map(
          (category, index) =>
            category && (
              <Suspense key={index} fallback={<CategoryUi value={category.title} />}>
                <CategoryLink
                  value={category.title}
                  slug={category.slug.current}
                  isSelected={selectedCategories.includes(category.slug.current)}
                />
              </Suspense>
            )
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlogPosts postsMetadata={filteredPosts} />
      </div>
    </>
  )
}

export function BlogPosts({ postsMetadata }: { postsMetadata: BlogPostMetadata[] }) {
  return (
    <>
      {postsMetadata.map((postMetadata, index) => (
        <BlogPostCard key={index} postMetadata={postMetadata} />
      ))}
    </>
  )
}
