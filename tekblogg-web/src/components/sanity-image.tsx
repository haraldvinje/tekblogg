"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { imageUrlBuilder } from "@/lib/sanity-client";
import type { SanityImageType } from "@/lib/sanity-client";

type NextImage = Omit<ImageProps, "src" | "alt">;

export function SanityImage({
  image,
  className,
  maxWidth = 1000,
  ...nextImageProps
}: {
  image: SanityImageType;
  className?: string;
  maxWidth?: number;
  priority?: boolean;
} & NextImage) {
  return (
    <Image
      className={className}
      src={image.url}
      loader={({ width }) => {
        const finalWidth = width > maxWidth ? maxWidth : width;
        return imageUrlBuilder(image.url)
          .width(finalWidth)
          .dpr(2)
          .quality(100)
          .url();
      }}
      alt={image.alt}
      title={image.title}
      width={getImageDimensions(image.url).width}
      height={getImageDimensions(image.url).height}
      placeholder="blur"
      blurDataURL={image.lqip}
      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 30vw"
      {...nextImageProps}
    />
  );
}
