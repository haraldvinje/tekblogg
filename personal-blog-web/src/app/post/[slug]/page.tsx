import { useTheme } from 'next-themes'
import groq from 'groq'
import { PortableTextBlock } from '@portabletext/types'
import client from 'src/lib/sanityClient'
import { formatAuthors, formatDate, richToPlainText } from 'src/lib/utils'
import { RichText, urlFor } from 'src/components/RichText'
import { Category } from 'src/components/Category'
import Metatags from 'src/components/Metatags'
import { ShareButtons } from 'src/components/ShareButtons'
import { SanityImage, SanityImageObjectProps } from 'src/components/SanityImage'

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
}

const Post = ({ post }: { post: Post }) => {
  const {
    title,
    authors,
    categories,
    mainImage,
    publishedAt,
    estimatedReadingTime,
    introduction,
    body,
    slug
  } = post

  const rawIntro = richToPlainText(introduction)
  const { theme } = useTheme()

  return (
    <>
      <Metatags
        title={title}
        description={rawIntro}
        image={urlFor(mainImage).url()}
        path={`/post/${slug}`}
      />
      <article className={`prose w-full lg:prose-xl ${theme === 'dark' && 'prose-invert'}`}>
        <h1 className="flex justify-center">{title}</h1>
        <div className="flex flex-col space-y-2">
          <span className="flex items-center justify-between">
            <i>{formatAuthors(authors)}</i>
            <ShareButtons />
          </span>
          <p>
            <b>{formatDate(publishedAt)}</b>
          </p>
          <p>{`${estimatedReadingTime} min lesning`}</p>
        </div>
        {categories && (
          <>
            <div className="flex">
              <span className="mr-2">
                <i>Kategorier:</i>
              </span>
              {categories.map((category, index) => (
                <Category key={index} value={category} />
              ))}
            </div>
          </>
        )}
        <div className="text-xl font-bold">
          <RichText value={introduction} />
        </div>
        {mainImage && <SanityImage image={mainImage} alt="mainImage" loading="lazy" />}
        <RichText value={body} />
        <ShareButtons className="justify-center" />
      </article>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths: string[] = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
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

  if (!post) return { notFound: true }

  return {
    props: {
      post
    },
    revalidate: 60
  }
}

export default Post
