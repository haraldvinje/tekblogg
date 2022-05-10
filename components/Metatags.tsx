import Head from 'next/head'

const Metatags = ({
  title,
  description,
  image,
  url
}: {
  title: string
  description?: string
  image?: string
  url?: string
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content="@haraldvin"></meta>
      <meta name="twitter:title" content={title}></meta>
      <meta name="twitter:description" content={description}></meta>
      <meta name="twitter:image" content={image}></meta>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Head>
  )
}

export default Metatags
