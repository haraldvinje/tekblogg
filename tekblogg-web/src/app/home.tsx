import { BlogPostMetadata } from '@/lib/sanity-client'
import { BlogPostList } from './blog-post-list'

export function Home({ blogPostsMetadata }: { blogPostsMetadata: BlogPostMetadata[] }) {
  return (
    <div className="w-[80%] ">
      <h1 className="my-2 text-center text-4xl font-bold">Velkommen til TekBlogg!</h1>
      <BlogPostList posts={blogPostsMetadata} />
    </div>
  )
}
