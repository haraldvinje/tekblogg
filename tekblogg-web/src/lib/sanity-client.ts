import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import type * as Schema from '@/types/sanity-schema'

const client = createClient({
  projectId: 'jbq2yq78',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true
})

export const urlFor = (source: SanityImageObject) => imageUrlBuilder(client).image(source)

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

export type BlogPost = Omit<Schema.Post, 'slug' | 'categories' | 'authors'> & {
  slug: Schema.Post['slug']['current']
  categories: Schema.Category['title'][]
  estimatedReadingTime: number
  authors: Schema.Author['name'][]
}

export type BlogPostMetadata = Omit<BlogPost, 'body' | 'authors'>

export const getAllBlogPostsMetadata = async () =>
  await client.fetch<BlogPostMetadata[]>(getAllPostsMetadataQuery)

export const getAllSlugs = async () => await client.fetch<String[]>(getAllSlugsQuery)

export const getBlogPost = async (slug: string) =>
  client
    .fetch<BlogPost>(getPostQuery, { slug })
    .then((post) => post)
    .catch(() => null)

export default client
