import { AnimationWrapper } from '@/components/animation-wrapper'
import { getAllBlogPostsMetadata } from '@/lib/sanity-client'
import { Home } from './home'

export default async function Page() {
  const posts = await getAllBlogPostsMetadata()
  return (
    <AnimationWrapper>
      <Home blogPostsMetadata={posts} />
    </AnimationWrapper>
  )
}
