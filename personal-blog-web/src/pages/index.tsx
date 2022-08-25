import { useEffect, useState } from 'react'
import groq from 'groq'
import client from 'src/lib/sanityClient'
import Metatags from 'src/components/Metatags'
import BlogPostCard from 'src/components/BlogPostCard'
import { Category } from 'src/components/Category'
import { Post } from 'src/pages/post/[slug]'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

const Home = ({ posts }: { posts: PostCardData[] }) => {
  const [filteredPosts, setFilteredPosts] = useState<PostCardData[]>(posts)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    if (selectedCategories.length === 0) setFilteredPosts(posts)
    else
      setFilteredPosts(
        posts.filter((p) => {
          return p.categories?.some((c) => selectedCategories.includes(c))
        })
      )

    return () => {
      setFilteredPosts([])
    }
  }, [selectedCategories, posts])

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const allCategories = posts
    .flatMap((post) => post.categories)
    .filter((category, index, categories) => categories.indexOf(category) === index)
    .filter(notEmpty)

  return (
    <>
      <Metatags
        title="TekBlogg"
        description="Velkommen til TekBloggen! Sjekk ut det nyeste innen teknologi og programmering her."
      />
      <div className="w-[80%]">
        <div className="mb-4 p-2">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-500">Filtrer på kategori</h1>
          {allCategories.map(
            (category, index) =>
              category && (
                <Category
                  key={index}
                  value={category}
                  onCategoryClick={(category) => handleCategoryClick(category)}
                />
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

export type PostCardData = Omit<Post, 'body' | 'authors'>

export const getStaticProps = async () => {
  const posts: PostCardData[] = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      title,
      "categories": categories[]->title,
      "publishedAt": publishedAt,
      "slug": slug.current,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      mainImage,
      introduction
    }`
  )

  return {
    props: {
      posts
    },
    revalidate: 60
  }
}

export default Home
