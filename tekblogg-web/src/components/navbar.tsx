'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import { useClientTheme } from '@/lib/hooks/use-client-theme'

export function Navbar() {
  const { theme, setTheme, isClientSide } = useClientTheme()
  const path = usePathname()

  const iconStyle =
    'h-4 sm:h-6 text-white transition duration-300 ease-in-out hover:scale-125 hover:opacity-70 mx-8'

  return (
    <nav className="top-0 z-20 flex h-16 w-full justify-between bg-dark text-white sm:h-20">
      <div className="w-1/3"></div>
      <div className="flex w-1/3 justify-between space-x-16">
        <Link
          href="/"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${path === '/' && 'font-extrabold'}`}
        >
          Blogg
        </Link>
        <Link
          href="/about"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${path === '/about' && 'font-extrabold'}`}
        >
          Info
        </Link>
      </div>
      <div className="flex w-1/3 items-center justify-end">
        {isClientSide ? (
          <>
            {theme === 'dark' ? (
              <FontAwesomeIcon
                className={iconStyle}
                icon={faSun}
                color="white"
                onClick={() => setTheme('light')}
              />
            ) : (
              <FontAwesomeIcon
                className={iconStyle}
                icon={faMoon}
                color="white"
                onClick={() => setTheme('dark')}
              />
            )}
          </>
        ) : null}
      </div>
    </nav>
  )
}
