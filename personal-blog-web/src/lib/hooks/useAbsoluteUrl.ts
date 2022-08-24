import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'

export const useAbsoluteUrl = () => {
  const [url, setUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    const { host } = absoluteUrl()
    setUrl(host + router.asPath)
  }, [router])

  return url
}
