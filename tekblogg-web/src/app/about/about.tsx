import Image from 'next/image'
import harald from '@/../public/harald.png'

export async function About() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="text-primary mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Om TekBlogg
        </h1>
        <div className="from-primary-700 to-accent-700 mx-auto mb-12 h-px w-24 bg-gradient-to-r" />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-surface-elevated ring-border-default rounded-2xl p-8 shadow-sm ring-[0.2px]">
          <p className="text-secondary text-lg leading-8">
            Denne bloggen er laget og drives av Harald Vinje. Innleggene vil hovedsakelig ta for seg
            ny og moderne teknologi innen temaer som front end, back end, sky, maskinlæring,
            automatisering og programmering generelt. Fra tid til annen kan det komme innlegg som
            omhandler noe helt annet!
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-primary mb-8 text-center text-3xl font-bold">Om Harald</h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="text-secondary space-y-6">
                <p className="text-lg leading-8">
                  Harald Vinje fullførte sivilingeniørgrad i Datateknologi fra NTNU i 2020, og har
                  jobbet både som konsulent og in house-utvikler.
                </p>
                <p className="text-lg leading-8">
                  For tiden jobber Harald som selvstendig IT-konsulent i sitt eget selskap,{' '}
                  <a
                    className="text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300 font-medium"
                    href="https://www.vintech.no/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    VinTech AS
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative">
                <div className="from-primary-700 to-accent-700 absolute -inset-1 rounded-2xl bg-linear-to-r opacity-20 blur-lg" />
                <Image
                  className="relative rounded-2xl shadow-lg"
                  width={400}
                  src={harald}
                  placeholder="blur"
                  blurDataURL={harald.blurDataURL}
                  alt="Portrettbilde av Harald Vinje"
                  title="Portrettbilde av Harald Vinje"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
