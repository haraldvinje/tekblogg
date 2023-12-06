import Link from 'next/link'
import type { BlogPostMetadata } from '@/lib/sanity-client'
import { Category } from '@/components/category'
import { formatDate } from '@/lib/text-utils'
import { SanityImage } from '@/components/sanity-image'

export const BlogPostCard = ({ postMetadata }: { postMetadata: BlogPostMetadata }) => {
  const { title, categories, mainImage, publishedAt, slug, estimatedReadingTime } = postMetadata
  const linkRef = `/post/${slug}`
  return (
    <Link
      href={linkRef}
      className="flex justify-center rounded-md shadow-md transition ease-in-out hover:shadow-xl"
    >
      <div className="dark:text-white">
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
        <div className="overflow-hidden">
          <Link href={linkRef} className="text-2xl hover:text-blue" data-cy="article-link">
            {title}
          </Link>
          <div className="my-2 text-xs opacity-60">
            {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
          </div>
          {categories?.map((category, index) => <Category key={index} value={category.title} />)}
        </div>
      </div>
    </Link>
  )
}
