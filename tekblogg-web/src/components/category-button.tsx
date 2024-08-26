'use client'

import { useSearchParams } from 'next/navigation'
import { CategoryUi } from '@/components/category-ui'

export function CategoryButton({
  value,
  slug,
  isSelected
}: {
  value: string
  slug: string
  isSelected: boolean
}) {
  const params = new URLSearchParams(useSearchParams())

  const updateCategories = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `?${params.toString()}`)
    }
  }

  const categoryQueryKey = 'category'
  if (isSelected) {
    params.delete(categoryQueryKey, slug)
  } else {
    params.append(categoryQueryKey, slug)
  }

  return <CategoryUi onClick={updateCategories} isSelected={isSelected} value={value} />
}
