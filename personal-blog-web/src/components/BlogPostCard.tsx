import Link from 'next/link'
import type { PostCardData } from 'src/pages'
import { RichText } from 'src/components/RichText'
import { Category } from 'src/components/Category'
import { formatDate } from 'src/lib/utils'
import { useWidthMediaQuery } from 'src/lib/hooks/useWidthMediaQuery'
import { SanityImage } from 'src/components/SanityImage'

const BlogPostCard = ({ post }: { post: PostCardData }) => {
  const { title, categories, mainImage, publishedAt, introduction, slug, estimatedReadingTime } =
    post
  const wideEnough = useWidthMediaQuery(800)
  const linkRef = `/post/${slug}`
  return (
    <div className="scale-90 rounded-md border border-slate-400 p-2 shadow-sm transition ease-in-out hover:shadow-xl sm:mb-8 sm:scale-100">
      <div className="ml-4">
        <div className="my-2 flex items-center space-x-2">
          {wideEnough && (
            <Link href={linkRef} passHref>
              <a>
                <div style={{ width: '200px' }}>
                  <SanityImage
                    image={mainImage}
                    alt="mainImage"
                    width={200}
                    height={200}
                    quality={100}
                    placeholder="blur"
                    blurDataURL="mountains.avif"
                  />
                </div>
              </a>
            </Link>
          )}
          <div className="overflow-hidden">
            <Link href={linkRef} passHref>
              <a className="text-2xl font-bold hover:text-blue-600">{title}</a>
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
