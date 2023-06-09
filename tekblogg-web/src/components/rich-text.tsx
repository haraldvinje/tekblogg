import type { ReactNode } from 'react'
import { PortableText } from '@portabletext/react'
import type { BlockContent, BlockContentImage } from '@/types/sanity-schema'
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
    image: ({ value }: { value: BlockContentImage }) => {
      if (!value?.asset?._ref) {
        return null
      }
      const { title, alt } = value
      return <SanityImage image={value} loading="lazy" title={title} alt={alt} />
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
