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
  return (
    <Image
      priority={priority}
      className={className}
      src={imageUrlBuilder(image.url).url()}
      alt={image.alt}
      title={image.title}
      width={getImageDimensions(image.url).width}
      height={getImageDimensions(image.url).height}
      placeholder="blur"
      blurDataURL={image.lqip}
      {...nextImageProps}
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
    />
  );
}
