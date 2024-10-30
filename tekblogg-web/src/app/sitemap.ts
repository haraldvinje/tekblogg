import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/text-utils";
import { getAllSlugs } from "@/lib/sanity-client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsSitemap = await getPostsSitemap();
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postsSitemap,
  ];
}

async function getPostsSitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    url: `${BASE_URL}/post/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));
}
