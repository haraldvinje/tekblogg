import { formatInTimeZone } from 'date-fns-tz'
import { nb } from 'date-fns/locale'

export const formatDate = (date: string, timeFormat: string = 'd. MMMM yyyy HH:mm') =>
  formatInTimeZone(new Date(date), 'Europe/Oslo', timeFormat, { locale: nb })

export const formatAuthors = (authors?: string[]) => authors?.join(', ')
