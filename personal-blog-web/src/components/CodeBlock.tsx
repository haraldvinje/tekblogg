'use client'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import colorScheme from 'react-syntax-highlighter/dist/cjs/styles/prism/gruvbox-dark'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'

SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('sh', sh)

export type CodeBlockProps = {
  language: string
  code: string
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={colorScheme} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
