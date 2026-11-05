import { useTheme } from 'next-themes'
import { useIsClient } from './use-is-client'

export const useClientTheme = () => {
  const { theme, setTheme } = useTheme()
  const isClientSide = useIsClient()
  return { theme, setTheme, isClientSide }
}
