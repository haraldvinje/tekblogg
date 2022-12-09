import Image from 'next/image'
import { useClientTheme } from 'src/lib/hooks/useClientTheme'
import Metatags from 'src/components/Metatags'

export default function AboutPage() {
  const { textTheme } = useClientTheme()

  return (
    <>
      <Metatags title="Om TekBlogg" description="TekBlogg er laget og drevet av Harald Vinje." />
      <div className={`prose w-full lg:prose-xl ${textTheme}`}>
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
            alt="profile"
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: 'auto'
            }}
          />
        </div>
        <p>
          Harald Vinje fullførte sivilingeniørgrad i Datateknologi fra NTNU i 2020, og har jobbet
          både som konsulent og in house-utvikler. For tiden jobber Harald som seniorkonsulent hos{' '}
          <a href="https://item.no/" target="_blank" rel="noreferrer">
            Item Consulting
          </a>
          .
        </p>
      </div>
    </>
  )
}
