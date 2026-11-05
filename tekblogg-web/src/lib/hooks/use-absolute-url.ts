import { usePathname } from 'next/navigation'
import absoluteUrl from 'next-absolute-url'
import { useSyncExternalStore } from 'react'

const subscribeToNothing = () => () => {}

export const useAbsoluteUrl = () => {
  const path = usePathname()
  return useSyncExternalStore(
    subscribeToNothing,
    () => absoluteUrl().host + path,
    () => ''
  )
}
