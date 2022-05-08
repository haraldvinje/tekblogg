import format from "date-fns/format"

export const formatDate = (date: string, timeFormat: string = "d. MMM yyyy HH:mm") => format(new Date(date), timeFormat)

export const formatAuthors = (authors?: string[]) => authors?.join(", ")