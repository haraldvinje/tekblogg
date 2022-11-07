'use client'

import { useState, useMemo } from 'react'
import Metatags from 'src/components/Metatags'
import BlogPostCard from 'src/components/BlogPostCard'
import { Category } from 'src/components/Category'
import { PostCardData } from 'src/app/page'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

const Home = ({ posts }: { posts: PostCardData[] }) => {
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
      : posts.filter((p) => p.categories?.some((c) => selectedCategories.includes(c)))

  return (
    <>
      <div className="w-[80%]">
        <div className="mb-4 p-2">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-500">Filtrer på kategori</h1>
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
      </div>
    </>
  )
}

export default Home
