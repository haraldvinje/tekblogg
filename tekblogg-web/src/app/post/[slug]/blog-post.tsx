"use client";

import type { ReactNode } from "react";
import { formatAuthors } from "@/lib/text-utils";
import { ClientDate } from "@/components/client-date";
import { CategoryUi } from "@/components/category-ui";
import { ShareButtons } from "@/components/share-buttons";
import { SanityImage } from "@/components/sanity-image";
import type { BlogPostMetadata } from "@/lib/sanity-client";

export function BlogPost({
  postMetadata,
  postIntroductionComponent,
  postBodyComponent,
}: {
  postMetadata: BlogPostMetadata;
  postIntroductionComponent: ReactNode;
  postBodyComponent: ReactNode;
}) {
  const {
    title,
    authors,
    categories,
    mainImage,
    publishedAt,
    estimatedReadingTime,
  } = postMetadata;

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-8 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-primary">
                  {formatAuthors(authors)}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                <ClientDate
                  date={publishedAt}
                  className="text-lg font-medium text-secondary"
                />
              </div>
              <div className="flex items-center space-x-1 text-secondary">
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

            {categories && categories.length > 0 && (
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {categories.map((category, index) => (
                  <CategoryUi key={index} value={category.title} />
                ))}
              </div>
            )}

            <ShareButtons className="justify-center" />
          </div>

          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600" />
        </header>

        <article className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-2xl bg-surface-elevated p-8 ring-1 ring-gray-200 dark:ring-gray-700">
            <div className="prose prose-lg max-w-none text-secondary dark:prose-invert">
              {postIntroductionComponent}
            </div>
          </div>

          {mainImage && (
            <div className="mb-12">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <SanityImage
                  priority
                  maxWidth={800}
                  image={mainImage}
                  className="w-full"
                />
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-primary dark:prose-invert">
            {postBodyComponent}
          </div>

          <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="text-center">
              <p className="mb-4 text-lg font-medium text-secondary">
                Fant du artikkelen nyttig? Del den gjerne!
              </p>
              <ShareButtons className="justify-center" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
