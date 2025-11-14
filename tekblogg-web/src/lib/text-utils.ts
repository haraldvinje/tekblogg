import { format } from "date-fns";
import { nb } from "date-fns/locale";
import type { BlockContent } from "@/types/sanity.types";

export const formatDate = (
  date: string,
  timeFormat: string = "d. MMMM yyyy",
) => {
  try {
    const dateObj = new Date(date);
    return format(dateObj, timeFormat, { locale: nb });
  } catch (error) {
    console.warn("Date formatting error:", error);
    return new Date(date).toLocaleDateString("nb-NO");
  }
};

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

export const BASE_URL =
  process.env.NEXT_PUBLIC_DOMAIN ?? "https://www.tekblogg.dev";

export const generateCanonicalUrl = (path?: string) => {
  const cleanPath = path?.replace(/^\/|\/$/g, "");
  return new URL(cleanPath ? BASE_URL + "/" + cleanPath : BASE_URL);
};
