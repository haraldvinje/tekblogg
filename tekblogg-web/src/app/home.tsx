import { Suspense } from 'react'
import { BlogPostMetadata } from '@/lib/sanity-client'
import { BlogPostList, BlogPosts } from './blog-post-list'

export function Home({
  blogPostsMetadata: blogPostsMetadata
}: {
  blogPostsMetadata: BlogPostMetadata[]
}) {
  return (
    <div className="w-[80%]">
      <h1 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">
        Velkommen til TekBlogg!
      </h1>
      <Suspense fallback={<BlogPosts postsMetadata={blogPostsMetadata} />}>
        <BlogPostList postsMetadata={blogPostsMetadata} />
      </Suspense>
    </div>
  )
}
