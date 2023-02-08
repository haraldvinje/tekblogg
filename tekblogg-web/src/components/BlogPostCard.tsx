import Link from 'next/link'
import type { PostMetadata } from 'src/lib/sanityClient'
import { RichText } from 'src/components/RichText'
import { Category } from 'src/components/Category'
import { formatDate } from 'src/lib/textUtils'
import { useWidthMediaQuery } from 'src/lib/hooks/useWidthMediaQuery'
import { SanityImage } from 'src/components/SanityImage'

const BlogPostCard = ({ post }: { post: PostMetadata }) => {
  const { title, categories, mainImage, publishedAt, introduction, slug, estimatedReadingTime } =
    post
  const wideEnough = useWidthMediaQuery(900)
  const linkRef = `/post/${slug}`
  return (
    <div className="scale-90 rounded-md border border-slate-400 p-2 shadow-sm transition ease-in-out hover:shadow-xl sm:mb-8 sm:scale-100">
      <div className="ml-4">
        <div className={`my-2 flex items-center space-x-2 dark:text-white`}>
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
            <Link href={linkRef} passHref className="text-2xl font-bold hover:text-blue-600">
              {title}
            </Link>
            <div className="my-2 text-xs opacity-60">
              {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
            </div>
            <RichText className="mr-6 text-sm" value={introduction} />
          </div>
        </div>
        {categories?.map((category, index) => (
          <Category key={index} value={category} />
        ))}
      </div>
    </div>
  )
}

export default BlogPostCard
