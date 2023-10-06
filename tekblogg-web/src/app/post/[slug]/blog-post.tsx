'use client'

import { ReactNode } from 'react'
import { useClientTheme } from '@/lib/hooks/use-client-theme'
import type { BlogPostMetadata } from '@/lib/sanity-client'
import { formatAuthors, formatDate } from '@/lib/text-utils'
import { Category } from '@/components/category'
import { ShareButtons } from '@/components/share-buttons'
import { SanityImage } from '@/components/sanity-image'

export const BlogPost = ({
  postMetadata,
  postIntroductionComponent,
  postBodyComponent
}: {
  postMetadata: BlogPostMetadata
  postIntroductionComponent: ReactNode
  postBodyComponent: ReactNode
}) => {
  const { title, authors, categories, mainImage, publishedAt, estimatedReadingTime } = postMetadata

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
                <Category key={index} value={category.title} />
              ))}
            </div>
          </>
        ) : null}
        {postIntroductionComponent}
        {mainImage ? (
          <SanityImage
            priority
            loading="eager"
            image={mainImage}
            alt={mainImage.alt ?? 'Main image'}
            title={mainImage.title ?? 'Main image'}
          />
        ) : null}
        {postBodyComponent}
        <ShareButtons className="justify-center" />
      </article>
    </>
  )
}
