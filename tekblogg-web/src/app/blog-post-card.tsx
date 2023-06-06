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
    <div className="w-full scale-90 rounded-md border border-slate-400 p-4 shadow-sm transition ease-in-out hover:shadow-xl sm:mb-8 sm:scale-100">
      <div className="mb-2 flex items-center space-x-2 dark:text-white">
        {wideEnough && (
          <Link href={linkRef} passHref>
            <div className="w-[200px]">
              <SanityImage
                className="rounded-md"
                sizes="(max-width: 500px) 100vw,
                         (max-width: 1200px) 50vw,
                          33wv"
                width={200}
                image={mainImage}
                alt="mainImage"
                placeholder="blur"
              />
            </div>
          </Link>
        )}
        <div className="overflow-hidden">
          <Link href={linkRef} passHref className="text-2xl font-bold hover:text-blue">
            {title}
          </Link>
          <div className="my-2 text-xs opacity-60">
            {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
          </div>
          <RichText className="text-sm" value={introduction} />
        </div>
      </div>
      {categories?.map((category, index) => (
        <Category key={index} value={category} />
      ))}
    </div>
  )
}