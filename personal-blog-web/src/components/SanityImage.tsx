import { useNextSanityImage } from 'next-sanity-image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import Image, { ImageProps } from 'next/image'
import client from 'src/lib/sanityClient'

export type SanityImageObjectProps = SanityImageObject

type NextImage = Omit<ImageProps, 'src'>

type SanityImageProps = NextImage & {
  image: SanityImageObjectProps
  alt?: string
}

export const SanityImage = ({ image, alt = 'image', ...nextImageProps }: SanityImageProps) => {
  const imageProps = useNextSanityImage(client, image)

  return (
    <Image
      {...imageProps}
      {...nextImageProps}
      alt={alt}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto'
      }}
    />
  )
}
