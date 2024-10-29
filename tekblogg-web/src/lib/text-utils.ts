import { format } from "date-fns";
import { nb } from "date-fns/locale";
import type { BlockContent } from "@/types/sanity.types";

export const formatDate = (date: string, timeFormat: string = "d. MMMM yyyy") =>
  format(new Date(date), timeFormat, { locale: nb });

export const formatAuthors = (authors: string[]) => {
  if (authors.length === 0) {
    throw new Error("No authors provided");
  }
  return authors.length === 1
    ? authors[0]
    : `${authors.slice(0, -1).join(", ")} og ${authors.slice(-1)[0]}`;
};

export const richToPlainText = (blocks: BlockContent): string => {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
};

export const getAppropriateMetaDescriptionText = (description: string) => {
  if (description.length > 160) {
    return description.substring(0, 157) + "...";
  }
  return description;
};

export const generateCanonicalUrl = (path?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN ?? "https://www.tekblogg.dev";
  const cleanPath = path?.replace(/^\/|\/$/g, "");
  return new URL(cleanPath ? baseUrl + "/" + cleanPath : baseUrl);
};
