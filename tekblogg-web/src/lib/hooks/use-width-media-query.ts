import { useCallback, useEffect, useState } from 'react'

export const useWidthMediaQuery = (width: number) => {
  const [minPixelWidthReaced, setMinPixelWidthReached] = useState(false)

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setMinPixelWidthReached(true)
    } else {
      setMinPixelWidthReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`)
    media.addEventListener('change', updateTarget)

    if (media.matches) {
      setMinPixelWidthReached(true)
    }

    return () => media.removeEventListener('change', updateTarget)
  }, [updateTarget, width])

  return minPixelWidthReaced
}
