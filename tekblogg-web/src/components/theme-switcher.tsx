'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useClientTheme } from '@/lib/hooks/use-client-theme'

export function ThemeSwitcher() {
  const { theme, setTheme, isClientSide } = useClientTheme()

  if (!isClientSide) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="border-default bg-surface-elevated hover:bg-primary-50 dark:hover:bg-primary-900 flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm transition-all duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon className="text-secondary h-4 w-4" icon={faSun} />
      ) : (
        <FontAwesomeIcon className="text-secondary h-4 w-4" icon={faMoon} />
      )}
    </button>
  )
}
