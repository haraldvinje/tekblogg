import { useEffect, useState } from 'react'
import absoluteUrl from 'next-absolute-url'
import { usePathname } from 'next/navigation'

export const useAbsoluteUrl = () => {
  const [url, setUrl] = useState('')
  const pathname = usePathname

  useEffect(() => {
    const { host } = absoluteUrl()
    setUrl(host + pathname)
  }, [pathname])

  return url
}
