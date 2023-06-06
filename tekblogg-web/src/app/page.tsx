import { AnimationWrapper } from '@/components/animation-wrapper'
import { getAllBlogPostsMetadata } from '@/lib/sanity-client'
import { BlogPostList } from './blog-post-list'

export default async function Home() {
  const posts = await getAllBlogPostsMetadata()
  return (
    <div className="w-[80%]">
      <AnimationWrapper>
        <BlogPostList posts={posts} />
      </AnimationWrapper>
    </div>
  )
}
