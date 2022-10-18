import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import client from 'src/lib/sanityClient'
import { SanityImage, SanityImageObjectProps } from 'src/components/SanityImage'
import CodeBlock, { CodeBlockProps } from 'src/components/CodeBlock'

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
    code: ({ value }: { value: CodeBlockProps }) => {
      return <CodeBlock code={value.code} language={value.language} />
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
