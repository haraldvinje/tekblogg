import Metatags from 'components/Metatags'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const Blog: NextPage = () => {
  const {theme} = useTheme()
  const textStyle = theme === 'dark' ? 'prose-invert' : ''
  return (
    <>
      <Metatags title="Om TekBlogg" description="TekBlogg er laget og drevet av Harald Vinje." />
      <div className={`prose lg:prose-xl w-full ${textStyle}`}>
        <h1 className="flex justify-center">Velkommen til bloggen!🤓</h1>
        <p>
          Denne bloggen er laget og drives av Harald Vinje. Innleggene vil hovedsakelig ta for seg
          ny og moderne teknologi innen temaer som front end, back end, sky, maskinlæring,
          automatisering og programmering generelt. Fra tid til annen kan det komme innlegg som
          omhandler noe helt annet!
        </p>
        <h2>Om Harald</h2>
        <div className="flex justify-center">
          <Image
            className="rounded-md"
            src="/harald.png"
            width={300}
            height={300}
            layout="intrinsic"
            alt="profile"
          />
        </div>
        <p>
          Harald Vinje fullførte sivilingeniørgrad i Datateknologi fra NTNU i 2020, og har jobbet
          både som konsulent og in house-utvikler. For tiden jobber Harald som fullstack-utvikler
          hos{' '}
          <a href="https://www.xperitech.com/" target="_blank" rel="noreferrer">
            XperiTech
          </a>
          .
        </p>
      </div>
    </>
  )
}

export default Blog
