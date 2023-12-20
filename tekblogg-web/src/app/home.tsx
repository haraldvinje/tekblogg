import { BlogPostMetadata } from '@/lib/sanity-client'
import { BlogPostList } from './blog-post-list'

export function Home({
  blogPostsMetadata: blogPostsMetadata
}: {
  blogPostsMetadata: BlogPostMetadata[]
}) {
  return (
    <div className="w-[80%]">
      <h1 className="text-center text-4xl font-bold dark:text-white">Velkommen til TekBlogg!</h1>
      <BlogPostList postsMetadata={blogPostsMetadata} />
    </div>
  )
}
