import { urlFor, getAllSlugs, getPost } from 'src/lib/sanityClient'
import type { Post } from 'src/lib/sanityClient'
import { formatAuthors, formatDate, richToPlainText } from 'src/lib/textUtils'
import { useClientTheme } from 'src/lib/hooks/useClientTheme'
import { RichText } from 'src/components/RichText'
import { Category } from 'src/components/Category'
import { Metatags } from 'src/components/Metatags'
import { ShareButtons } from 'src/components/ShareButtons'
import { SanityImage } from 'src/components/SanityImage'

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
  const { textTheme } = useClientTheme()

  return (
    <>
      <Metatags
        title={title}
        description={rawIntro}
        image={urlFor(mainImage)}
        path={`/post/${slug}`}
      />
      <article className={`prose w-full lg:prose-xl ${textTheme}`}>
        <h1 className="flex justify-center">{title}</h1>
        <div className="flex flex-col space-y-2">
          <span className="flex items-center justify-between">
            {formatAuthors(authors)}
            <ShareButtons />
          </span>
          <p>
            <b>{formatDate(publishedAt)}</b>
          </p>
          <p>{`${estimatedReadingTime} min lesning`}</p>
        </div>
        {categories ? (
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
        ) : null}
        <div className="text-xl font-bold">
          <RichText value={introduction} />
        </div>
        {mainImage ? <SanityImage image={mainImage} alt="mainImage" /> : null}
        <RichText value={body} />
        <ShareButtons className="justify-center" />
      </article>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllSlugs()

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const { slug = '' } = params
  const post = await getPost(slug)
  if (!post) return { notFound: true }

  return {
    props: {
      post
    },
    revalidate: 60
  }
}

export default Post
