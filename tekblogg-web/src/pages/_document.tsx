import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="nb">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body className="transition duration-500 dark:bg-dark-lighter">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
