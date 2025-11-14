"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { CategoryUi } from "@/components/category-ui";

export function CategoryButton({
  value,
  slug,
  isSelected,
}: {
  value: string;
  slug: string;
  isSelected: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateCategories = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryQueryKey = "category";

    if (isSelected) {
      params.delete(categoryQueryKey, slug);
    } else {
      params.append(categoryQueryKey, slug);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, isSelected, slug, router]);

  return (
    <CategoryUi
      onClick={updateCategories}
      isSelected={isSelected}
      value={value}
    />
  );
}
