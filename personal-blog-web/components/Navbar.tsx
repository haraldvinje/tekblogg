import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  const navItemStyle = `flex items-center rounded-md p-1 text-center font-bold leading-snug 
                          transition duration-300 ease-in-out hover:bg-white hover:text-black
                          sm:p-2 sm:text-3xl`
  const iconStyle =
    'h-4 sm:h-6 text-white transition duration-300 ease-in-out hover:scale-125 hover:opacity-70'

  return (
    <div className="relative z-10 h-16 w-[100%] text-white sm:h-20">
      <nav className="fixed flex w-full bg-black">
        <div className="flex w-[50%] items-center justify-center space-x-4 py-3 text-white sm:space-x-12">
          <Link href="/" passHref>
            <a className={navItemStyle}>
              <span>
                Blogg
                <FontAwesomeIcon icon={faBookOpen} className="px-2" />
              </span>
            </a>
          </Link>
          <Link href="/about" passHref>
            <a className={navItemStyle}>
              <span>Info</span>
            </a>
          </Link>
        </div>
        <div className="flex w-[50%] items-center justify-center space-x-4 py-3 text-white">
          <div className="mx-4">
            {currentTheme === 'dark' ? (
              <SunIcon className={iconStyle} onClick={() => setTheme('light')} />
            ) : (
              <MoonIcon className={iconStyle} onClick={() => setTheme('dark')} />
            )}
          </div>
          <a href="https://github.com/haraldvinje" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={iconStyle} icon={faGithub} color="white" />
          </a>
          <a href="https://no.linkedin.com/in/haraldvinje" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={iconStyle} icon={faLinkedinIn} color="white" />
          </a>
          <a href="https://www.instagram.com/haraldvinje/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={iconStyle} icon={faInstagram} color="white" />
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
