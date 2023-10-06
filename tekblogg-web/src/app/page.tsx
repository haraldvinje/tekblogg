import { AnimationWrapper } from '@/components/animation-wrapper'
import { getAllBlogPostsHomepageData } from '@/lib/sanity-client'
import { Home } from './home'

export const revalidate = 60

export default async function Page() {
  const posts = await getAllBlogPostsHomepageData()
  return (
    <AnimationWrapper>
      <Home blogPostsHomePageData={posts} />
    </AnimationWrapper>
  )
}
