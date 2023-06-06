import { getAllSlugs, getBlogPost, urlFor } from '@/lib/sanity-client'
import { richToPlainText } from '@/lib/text-utils'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { BlogPost } from './blog-post'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { title, mainImage, introduction } = await getBlogPost(params.slug)
  const rawIntro = richToPlainText(introduction)
  const imageUrl = urlFor(mainImage)

  const commonFields = {
    title,
    description: rawIntro
  }

  return {
    twitter: {
      cardType: 'summary_large_image',
      creator: '@haraldvin',
      images: {
        url: imageUrl,
        alt: title
      },
      ...commonFields
    },
    openGraph: {
      type: 'article',
      images: [imageUrl],
      ...commonFields
    },
    ...commonFields
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()

  return slugs.map((slug) => ({
    slug
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  return (
    <AnimationWrapper>
      <BlogPost post={post} />
    </AnimationWrapper>
  )
}
