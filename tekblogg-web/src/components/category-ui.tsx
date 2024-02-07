export function CategoryUi({
  value,
  isSelected,
  onClick
}: {
  value: string
  isSelected?: boolean
  onClick?: () => void
}) {
  const isButton = onClick !== undefined
  const Tag = isButton ? 'button' : 'span'

  const styles = `mb-2 mr-2 inline-block rounded-md bg-slate-100
    px-3 py-1 text-xs font-semibold text-gray-700 sm:text-sm
    ${isSelected ? 'bg-slate-400' : ''}`
  const props = isButton ? { className: styles, onClick } : { classNames: styles }

  return <Tag {...props}>{value}</Tag>
}
