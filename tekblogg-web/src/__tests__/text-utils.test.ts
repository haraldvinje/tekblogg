import { describe, expect, test } from '@jest/globals'
import { formatAuthors, getAppropriateMetaDescriptionText } from '@/lib/text-utils'

describe('formatAuthors', () => {
  test('should throw error if no authors are provided', () => {
    const authors: string[] = []
    expect(() => formatAuthors(authors)).toThrow(Error)
  })

  test('should format a single author correctly', () => {
    const authors = ['John Doe']
    const expected = 'John Doe'
    const result = formatAuthors(authors)
    expect(result).toBe(expected)
  })

  test('should format two authors correctly', () => {
    const authors = ['John Doe', 'Jane Smith']
    const expected = 'John Doe og Jane Smith'
    const result = formatAuthors(authors)
    expect(result).toBe(expected)
  })

  test('should format three authors correctly', () => {
    const authors = ['John Doe', 'Jane Smith', 'Bob Johnson']
    const expected = 'John Doe, Jane Smith og Bob Johnson'
    const result = formatAuthors(authors)
    expect(result).toBe(expected)
  })

  test('should format more than three authors correctly', () => {
    const authors = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams']
    const expected = 'John Doe, Jane Smith, Bob Johnson og Alice Williams'
    const result = formatAuthors(authors)
    expect(result).toBe(expected)
  })
})

describe('getAppropriateMetaDescriptionText', () => {
  test("should return the full description if it's less than 160 characters", () => {
    const description = 'This is a short description.'
    const result = getAppropriateMetaDescriptionText(description)
    expect(result).toBe(description)
  })
  test("should return the truncated description if it's more than 160 characters", () => {
    const description =
      'This is a long description that exceeds the character limit of 160 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const expected =
      'This is a long description that exceeds the character limit of 160 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit...'
    const result = getAppropriateMetaDescriptionText(description)
    expect(result).toBe(expected)
  })
})
