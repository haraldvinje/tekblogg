import Image from 'next/image'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useClientTheme } from 'src/lib/hooks/useClientTheme'
import Metatags from 'src/components/Metatags'
import BaseLayout from 'src/components/layouts/BaseLayout'

const AboutPage: NextPage = () => {
  const { t } = useTranslation('about')
  const { textTheme } = useClientTheme()

  return (
    <BaseLayout>
      <Metatags title="Om TekBlogg" description="TekBlogg er laget og drevet av Harald Vinje." />
      <div className={`prose w-full lg:prose-xl ${textTheme}`}>
        <h1 className="flex justify-center">{t('welcome')}</h1>
        <p>{t('about_blog')}</p>
        <h2>{t('about_harald_head')}</h2>
        <div className="flex justify-center">
          <Image className="rounded-md" src="/harald.png" width={300} height={300} alt="profile" />
        </div>
        <p>
          {t('about_harald_body')}{' '}
          <a href="https://item.no/" target="_blank" rel="noreferrer">
            Item Consulting
          </a>
          .
        </p>
      </div>
    </BaseLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about']))
    }
  }
}

export default AboutPage
