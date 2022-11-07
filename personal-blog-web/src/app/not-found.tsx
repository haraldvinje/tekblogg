'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
  return (
    <main className="flex">
      <Link href="/" className="mx-4 rounded-md hover:font-bold">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <p className="text-xl font-bold">404 - Siden finnes ikke</p>
    </main>
  )
}
