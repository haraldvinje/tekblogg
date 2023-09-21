'use client'

import { useEffect } from 'react'
import { themes, Highlight, Prism } from 'prism-react-renderer'

const env = global !== undefined ? global : window
env.Prism = Prism

export type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const theme = ['javascript', 'typescript', 'jsx', 'tsx', 'html', 'json'].includes(language)
    ? themes.vsDark
    : themes.nightOwl

  useEffect(() => {
    // The prism-react-rendered package only supports certain languages by default.
    if (language === 'python') {
      require('prismjs/components/prism-python')
    }
  }, [language])

  return (
    <Highlight prism={Prism} theme={theme} code={code} language={language ?? 'javascript'}>
      {({ style, tokens, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
