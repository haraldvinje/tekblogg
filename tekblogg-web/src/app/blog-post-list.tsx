'use client'

import { useState, useMemo } from 'react'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { Category } from '@/components/category'
import { BlogPostCard } from './blog-post-card'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({ posts }: { posts: BlogPostMetadata[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const allCategories = useMemo(
    () =>
      posts
        .flatMap((post) => post.categories)
        .filter((category, index, categories) => categories.indexOf(category) === index)
        .filter(notEmpty),
    [posts]
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
      ? posts
      : posts.filter((p) => p.categories?.some((category) => selectedCategories.includes(category)))

  return (
    <>
      <div className="mb-8">
        <p className="mb-2 mt-4 text-center text-2xl font-bold text-gray-500 dark:text-gray-300">
          Filtrer på kategori
        </p>
        {allCategories.map(
          (category, index) =>
            category && (
              <Category key={index} value={category} onCategoryClick={handleCategoryClick} />
            )
        )}
      </div>
      {filteredPosts.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
    </>
  )
}
