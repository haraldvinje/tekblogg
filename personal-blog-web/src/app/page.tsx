import groq from 'groq'
import client from 'src/lib/sanityClient'
import { Post } from 'src/app/post/[slug]/page'
import HomePage from 'src/app/HomePage'

export const revalidate = 60

export type PostCardData = Omit<Post, 'body' | 'authors'>

async function getPosts(): Promise<PostCardData[]> {
  const posts: PostCardData[] = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      title,
      "categories": categories[]->title,
      publishedAt,
      "slug": slug.current,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      mainImage,
      introduction
    }`
  )

  return posts
}

export default async function Page() {
  const posts = await getPosts()
  return <HomePage posts={posts} />
}
