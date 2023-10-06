import { ReactNode } from 'react'
import { BlogPostHomePageData, BlogPostMetadata } from '@/lib/sanity-client'
import { RichText } from '@/components/rich-text'
import { BlogPostList } from './blog-post-list'

export type ComponentsDictionary = { [key: string]: ReactNode }

export function Home({ blogPostsHomePageData }: { blogPostsHomePageData: BlogPostHomePageData[] }) {
  const blogPostIntroductionsServerComponentsDictionary: ComponentsDictionary = Object.fromEntries(
    blogPostsHomePageData.map((post) => [
      post.slug,
      <RichText key={post.slug} className="mb-2 text-sm" value={post.introduction} />
    ])
  )

  const blogPostsMetadata = blogPostsHomePageData.map((post) => {
    const { introduction: _, ...postMetadata } = post
    return postMetadata as BlogPostMetadata
  })

  return (
    <div className="w-[80%]">
      <h1 className="text-center text-4xl font-bold dark:text-white">Velkommen til TekBlogg!</h1>
      <BlogPostList
        postsMetadata={blogPostsMetadata}
        introductionComponentsDictionary={blogPostIntroductionsServerComponentsDictionary}
      />
    </div>
  )
}
