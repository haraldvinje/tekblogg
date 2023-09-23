import { AnimationWrapper } from '@/components/animation-wrapper'
import { convertToStringArray } from '@/lib/text-utils'
import { getAllBlogPostsMetadata } from '@/lib/sanity-client'
import { Home } from './home'

export const revalidate = 60

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const posts = await getAllBlogPostsMetadata()
  const searchParamsCategories = convertToStringArray(searchParams.category)
  return (
    <AnimationWrapper>
      <Home blogPostsMetadata={posts} searchParamsCategories={searchParamsCategories} />
    </AnimationWrapper>
  )
}
