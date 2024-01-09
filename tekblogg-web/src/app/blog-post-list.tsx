'use client'

import { useMemo, useState } from 'react'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { Category } from '@/components/category'
import { BlogPostCard } from './blog-post-card'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({ postsMetadata }: { postsMetadata: BlogPostMetadata[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

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

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredPosts =
    selectedCategories.length === 0
      ? postsMetadata
      : postsMetadata.filter(
          (p) => p.categories?.some((category) => selectedCategories.includes(category.title))
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
              <Category key={index} value={category.title} onCategoryClick={handleCategoryClick} />
            )
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((postMetadata, index) => (
          <BlogPostCard key={index} postMetadata={postMetadata} />
        ))}
      </div>
    </>
  )
}
