'use client'

import { useClientTheme } from '@/lib/hooks/use-client-theme'
import type { BlogPost as BlogPostType } from '@/lib/sanity-client'
import { formatAuthors, formatDate } from '@/lib/text-utils'
import { RichText } from '@/components/rich-text'
import { Category } from '@/components/category'
import { ShareButtons } from '@/components/share-buttons'
import { SanityImage } from '@/components/sanity-image'

export const BlogPost = ({ post }: { post: BlogPostType }) => {
  const {
    title,
    authors,
    categories,
    mainImage,
    publishedAt,
    estimatedReadingTime,
    introduction,
    body
  } = post

  const { textTheme } = useClientTheme()

  return (
    <>
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
        {mainImage ? (
          <SanityImage
            priority
            loading="eager"
            image={mainImage}
            alt={mainImage.alt ?? 'Main image'}
            title={mainImage.title ?? 'Main image'}
          />
        ) : null}
        <RichText className="hyphens-auto" value={body} />
        <ShareButtons className="justify-center" />
      </article>
    </>
  )
}
