'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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

export function CategoryUi({ value, isSelected }: { value: string; isSelected?: boolean }) {
  return (
    <span
      className={`mb-2 mr-2 inline-block rounded-md bg-slate-100 px-3
        py-1 text-xs font-semibold text-gray-700 sm:text-sm
        ${isSelected ? 'bg-slate-400' : ''} `}
    >
      {value}
    </span>
  )
}
