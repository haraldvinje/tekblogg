import { Home } from './home'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { getAllBlogPostsMetadata } from '@/lib/sanity-client'

export const revalidate = 60

export default async function Page() {
  const posts = await getAllBlogPostsMetadata()
  return (
    <AnimationWrapper>
      <Home blogPostsMetadata={posts} />
    </AnimationWrapper>
  )
}
