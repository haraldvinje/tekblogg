import { ViewTransition } from 'react'
import Link from 'next/link'
import type { BlogPostCardData } from '@/lib/sanity-client'
import { CategoryUi } from '@/components/category-ui'
import { SanityImage } from '@/components/sanity-image'
import { formatDate } from '@/lib/text-utils'
import { postImageTransitionName, postTitleTransitionName } from '@/lib/view-transitions'

export function FeaturedBlogPostCard({ postCardData }: { postCardData: BlogPostCardData }) {
  const { title, categories, mainImage, publishedAt, slug, estimatedReadingTime } = postCardData
  const linkRef = `/post/${slug}`

  return (
    <article className="group bg-surface-elevated hover:ring-primary-300 dark:bg-surface-elevated-dark dark:hover:ring-primary-600 relative mb-16 overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl dark:ring-gray-700">
      <Link href={linkRef} className="block">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-16/10 overflow-hidden lg:aspect-4/3">
            <ViewTransition name={postImageTransitionName(slug)} share="morph" default="none">
              <SanityImage
                priority
                width={800}
                height={600}
                maxWidth={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                image={mainImage}
              />
            </ViewTransition>
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute top-6 left-6">
              <span className="bg-accent-600 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white shadow-lg">
                Nyeste artikkel
              </span>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            {categories && categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {categories.slice(0, 3).map((category, index) => (
                  <CategoryUi key={index} value={category.title} />
                ))}
              </div>
            )}

            <ViewTransition name={postTitleTransitionName(slug)} share="morph" default="none">
              <h2 className="group-hover:text-accent-600 dark:group-hover:text-accent-400 mb-4 text-3xl leading-tight font-bold text-gray-900 transition-colors duration-200 lg:text-4xl dark:text-gray-100">
                {title}
              </h2>
            </ViewTransition>

            <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
              <time
                dateTime={publishedAt}
                className="text-lg font-medium text-gray-600 dark:text-gray-400"
              >
                {formatDate(publishedAt)}
              </time>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">{estimatedReadingTime} min lesning</span>
              </div>
            </div>

            <div className="text-accent-600 group-hover:text-accent-500 dark:text-accent-400 dark:group-hover:text-accent-300 flex items-center space-x-2 transition-colors duration-200">
              <span className="text-lg font-medium">Les artikkelen</span>
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
