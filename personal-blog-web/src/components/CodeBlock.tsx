import React from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import codeColorScheme from 'react-syntax-highlighter/dist/cjs/styles/hljs/gruvbox-dark'

export type CodeBlockProps = {
  language: string
  code: string
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={codeColorScheme} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  )
}
