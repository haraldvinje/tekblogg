import Link from 'next/link'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { Category } from '@/components/category'
import { BlogPostCard } from './blog-post-card'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({
  posts,
  searchParamsCategories
}: {
  posts: BlogPostMetadata[]
  searchParamsCategories: string[]
}) {
  const allCategories = posts
    .flatMap((post) => post.categories)
    .filter(
      (category, index, categories) =>
        categories.map((c) => c.slug.current).indexOf(category.slug.current) === index
    )
    .filter(notEmpty)

  const invalidCategorySearch =
    searchParamsCategories.filter((selectedCategory) =>
      allCategories.map((category) => category.slug.current).includes(selectedCategory)
    ).length === 0

  const filteredPosts =
    searchParamsCategories.length === 0 || invalidCategorySearch
      ? posts
      : posts.filter(
          (p) =>
            p.categories?.some((blogPostCategory) =>
              searchParamsCategories.includes(blogPostCategory.slug.current)
            )
        )

  return (
    <>
      <div className="mb-8">
        <p className="mb-2 mt-4 text-center text-2xl font-bold text-gray-500 dark:text-gray-300">
          Filtrer på kategori
        </p>
        {allCategories.map((category, index) => {
          const newCategories = searchParamsCategories.includes(category.slug.current)
            ? searchParamsCategories.filter(
                (searchCategory) => searchCategory !== category.slug.current
              )
            : [...searchParamsCategories, category.slug.current]
          return (
            <Link
              key={index}
              href={{
                pathname: '/',
                query: {
                  category: newCategories
                }
              }}
            >
              <Category
                key={index}
                value={category.title}
                clickable
                clicked={searchParamsCategories.includes(category.slug.current)}
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
