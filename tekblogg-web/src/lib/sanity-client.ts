import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { defineQuery } from "next-sanity";
import type {
  GetAllPostsCardDataQueryResult,
  GetPostQueryResult,
} from "@/types/sanity.types";

const client = createClient({
  projectId: "jbq2yq78",
  dataset: "production",
  apiVersion: "v2021-10-21",
  useCdn: true,
});

export const imageUrlBuilder = (source: string) =>
  createImageUrlBuilder(client).image(source);

const getAllPostsCardDataQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "categories": categories[]->{title, slug},
    publishedAt,
    "slug": slug.current,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    mainImage {
      "url": asset->url,
      "lqip": asset->metadata.lqip,
        title,
        alt
    }
  }
`);

const getAllSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

const getPostQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "authors": authors[]->name,
    "categories": categories[]->{title, slug},
    publishedAt,
    "slug": slug.current,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    mainImage {
      "url": asset->url,
      "lqip": asset->metadata.lqip,
        title,
        alt
    },
    introduction,
    body[]{
      ...,
      "url": asset->url,
      "lqip": asset->metadata.lqip,
    }
  }
`);

type Defined<T> = {
  [K in keyof T]-?: Exclude<T[K], null>;
};

export type SanityImageType = Defined<
  NonNullable<GetPostQueryResult>["mainImage"]
>;

export type BlogPost = Omit<NonNullable<GetPostQueryResult>, "mainImage"> & {
  mainImage: SanityImageType;
};

export type BlogPostMetadata = Omit<BlogPost, "introduction" | "body">;

export type BlogPostCardData = Omit<
  NonNullable<GetAllPostsCardDataQueryResult[number]>,
  "mainImage"
> & {
  mainImage: SanityImageType;
};

export const getAllBlogPostsCardData = async () =>
  await client.fetch<BlogPostCardData[]>(getAllPostsCardDataQuery);

export const getAllSlugs = async () =>
  await client.fetch<string[]>(getAllSlugsQuery);

export const getBlogPost = async (slug: string) =>
  await client.fetch<BlogPost>(getPostQuery, { slug }).catch(() => null);

export default client;
