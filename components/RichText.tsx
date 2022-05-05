/* eslint-disable @next/next/no-img-element */
import { PortableText } from "@portabletext/react";
import { PortableTextBlock, TypedObject } from "@portabletext/types";
import imageUrlBuilder from "@sanity/image-url";
import client from "lib/sanityClient";

export type PortableTextValue<B extends TypedObject = PortableTextBlock> =
  | B
  | B[];

export type SanityImageResponse = {
  asset?: { _ref: string };
  alt: string;
};

export function urlFor(source: SanityImageResponse) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageResponse }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <img
          className="flex justify-center"
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value)
            .width(530)
            .height(400)
            .fit("max")
            .auto("format")
            .url()}
        />
      );
    },
  },
};

export const RichText = ({ value, className }: { value: PortableTextValue, className?: string }) => {
  return (
    <div className={className}>
      <PortableText value={value} components={ptComponents} />
    </div>
  );
};
