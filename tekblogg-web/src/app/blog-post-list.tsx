"use client";

import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { BlogPostCard } from "./blog-post-card";
import { FeaturedBlogPostCard } from "./featured-blog-post-card";
import { BlogPostCardData } from "@/lib/sanity-client";
import { CategoryButton } from "@/components/category-button";
import { CategoryUi } from "@/components/category-ui";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function BlogPostList({
  blogPostCards,
}: {
  blogPostCards: BlogPostCardData[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allCategories = useMemo(
    () =>
      blogPostCards
        .flatMap((post) => post.categories)
        .filter(
          (category, index, categories) =>
            categories
              .map((c) => c.slug.current)
              .indexOf(category.slug.current) === index,
        )
        .filter(notEmpty),
    [blogPostCards],
  );

  const categoryQueryKey = "category";
  const selectedCategories = searchParams.getAll(categoryQueryKey);

  const filterInvalidCategories = useCallback(() => {
    const validCategories = selectedCategories.filter((selectedCategory) =>
      allCategories.map((c) => c.slug.current).includes(selectedCategory),
    );
    if (validCategories.length === selectedCategories.length) return;
    const params = new URLSearchParams();
    validCategories.forEach((c) => params.append(categoryQueryKey, c));
    window.history.pushState(null, "", `?${params.toString()}`);
  }, [allCategories, selectedCategories]);

  useEffect(() => {
    filterInvalidCategories();
  }, [filterInvalidCategories]);

  const filteredPosts =
    selectedCategories.length === 0
      ? blogPostCards
      : blogPostCards.filter((p) =>
          p.categories?.some((category) =>
            selectedCategories.includes(category.slug.current),
          ),
        );

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);
  const hasFilters = selectedCategories.length > 0;

  return (
    <>
      <div className="mb-12">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-primary">Artikler</h2>
          <p className="mb-6 text-secondary">
            Filtrer etter kategori for å finne det du leter etter
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {allCategories.map(
              (category, index) =>
                category.slug && (
                  <Suspense
                    key={index}
                    fallback={<CategoryUi value={category.title} />}
                  >
                    <CategoryButton
                      value={category.title}
                      slug={category.slug.current}
                      isSelected={selectedCategories.includes(
                        category.slug.current,
                      )}
                    />
                  </Suspense>
                ),
            )}
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                const scrollY = window.scrollY;
                window.history.replaceState({}, "", pathname);
                setTimeout(() => {
                  window.scrollTo(0, scrollY);
                }, 0);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface-hover transition-colors duration-200 text-sm font-medium text-secondary hover:text-primary whitespace-nowrap"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Fjern filtre
            </button>
          )}
        </div>
      </div>

      {!hasFilters && featuredPost && (
        <FeaturedBlogPostCard postCardData={featuredPost} />
      )}

      {(hasFilters ? filteredPosts : regularPosts).length > 0 && (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogPostCards
              blogPostCards={hasFilters ? filteredPosts : regularPosts}
            />
          </div>
        </>
      )}

      {(hasFilters ? filteredPosts : regularPosts).length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-secondary">
            Ingen artikler funnet med de valgte kategoriene.
          </p>
        </div>
      )}
    </>
  );
}

export function BlogPostCards({
  blogPostCards,
}: {
  blogPostCards: BlogPostCardData[];
}) {
  return (
    <>
      {blogPostCards.map((postCardData, index) => (
        <BlogPostCard key={index} postCardData={postCardData} />
      ))}
    </>
  );
}
