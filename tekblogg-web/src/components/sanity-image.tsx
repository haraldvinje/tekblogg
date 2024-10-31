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
  priority = false,
  ...nextImageProps
}: {
  image: SanityImageType;
  className?: string;
  priority?: boolean;
} & NextImage) {
  const width =
    (nextImageProps.width as number) ?? getImageDimensions(image).width;
  const url = imageUrlBuilder(image.url).width(width).dpr(2).quality(100).url();

  return (
    <Image
      priority={priority}
      className={className}
      src={image.url}
      loader={() => url}
      alt={image.alt}
      title={image.title}
      width={getImageDimensions(image.url).width}
      height={getImageDimensions(image.url).height}
      placeholder="blur"
      blurDataURL={image.lqip}
      {...nextImageProps}
    />
  );
}
