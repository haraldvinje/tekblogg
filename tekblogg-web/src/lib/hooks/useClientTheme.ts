'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useClientTheme = (): {
  theme?: string
  setTheme: (theme: string) => void
  textTheme: string
  isClientSide: boolean
} => {
  const { theme, setTheme } = useTheme()
  const [textTheme, setTextTheme] = useState('')
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setTextTheme(theme === 'dark' ? 'prose prose-invert' : 'prose')
  }, [theme])

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return { theme, setTheme, textTheme, isClientSide }
}
