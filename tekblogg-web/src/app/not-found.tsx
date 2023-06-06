'use client'

import Link from 'next/link'
import { useClientTheme } from '@/lib/hooks/use-client-theme'

export default function NotFound() {
  const { textTheme } = useClientTheme()
  return (
    <text className={`${textTheme} mt-20 text-center`}>
      <h2>Siden finnes ikke 👎</h2>
      <Link href="/" className="hover:text-blue">
        Tilbake til forsiden
      </Link>
    </text>
  )
}
