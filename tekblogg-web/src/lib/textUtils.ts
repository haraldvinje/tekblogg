import { formatInTimeZone } from 'date-fns-tz'
import { PortableTextBlock } from '@portabletext/types'
import { nb } from 'date-fns/locale'

export const formatDate = (date: string, timeFormat: string = 'd. MMMM yyyy HH:mm') =>
  formatInTimeZone(new Date(date), 'Europe/Oslo', timeFormat, { locale: nb })

export const formatAuthors = (authors?: string[]) => authors?.join(', ')

export const richToPlainText = (blocks: PortableTextBlock[] = []): string => {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}
