/* eslint-disable @next/next/no-img-element */

import groq from 'groq'
import client from 'lib/sanityClient'
import { formatDate } from 'lib/utils'
import { RichText, SanityImageResponse, urlFor, PortableTextValue } from 'components/RichText'
import { Category } from 'components/Category'
import Head from 'next/head'

export interface Post {
  title: string
  author: string
  slug: string
  mainImage: SanityImageResponse
  categories?: string[]
  publishedAt: string
  introduction: PortableTextValue
  body: PortableTextValue
}


const Post = ({ post }: { post: Post }) => {
  const { title, author, categories, mainImage, publishedAt, introduction, body } = post

  return (
    <>
      <Head>
          <title>{title}</title>
      </Head>
      <article className='prose lg:prose-xl w-full'>
        <h1 className='flex justify-center'>{title}</h1>
        <span>
          <i>{`${author} - ${formatDate(publishedAt)}`}</i>
        </span>
        {categories && (
          <>
            <div className="flex">
              <span className='mr-2'>Kategorier:</span>
              {categories.map(category => <Category key={category} value={category} />)}
            </div>
          </>
        )}
        <span className='text-xl'>
          <RichText value={introduction} />
        </span>
        {mainImage && (
          <img
            alt={"mainImage"}
            loading="lazy"
            src={urlFor(mainImage).width(600).height(450).fit('max').auto('format').url()}
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
  "author": author->name,
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
  }
}

export default Post