export const Category = ({
  value,
  clickable,
  clicked
}: {
  value: string
  clickable?: boolean
  clicked?: boolean
}) => {
  return (
    <span
      className={`mb-2 mr-2 inline-block rounded-full bg-gray-200
        px-3 py-1 text-sm font-semibold text-gray-700
        ${clickable ? 'hover:cursor-pointer' : ''}
        ${clicked ? 'bg-gray-400' : ''} `}
    >
      {value}
    </span>
  )
}
