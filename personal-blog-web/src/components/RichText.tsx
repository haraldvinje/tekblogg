/* eslint-disable @next/next/no-img-element */
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import client from 'src/lib/sanityClient'
import { SanityImage, SanityImageObjectProps } from 'src/components/SanityImage'

export type SanityCodeBlock = {
  language: string
  code: string
}

export function urlFor(source: SanityImageObjectProps) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageObjectProps }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return <SanityImage image={value} loading="lazy" />
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
