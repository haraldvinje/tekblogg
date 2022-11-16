'use client'

import { formatAuthors, formatDate, richToPlainText } from 'src/lib/utils'
import { useClientTheme } from 'src/lib/hooks/useClientTheme'
import { Post } from 'src/app/post/[slug]/page'
import { RichText, urlFor } from 'src/components/rich-text'
import { Category } from 'src/components/category'
import Metatags from 'src/components/metatags'
import { ShareButtons } from 'src/components/share-buttons'
import { SanityImage } from 'src/components/sanity-image'

export default function BlogPost({ post }: { post: Post }) {
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
        image={urlFor(mainImage).url()}
        path={`/post/${slug}`}
      />
      <article className={`prose w-full lg:prose-xl ${textTheme}`}>
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
        {mainImage ? <SanityImage image={mainImage} alt="mainImage" loading="lazy" /> : null}
        <RichText value={body} />
        <ShareButtons className="justify-center" />
      </article>
    </>
  )
}
