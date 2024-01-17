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
