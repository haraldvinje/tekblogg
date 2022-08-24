import { useEffect, useState } from 'react'

export const Category = ({
  value,
  onCategoryClick
}: {
  value: string
  onCategoryClick?: (arg: string) => void
}) => {
  const [clicked, setClicked] = useState(false)
  const [clickable, setClickable] = useState(false)

  useEffect(() => {
    setClickable(onCategoryClick !== undefined)
  }, [onCategoryClick])

  return (
    <span
      className={`mr-2 mb-2 inline-block rounded-full bg-gray-200
        px-3 py-1 text-sm font-semibold text-gray-700
        ${clickable ? 'hover:cursor-pointer' : ''}
        ${clicked ? 'bg-gray-400' : ''} `}
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
