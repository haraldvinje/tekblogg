import Image from "next/image";
import harald from "@/../public/harald.png";

export async function About() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Om TekBlogg
        </h1>
        <div className="mx-auto mb-12 h-px w-24 bg-gradient-to-r from-primary-700 to-accent-700" />
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div className="rounded-2xl bg-surface-elevated p-8 shadow-sm ring-[0.2px] ring-border-default">
          <p className="text-lg leading-8 text-secondary">
            Denne bloggen er laget og drives av Harald Vinje. Innleggene vil
            hovedsakelig ta for seg ny og moderne teknologi innen temaer som
            front end, back end, sky, maskinlæring, automatisering og
            programmering generelt. Fra tid til annen kan det komme innlegg som
            omhandler noe helt annet!
          </p>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary">
            Om Harald
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 text-secondary">
                <p className="text-lg leading-8">
                  Harald Vinje fullførte sivilingeniørgrad i Datateknologi fra
                  NTNU i 2020, og har jobbet både som konsulent og in
                  house-utvikler.
                </p>
                <p className="text-lg leading-8">
                  For tiden jobber Harald som selvstendig IT-konsulent i sitt
                  eget selskap,{" "}
                  <a
                    className="font-medium text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300"
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
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-700 to-accent-700 opacity-20 blur-lg" />
                <Image
                  className="relative rounded-2xl shadow-lg"
                  width={400}
                  height={400}
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
  );
}
