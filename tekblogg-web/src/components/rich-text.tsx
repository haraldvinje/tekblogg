import type { ReactNode } from 'react'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { PortableText } from '@portabletext/react'
import type { BlockContent } from '@/types/sanity-schema'
import { SanityImage } from '@/components/sanity-image'
import { CodeBlock, CodeBlockProps } from '@/components/code-block'

type SanityLink = {
  value?: {
    href: string
    _type: string
    _key: string
  }
  children: ReactNode
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageObject }) => {
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
    ),
    link: ({ value, children }: SanityLink) => {
      return (
        <a href={value?.href ?? ''} target="_blank" rel="noopener">
          {children}
        </a>
      )
    }
  }
}

export const RichText = ({ value, className }: { value: BlockContent; className?: string }) => {
  return (
    <div className={className}>
      <PortableText value={value} components={ptComponents} />
    </div>
  )
}
