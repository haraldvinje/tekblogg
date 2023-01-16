import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import type * as Schema from 'src/types/sanitySchema'

const client = sanityClient({
  projectId: 'jbq2yq78',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true
})

export function urlFor(source: SanityImageObject) {
  return imageUrlBuilder(client).image(source)
}

const getAllPostsMetadataQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "categories": categories[]->title,
    publishedAt,
    "slug": slug.current,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    mainImage,
    introduction
  }
`

const getAllSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

const getPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "authors": authors[]->name,
    "categories": categories[]->title,
    publishedAt,
    "slug": slug.current,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    mainImage,
    introduction,
    body
  }
`

export type Post = Omit<Schema.Post, 'categories' | 'authors'> & {
  categories: Schema.Category['title'][]
  estimatedReadingTime: number
  authors: Schema.Author[]
}

export type PostMetadata = Omit<Post, 'body' | 'authors'>

export const getAllPostsMetadata = async () =>
  await client.fetch<PostMetadata[]>(getAllPostsMetadataQuery)

export const getAllSlugs = async () => await client.fetch<String[]>(getAllSlugsQuery)

export const getPost = async (slug: string) => client.fetch<Post>(getPostQuery, { slug })

export default client
