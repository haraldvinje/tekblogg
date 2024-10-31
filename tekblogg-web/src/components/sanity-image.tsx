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
  aspectRatio,
  ...nextImageProps
}: {
  image: SanityImageType;
  className?: string;
  priority?: boolean;
  aspectRatio?: number;
} & NextImage) {
  const width =
    (nextImageProps.width as number) ?? getImageDimensions(image).width;
  const height = Math.round(
    aspectRatio ? width / aspectRatio : getImageDimensions(image).height,
  );
  const url = imageUrlBuilder(image.url)
    .width(width)
    .height(height)
    .dpr(2)
    .fit("crop")
    .quality(100)
    .url();

  return (
    <Image
      priority={priority}
      className={className}
      src="Hey"
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
