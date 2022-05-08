/* eslint-disable @next/next/no-img-element */

import groq from 'groq'
import client from 'lib/sanityClient'
import { formatAuthors, formatDate } from 'lib/utils'
import { RichText, SanityImage, urlFor, PortableTextValue } from 'components/RichText'
import { Category } from 'components/Category'
import Head from 'next/head'

export interface Post {
  title: string
  authors: string[]
  slug: string
  mainImage: SanityImage
  categories?: string[]
  publishedAt: string
  introduction: PortableTextValue
  body: PortableTextValue
}


const Post = ({ post }: { post: Post }) => {
  const { title, authors, categories, mainImage, publishedAt, introduction, body } = post

  return (
    <>
      <Head>
          <title>{title}</title>
      </Head>
      <article className='prose lg:prose-xl w-full'>
        <h1 className='flex justify-center'>{title}</h1>
        <div className='flex flex-col space-y-2 my-2'>
          <i>{formatAuthors(authors)}</i>
          {formatDate(publishedAt)}
        </div>
        {categories && (
          <>
            <div className="flex">
              <span className='mr-2'>Kategorier:</span>
              {categories.map(category => <Category key={category} value={category} />)}
            </div>
          </>
        )}
        <span className='text-xl font-bold'>
          <RichText value={introduction} />
        </span>
        {mainImage && (
          <img
            className='w-full'
            alt={"mainImage"}
            loading="lazy"
            src={urlFor(mainImage).fit('max').auto('format').url()}
          />
        )}
        <RichText value={body} />
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
    fallback: 'blocking',
  }
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "authors": authors[]->name,
  introduction,
  "categories": categories[]->title,
  "publishedAt": publishedAt,
  mainImage,
  body
}`


export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const { slug = "" } = params

  const post = await client.fetch(
    query,
    { slug: slug }
  )

  if (!post) return { notFound: true }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}

export default Post