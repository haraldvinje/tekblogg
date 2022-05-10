import groq from 'groq'
import { useEffect, useState, useCallback } from 'react'
import client from 'lib/sanityClient'
import Metatags from 'components/Metatags'
import BlogPostCard from 'components/BlogPostCard'
import { Post } from './post/[slug]'
import { Pagination } from 'components/Pagination'
import { Category } from 'components/Category'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

const Home = ({ posts }: { posts: PostCardData[] }) => {
  const itemsPerPage = 5
  const [filteredPosts, setFilteredPosts] = useState<PostCardData[]>(posts)
  const [pagesCount, setPagesCount] = useState<number>(Math.ceil(posts.length / itemsPerPage))
  const [postsInPage, setPostsInPage] = useState<PostCardData[]>(posts.slice(0, itemsPerPage))
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

  const handlePageClick = useCallback(
    (pageNumber: number) => {
      const newOffset = (pageNumber * itemsPerPage) % filteredPosts.length
      setPostsInPage(filteredPosts.slice(newOffset, newOffset + itemsPerPage))
    },
    [filteredPosts]
  )

  useEffect(() => {
    setPostsInPage(filteredPosts.slice(0, itemsPerPage))
    setPagesCount(Math.ceil(filteredPosts.length / itemsPerPage))
    handlePageClick(0)
    return () => {
      setPostsInPage([])
    }
  }, [filteredPosts, handlePageClick, posts, selectedCategories])

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
                  onClick={() => handleCategoryClick(category)}
                />
              )
          )}
        </div>
        {postsInPage.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
        {filteredPosts.length > itemsPerPage && (
          <Pagination onPageChange={handlePageClick} pagesCount={pagesCount} />
        )}
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
