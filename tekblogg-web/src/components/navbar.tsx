'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import { useClientTheme } from '@/lib/hooks/use-client-theme'

export function Navbar() {
  const { theme, setTheme, isClientSide } = useClientTheme()
  const path = usePathname()

  const iconStyle = 'h-4 sm:h-6 text-white transition duration-300 ease-in-out hover:opacity-70 p-2'

  return (
    <nav className="top-0 z-20 flex h-16 w-full bg-dark text-white sm:h-20">
      <div className="w-[15%] xl:w-[20%]"></div>
      <div className="flex grow items-center justify-between space-x-2">
        <Link
          href="/"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${path === '/' && 'font-extrabold'}`}
        >
          Blogg
        </Link>
        {isClientSide ? (
          <>
            {theme === 'dark' ? (
              <button
                className="flex flex-col items-center"
                onClick={() => setTheme('light')}
                aria-label="Switch to light mode"
              >
                <FontAwesomeIcon className={iconStyle} icon={faSun} color="white" />
              </button>
            ) : (
              <button
                className="flex flex-col items-center"
                onClick={() => setTheme('dark')}
                aria-label="Switch to dark mode"
              >
                <FontAwesomeIcon className={iconStyle} icon={faMoon} color="white" />
              </button>
            )}
          </>
        ) : null}
        <Link
          href="/about"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${path === '/about' && 'font-extrabold'}`}
        >
          Info
        </Link>
      </div>
      <div className="flex w-[15%] xl:w-[20%]"></div>
    </nav>
  )
}
