/* eslint-disable tailwindcss/no-custom-classname */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url'
import { faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ShareButtons = ({ className }: { className?: string }) => {
  const [url, setUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    const { host } = absoluteUrl()
    setUrl(host + router.asPath)
  }, [router])

  return (
    <div className={`flex items-center space-x-4 opacity-80 ${className}`}>
      <p>
        <i>Del: </i>
      </p>
      <a href={`https://twitter.com/intent/tweet?text=${url}`} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTwitterSquare} color="#1DA1F2" size="2x" />
      </a>
      <a href={`https://linkedin.com/share?url=${url}`} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} color="#0072b1" size="2x" />
      </a>
    </div>
  )
}
