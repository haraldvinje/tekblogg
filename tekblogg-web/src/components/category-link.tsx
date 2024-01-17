'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CategoryUi } from '@/components/category-ui'

export function CategoryLink({
  value,
  slug,
  isSelected
}: {
  value: string
  slug: string
  isSelected: boolean
  onCategoryClick?: (slug: string) => void
}) {
  const params = new URLSearchParams(useSearchParams())

  const categoryQueryKey = 'category'
  if (isSelected) {
    params.delete(categoryQueryKey, slug)
  } else {
    params.append(categoryQueryKey, slug)
  }
  const newHref = `/?${params.toString()}`

  return (
    <Link href={newHref}>
      <CategoryUi value={value} isSelected={isSelected} />
    </Link>
  )
}
