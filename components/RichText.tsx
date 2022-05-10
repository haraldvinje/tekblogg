/* eslint-disable @next/next/no-img-element */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock, TypedObject } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import client from 'lib/sanityClient'

export type PortableTextValue<B extends TypedObject = PortableTextBlock> = B | B[]

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
        <SyntaxHighlighter language={value.language} style={vscDarkPlus} showLineNumbers>
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
  value: PortableTextValue
  className?: string
}) => {
  return (
    <div className={className}>
      <PortableText value={value} components={ptComponents} />
    </div>
  )
}
