'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'
import { useWidthMediaQuery } from 'src/lib/hooks/useWidthMediaQuery'

const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const wideEnough = useWidthMediaQuery(300)

  const navItemStyle = `flex items-center rounded-md p-1 text-center font-bold leading-snug 
                          transition duration-300 ease-in-out hover:bg-white hover:text-black
                          sm:p-2 sm:text-3xl`
  const iconStyle =
    'h-4 sm:h-6 text-white transition duration-300 ease-in-out hover:scale-125 hover:opacity-70'

  return (
    <div className="relative z-10 h-16 w-[100%] text-white sm:h-20">
      <nav className="fixed flex w-full bg-black">
        <div className="flex w-[50%] items-center justify-center space-x-4 py-3 text-white sm:space-x-12">
          <Link href="/" passHref className={navItemStyle}>
            <span>
              Blogg
              {wideEnough && <FontAwesomeIcon icon={faBookOpen} className="fa-xs px-2" />}
            </span>
          </Link>
          <Link href="/about" passHref className={navItemStyle}>
            <span>Info</span>
          </Link>
        </div>
        <div className="flex w-[50%] items-center justify-center space-x-4 py-3 text-white">
          <div className="mx-4">
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
          </div>
          <a
            href="https://github.com/haraldvinje"
            title="GitHub"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub page"
          >
            <FontAwesomeIcon className={iconStyle} icon={faGithub} color="white" aria-hidden />
          </a>
          <a
            href="https://no.linkedin.com/in/haraldvinje"
            title="LinkedIn"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <FontAwesomeIcon className={iconStyle} icon={faLinkedinIn} color="white" aria-hidden />
          </a>
          <a
            href="https://www.instagram.com/haraldvinje/"
            title="Instagram"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram profile"
          >
            <FontAwesomeIcon className={iconStyle} icon={faInstagram} color="white" aria-hidden />
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
