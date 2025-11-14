import Link from "next/link";
import type { BlogPostCardData } from "@/lib/sanity-client";
import { CategoryUi } from "@/components/category-ui";
import { SanityImage } from "@/components/sanity-image";
import { ClientDate } from "@/components/client-date";

export function FeaturedBlogPostCard({
  postCardData,
}: {
  postCardData: BlogPostCardData;
}) {
  const {
    title,
    categories,
    mainImage,
    publishedAt,
    slug,
    estimatedReadingTime,
  } = postCardData;
  const linkRef = `/post/${slug}`;

  return (
    <article className="group relative mb-16 overflow-hidden rounded-2xl bg-surface-elevated shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:ring-primary-300 dark:bg-surface-elevated-dark dark:ring-gray-700 dark:hover:ring-primary-600">
      <Link href={linkRef} className="block">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-16/10 overflow-hidden lg:aspect-4/3">
            <SanityImage
              priority
              width={800}
              height={600}
              maxWidth={800}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              image={mainImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute left-6 top-6">
              <span className="inline-flex items-center rounded-full bg-accent-600 px-3 py-1 text-sm font-medium text-white shadow-lg">
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

            <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400 lg:text-4xl">
              {title}
            </h2>

            <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <ClientDate
                date={publishedAt}
                className="text-lg font-medium text-gray-600 dark:text-gray-400"
                skeleton={true}
              />
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">
                  {estimatedReadingTime} min lesning
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-accent-600 transition-colors duration-200 group-hover:text-accent-500 dark:text-accent-400 dark:group-hover:text-accent-300">
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
  );
}
