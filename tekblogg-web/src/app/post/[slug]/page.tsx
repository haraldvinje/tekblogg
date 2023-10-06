import { notFound } from 'next/navigation'
import { getAllSlugs, getBlogPost, urlFor } from '@/lib/sanity-client'
import {
  richToPlainText,
  getAppropriateMetaDescriptionText,
  generateCanonicalUrl
} from '@/lib/text-utils'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { RichText } from '@/components/rich-text'
import { BlogPost } from './blog-post'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const { title, mainImage, introduction } = post
  const rawIntro = richToPlainText(introduction)

  const imageWidth = 800
  const imageHeight = 600
  const imageUrl = urlFor(mainImage).width(imageWidth).height(imageHeight).url()
  const image = { url: imageUrl, alt: title, width: imageWidth, height: imageHeight }

  const url = generateCanonicalUrl(`/post/${params.slug}`)

  const commonFields = {
    title,
    description: getAppropriateMetaDescriptionText(rawIntro),
    url
  }

  return {
    alternates: {
      canonical: url.pathname
    },
    twitter: {
      card: 'summary_large_image',
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

  const { introduction: _, body: __, ...postMetadata } = post
  const postBodyServerComponent = <RichText className="hyphens-auto" value={post.body} />
  const postIntroductionServerComponent = (
    <RichText className="text-xl font-bold" value={post.introduction} />
  )

  return (
    <AnimationWrapper>
      <BlogPost
        postMetadata={postMetadata}
        postIntroductionComponent={postIntroductionServerComponent}
        postBodyComponent={postBodyServerComponent}
      />
    </AnimationWrapper>
  )
}
