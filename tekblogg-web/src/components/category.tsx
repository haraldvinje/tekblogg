'use client'

import { useState } from 'react'

export const Category = ({
  value,
  onCategoryClick
}: {
  value: string
  onCategoryClick?: (arg: string) => void
}) => {
  const [clicked, setClicked] = useState(false)
  const clickable = onCategoryClick !== undefined

  return (
    <span
      className={`mb-2 mr-2 inline-block rounded-md bg-slate-100 px-3
        py-1 text-xs font-semibold text-gray-700 sm:text-sm
        ${clickable ? 'hover:cursor-pointer' : ''}
        ${clicked ? 'bg-slate-400' : ''} `}
      onClick={() => {
        if (clickable && onCategoryClick) {
          onCategoryClick(value)
          setClicked(!clicked)
        }
      }}
    >
      {value}
    </span>
  )
}
