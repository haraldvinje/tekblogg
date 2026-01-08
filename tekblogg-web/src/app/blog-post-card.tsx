import Link from "next/link";
import type { BlogPostCardData } from "@/lib/sanity-client";
import { CategoryUi } from "@/components/category-ui";
import { SanityImage } from "@/components/sanity-image";
import { formatDate } from "@/lib/text-utils";

export function BlogPostCard({
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
    <article className="group relative overflow-hidden rounded-xl bg-surface-elevated shadow-sm transition-all duration-300 hover:shadow-lg hover:ring-primary-300 dark:bg-surface-elevated-dark dark:ring-gray-700 dark:hover:ring-primary-600 dark:shadow-xl">
      <Link href={linkRef} className="block">
        <div className="relative aspect-16/10 overflow-hidden">
          <SanityImage
            width={600}
            height={400}
            maxWidth={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            image={mainImage}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-6">
          {categories && categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((category, index) => (
                <CategoryUi key={index} value={category.title} />
              ))}
            </div>
          )}

          <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400">
            {title}
          </h2>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={publishedAt} className="font-medium">
              {formatDate(publishedAt)}
            </time>
            <span className="flex items-center space-x-1">
              <svg
                className="h-4 w-4"
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
              <span>{estimatedReadingTime} min</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
