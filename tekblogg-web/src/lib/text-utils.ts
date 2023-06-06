import { formatInTimeZone } from 'date-fns-tz'
import { nb } from 'date-fns/locale'
import type { BlockContent } from '@/types/sanity-schema'

export const formatDate = (date: string, timeFormat: string = 'd. MMMM yyyy') =>
  formatInTimeZone(new Date(date), 'Europe/Oslo', timeFormat, { locale: nb })

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
