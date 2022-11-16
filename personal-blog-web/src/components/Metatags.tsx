const Metatags = ({
  title,
  description,
  image,
  path
}: {
  title: string
  description?: string
  image?: string
  path?: string
}) => {
  const url = process.env.NEXT_PUBLIC_DOMAIN + '/' + (path ? path.replace(/^\//, '') : '')

  return (
    <>
      <title>{title}</title>
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:site" content="@haraldvin"></meta>
      <meta name="twitter:title" content={title}></meta>
      <meta name="twitter:description" content={description}></meta>
      <meta name="twitter:image" content={image}></meta>

      <meta name="description" content={description}></meta>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </>
  )
}

export default Metatags
