"use client";

import Image from "next/image";
import type { ImageLoaderProps } from "next/image";

const imageLoader = ({ width }: ImageLoaderProps) => {
  console.log(width);
  return `https://placehold.co/${width}`;
};

export default function Page() {
  return (
    <Image
      loader={imageLoader}
      src="me.png"
      alt="Picture of the author"
      width={1000}
      height={1000}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
