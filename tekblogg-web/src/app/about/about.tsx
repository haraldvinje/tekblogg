'use client'

import Image from 'next/image'
import { useClientTheme } from '@/lib/hooks/use-client-theme'
import harald from '@/../public/harald.png'
import haraldBlurred from '@/../public/harald_blurred.png'

export function About() {
  const { textTheme } = useClientTheme()
  return (
    <div className={`prose w-full lg:prose-xl ${textTheme}`}>
      <h1 className="flex justify-center">Velkommen til bloggen!🤓</h1>
      <p>
        Denne bloggen er laget og drives av Harald Vinje. Innleggene vil hovedsakelig ta for seg ny
        og moderne teknologi innen temaer som front end, back end, sky, maskinlæring, automatisering
        og programmering generelt. Fra tid til annen kan det komme innlegg som omhandler noe helt
        annet!
      </p>
      <h2>Om Harald</h2>
      <div className="flex justify-center transition-opacity duration-500">
        <Image
          className="rounded-md transition-opacity duration-500 ease-in-out"
          width={600}
          src={harald}
          placeholder="blur"
          blurDataURL={haraldBlurred.blurDataURL}
          alt="Portrettbilde av Harald Vinje"
          title="Portrettbilde av Harald Vinje"
        />
      </div>
      <p>
        Harald Vinje fullførte sivilingeniørgrad i Datateknologi fra NTNU i 2020, og har jobbet både
        som konsulent og in house-utvikler. For tiden jobber Harald som seniorkonsulent hos{' '}
        <a href="https://item.no/" target="_blank" rel="noreferrer">
          Item Consulting
        </a>
        .
      </p>
    </div>
  )
}
