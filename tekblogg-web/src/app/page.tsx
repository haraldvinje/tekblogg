import { Home } from './home'
import { PageTransition } from '@/components/page-transition'
import { getAllBlogPostsCardData } from '@/lib/sanity-client'

export const revalidate = 60

export default async function Page() {
  const posts = await getAllBlogPostsCardData()
  return (
    <PageTransition>
      <Home blogPostCards={posts} />
    </PageTransition>
  )
}
