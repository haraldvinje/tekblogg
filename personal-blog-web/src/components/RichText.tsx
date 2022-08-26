/* eslint-disable @next/next/no-img-element */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import client from 'src/lib/sanityClient'

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
        <SyntaxHighlighter language={value.language} style={tomorrow} showLineNumbers>
          {value.code}
        </SyntaxHighlighter>
      )
    }
  },
  marks: {
    code: ({ text }: { text: string }) => (
      <code className="rounded-sm border-2 border-amber-100 bg-slate-800 p-2 text-amber-100 before:content-none after:content-none">
        {text}
      </code>
    )
  }
}

export const RichText = ({
  value,
  className
}: {
  value: PortableTextBlock[]
  className?: string
}) => {
  return (
    <div className={className}>
      <PortableText value={value} components={ptComponents} />
    </div>
  )
}
