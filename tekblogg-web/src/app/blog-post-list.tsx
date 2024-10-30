"use client";

import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BlogPostCard } from "./blog-post-card";
import { BlogPostCardData } from "@/lib/sanity-client";
import { CategoryButton } from "@/components/category-button";
import { CategoryUi } from "@/components/category-ui";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function BlogPostList({
  postsCardData,
}: {
  postsCardData: BlogPostCardData[];
}) {
  const allCategories = useMemo(
    () =>
      postsCardData
        .flatMap((post) => post.categories)
        .filter(
          (category, index, categories) =>
            categories
              .map((c) => c.slug.current)
              .indexOf(category.slug.current) === index,
        )
        .filter(notEmpty),
    [postsCardData],
  );

  const searchParams = useSearchParams();
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
      ? postsCardData
      : postsCardData.filter((p) =>
          p.categories?.some((category) =>
            selectedCategories.includes(category.slug.current),
          ),
        );

  return (
    <>
      <div className="mb-8">
        <p className="mb-2 mt-4 text-center text-xl font-bold text-gray-500 dark:text-gray-300 sm:text-2xl">
          Filtrer på kategori
        </p>
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlogPostCards postsCardData={filteredPosts} />
      </div>
    </>
  );
}

export function BlogPostCards({
  postsCardData,
}: {
  postsCardData: BlogPostCardData[];
}) {
  return (
    <>
      {postsCardData.map((postCardData, index) => (
        <BlogPostCard key={index} postCardData={postCardData} />
      ))}
    </>
  );
}
