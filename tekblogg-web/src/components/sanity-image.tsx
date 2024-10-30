import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import type { SanityImageSource } from "@sanity/asset-utils";
import type { BlockContentImage, SanityImageAsset } from "@/types/sanity.types";
import { urlFor } from "@/lib/sanity-client";

export function SanityImage({
  image,
  alt,
  title,
  className,
  priority = false,
}: {
  image: SanityImageAsset | BlockContentImage;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      priority={priority}
      className={className}
      src={urlFor(image).url()}
      alt={alt}
      title={title}
      width={getImageDimensions(image as SanityImageSource).width}
      height={getImageDimensions(image as SanityImageSource).height}
      placeholder="blur"
      blurDataURL={urlFor(image).width(24).height(24).blur(10).url()}
      sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
    />
  );
}
