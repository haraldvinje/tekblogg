import Link from 'next/link'
import { useRouter } from 'next/router'
import i18nextConfig from 'next-i18next.config'

export const LanguageSwitcher = () => {
  const router = useRouter()
  const currentLocale = router.locale || i18nextConfig.i18n.defaultLocale

  return (
    <>
      {currentLocale === 'nb' ? (
        <Link href={router.asPath} locale="en">
          🇺🇸
        </Link>
      ) : (
        <Link href={router.asPath} locale="nb">
          🇳🇴
        </Link>
      )}
    </>
  )
}
