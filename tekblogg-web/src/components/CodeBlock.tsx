import dynamic from 'next/dynamic'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import colorScheme from 'react-syntax-highlighter/dist/cjs/styles/prism/gruvbox-dark'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import sh from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'

SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('sh', sh)

export type CodeBlockProps = {
  code: string
  language: string
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={colorScheme} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  )
}

const LoadingPlaceholder = () => {
  return (
    <div className="flex animate-bounce items-center justify-center space-x-2">
      <div className="h-4 w-4 rounded-full bg-blue-400"></div>
      <div className="h-4 w-4 rounded-full bg-green-400"></div>
      <div className="h-4 w-4 rounded-full bg-black"></div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
  loading: LoadingPlaceholder
})
