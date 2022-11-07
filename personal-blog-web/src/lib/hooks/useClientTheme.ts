'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useClientTheme = (): { theme?: string; textTheme: string } => {
  const { theme } = useTheme()
  const [textTheme, setTextTheme] = useState('')
  useEffect(() => {
    setTextTheme(theme === 'dark' ? 'prose prose-invert' : 'prose')
  }, [theme])

  return { theme, textTheme }
}
