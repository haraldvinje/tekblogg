import { formatInTimeZone } from 'date-fns-tz'

export const formatDate = (date: string, timeFormat: string = 'd. MMM yyyy HH:mm') =>
  formatInTimeZone(new Date(date), 'Europe/Oslo', timeFormat)

export const formatAuthors = (authors?: string[]) => authors?.join(', ')
