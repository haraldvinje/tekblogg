'use client'

import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useCallback } from 'react'
import { ImageUrlBuilder, useNextSanityImage } from 'next-sanity-image'
import Image, { ImageProps } from 'next/image'
import client from '@/lib/sanity-client'

type NextImage = Omit<ImageProps, 'src' | 'alt'>

type SanityImageProps = NextImage & {
  image: SanityImageObject
  width?: number
  height?: number
  quality?: number
  alt?: string
}

export function SanityImage({
  image,
  alt = 'image',
  title = 'image title',
  width = 1000,
  quality = 100,
  ...nextImageProps
}: SanityImageProps) {
  const imageBuilder = useCallback(
    (imageUrlBuilder: ImageUrlBuilder) => imageUrlBuilder.width(width).quality(quality),
    [width, quality]
  )

  const imageProps = useNextSanityImage(client, image, { imageBuilder })

  return (
    <Image
      style={{ width: '100%', height: 'auto' }}
      sizes="(max-width: 800px) 100vw, 800px"
      alt={alt}
      title={title}
      placeholder="blur"
      blurDataURL="mountains.avif"
      unoptimized
      {...imageProps}
      {...nextImageProps}
    />
  )
}
