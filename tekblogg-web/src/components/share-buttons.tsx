'use client'

import { faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAbsoluteUrl } from '@/lib/hooks/use-absolute-url'

export function ShareButtons({ className }: { className?: string }) {
  const url = useAbsoluteUrl()

  return (
    <div className={`flex items-center space-x-4 opacity-80 ${className}`}>
      <p>
        <i>Del: </i>
      </p>
      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        title="Del på Twitter"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på Twitter"
      >
        <FontAwesomeIcon icon={faSquareXTwitter} color="#000000" size="2x" />
      </a>
      <a
        href={`https://linkedin.com/share?url=${url}`}
        title="Del på LinkedIn"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} color="#0072b1" size="2x" />
      </a>
    </div>
  )
}
