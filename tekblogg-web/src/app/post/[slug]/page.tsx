import { notFound } from 'next/navigation'
import { getAllSlugs, getBlogPost, urlFor } from '@/lib/sanity-client'
import {
  richToPlainText,
  getAppropriateMetaDescriptionText,
  generateCanonicalUrl
} from '@/lib/text-utils'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { BlogPost } from './blog-post'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) {
    notFound()
  }

  const { title, mainImage, introduction } = post
  const rawIntro = richToPlainText(introduction)
  const imageUrl = urlFor(mainImage)
  const image = { url: imageUrl, alt: title, width: 800, height: 600 }

  const url = generateCanonicalUrl(params.slug)

  const commonFields = {
    title,
    description: getAppropriateMetaDescriptionText(rawIntro),
    url
  }

  return {
    alternates: {
      canonical: params.slug
    },
    twitter: {
      cardType: 'summary_large_image',
      creator: '@haraldvin',
      images: [image],
      ...commonFields
    },
    openGraph: {
      type: 'article',
      images: [image],
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

  if (!post) {
    notFound()
  }

  return (
    <AnimationWrapper>
      <BlogPost post={post} />
    </AnimationWrapper>
  )
}
