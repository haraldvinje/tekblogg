import { Suspense } from 'react'
import { BlogPostList, BlogPostCards } from './blog-post-list'
import { BlogPostMetadata } from '@/lib/sanity-client'

export function Home({
  blogPostsMetadata: blogPostsMetadata
}: {
  blogPostsMetadata: BlogPostMetadata[]
}) {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">
        Velkommen til TekBlogg!
      </h1>
      <Suspense fallback={<BlogPostCards postsMetadata={blogPostsMetadata} />}>
        <BlogPostList postsMetadata={blogPostsMetadata} />
      </Suspense>
    </div>
  )
}
