import groq from 'groq'
import { PortableTextBlock } from '@portabletext/types'
import client from 'src/lib/sanityClient'
import { SanityImageObjectProps } from 'src/components/SanityImage'
import BlogPost from 'src/app/post/[slug]/BlogPost'

export interface Post {
  title: string
  authors: string[]
  mainImage: SanityImageObjectProps
  categories?: string[]
  publishedAt: string
  estimatedReadingTime: number
  slug: string
  introduction: PortableTextBlock[]
  body: PortableTextBlock[]
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )
  return slugs.map((slug) => ({ slug }))
}

async function getPost(params: { slug: string }) {
  const { slug = '' } = params

  const post: Post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      "authors": authors[]->name,
      "categories": categories[]->title,
      publishedAt,
      "slug": slug.current,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      mainImage,
      introduction,
      body
    }`,
    { slug: slug }
  )

  return post
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params)

  return <BlogPost post={post} />
}
