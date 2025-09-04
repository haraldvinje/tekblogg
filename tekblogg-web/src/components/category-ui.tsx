export function CategoryUi({
  value,
  isSelected,
  onClick,
}: {
  value: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const isButton = onClick !== undefined;
  const Element = isButton ? "button" : "span";

  const baseStyles = `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200`;

  const buttonStyles = isButton
    ? `cursor-pointer hover:scale-105 ${
        isSelected
          ? "bg-accent-600 text-white hover:bg-accent-700"
          : "bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-800 dark:text-primary-300 dark:hover:bg-primary-700"
      }`
    : "bg-accent-50 text-accent-700 dark:bg-accent-900/20 dark:text-accent-400";

  const finalStyles = `${baseStyles} ${buttonStyles}`;

  const props = isButton
    ? { className: finalStyles, onClick }
    : { className: finalStyles };

  return <Element {...props}>{value}</Element>;
}
