import lazy from 'next/dynamic'
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import imageUrlBuilder from '@sanity/image-url'
import client from 'src/lib/sanityClient'
import { SanityImage, SanityImageObjectProps } from 'src/components/sanity-image'
import { CodeBlockProps } from 'src/components/code-block'

export function urlFor(source: SanityImageObjectProps) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageObjectProps }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return <SanityImage image={value} loading="lazy" alt="image" />
    },
    code: ({ value }: { value: CodeBlockProps }) => {
      const CodeBlock = lazy(() => import('src/components/code-block'))
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
