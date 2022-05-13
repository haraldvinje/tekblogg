/* eslint-disable @next/next/no-img-element */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock, TypedObject } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import gruvboxDark from 'react-syntax-highlighter/dist/esm/styles/prism'
import client from 'lib/sanityClient'

type PortableTextIntroBlock = {
  children?: {
    _type: string
    _key: string
    marks?: string[]
    text?: string
  }[]
}

export type PortableTextIntro = PortableTextIntroBlock[]

export type PortableTextBody<B extends TypedObject = PortableTextBlock> = B | B[]

export type SanityImage = {
  asset?: { _ref: string }
  alt: string
}

export type SanityCodeBlock = {
  language: string
  code: string
}

export function urlFor(source: SanityImage) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <img
          className="flex justify-center"
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).fit('max').auto('format').url()}
        />
      )
    },
    code: ({ value }: { value: SanityCodeBlock }) => {
      return (
        <SyntaxHighlighter language={value.language} style={gruvboxDark} showLineNumbers>
          {value.code}
        </SyntaxHighlighter>
      )
    }
  }
}

export const RichText = ({
  value,
  className
}: {
  value: PortableTextBody | PortableTextIntro
  className?: string
}) => {
  return (
    <div className={className}>
      <PortableText value={value as PortableTextBody} components={ptComponents} />
    </div>
  )
}
