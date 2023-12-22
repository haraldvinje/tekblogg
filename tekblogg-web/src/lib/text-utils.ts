import { format } from 'date-fns'
import type { BlockContent } from '@/types/sanity-schema'

export const formatDate = (date: string, timeFormat: string = 'd. MMMM yyyy') =>
  format(new Date(date), timeFormat)

export const formatAuthors = (authors?: string[]) => authors?.map((author) => author)?.join(', ')

export const richToPlainText = (blocks: BlockContent): string => {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child: { text: string }) => child.text).join('')
    })
    .join('\n\n')
}

export const getAppropriateMetaDescriptionText = (description: string) => {
  if (description.length > 160) {
    return description.substring(0, 150) + '...'
  }
  return description
}

export const generateCanonicalUrl = (path?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? 'https://www.tekblogg.dev'
  const cleanPath = path?.replace(/^\/|\/$/g, '')
  return new URL(cleanPath ? baseUrl + '/' + cleanPath : baseUrl)
}
