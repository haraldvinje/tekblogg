'use client'

import Link from 'next/link'
import type { BlogPostMetadata } from '@/lib/sanity-client'
import { RichText } from '@/components/rich-text'
import { Category } from '@/components/category'
import { formatDate } from '@/lib/text-utils'
import { useWidthMediaQuery } from '@/lib/hooks/use-width-media-query'
import { SanityImage } from '@/components/sanity-image'

export const BlogPostCard = ({ post }: { post: BlogPostMetadata }) => {
  const { title, categories, mainImage, publishedAt, introduction, slug, estimatedReadingTime } =
    post
  const wideEnough = useWidthMediaQuery(900)
  const linkRef = `/post/${slug}`
  return (
    <div
      className="w-full scale-90 rounded-md p-4 shadow-sm transition ease-in-out hover:shadow-xl sm:mb-8 sm:scale-100"
      data-cy="article-card"
    >
      <div className="mb-2 flex items-center space-x-2 dark:text-white">
        {wideEnough && (
          <Link href={linkRef}>
            <div className="w-[200px]">
              <SanityImage
                className="rounded-md"
                sizes="(max-width: 500px) 100vw,
                         (max-width: 1200px) 50vw,
                          33wv"
                width={200}
                image={mainImage}
                placeholder="blur"
                alt={mainImage.alt ?? 'Main image'}
                title={mainImage.title ?? 'Main image'}
              />
            </div>
          </Link>
        )}
        <div className="overflow-hidden">
          <Link
            href={linkRef}
            className="text-2xl font-bold hover:text-blue"
            data-cy="article-link"
          >
            {title}
          </Link>
          <div className="my-2 text-xs opacity-60">
            {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
          </div>
          <RichText className="mb-2 text-sm" value={introduction} />
          {categories?.map((category, index) => <Category key={index} value={category.title} />)}
        </div>
      </div>
    </div>
  )
}
