import Link from 'next/link'
import type { BlogPostMetadata } from '@/lib/sanity-client'
import { CategoryUi } from '@/components/category'
import { formatDate } from '@/lib/text-utils'
import { SanityImage } from '@/components/sanity-image'

export const BlogPostCard = ({ postMetadata }: { postMetadata: BlogPostMetadata }) => {
  const { title, categories, mainImage, publishedAt, slug, estimatedReadingTime } = postMetadata
  const linkRef = `/post/${slug}`
  return (
    <Link
      href={linkRef}
      className="flex justify-center rounded-md shadow-md transition ease-in-out hover:shadow-xl dark:shadow-slate-900"
    >
      <div className="dark:text-white">
        <SanityImage
          className="aspect-video rounded-md object-fill"
          quality={100}
          image={mainImage}
          placeholder="blur"
          alt={mainImage.alt ?? 'Main image'}
          title={mainImage.title ?? 'Main image'}
        />
        <div className="overflow-hidden p-4">
          <p className="text-2xl">{title}</p>
          <div className="my-2 text-xs opacity-60">
            {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
          </div>
          {categories?.map((category, index) => <CategoryUi key={index} value={category.title} />)}
        </div>
      </div>
    </Link>
  )
}
