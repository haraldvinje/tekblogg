import Link from "next/link";
import type { BlogPostCardData } from "@/lib/sanity-client";
import { CategoryUi } from "@/components/category-ui";
import { formatDate } from "@/lib/text-utils";
import { SanityImage } from "@/components/sanity-image";

export const BlogPostCard = ({
  postCardData,
}: {
  postCardData: BlogPostCardData;
}) => {
  const {
    title,
    categories,
    mainImage,
    publishedAt,
    slug,
    estimatedReadingTime,
  } = postCardData;
  const linkRef = `/post/${slug}`;
  return (
    <Link
      href={linkRef}
      className="flex justify-center rounded-md shadow-md transition ease-in-out hover:shadow-xl dark:shadow-slate-900"
    >
      <div className="dark:text-white">
        <SanityImage
          priority
          className="rounded-md"
          image={mainImage}
          alt={mainImage.altText ?? "Artikkelbilde"}
          title={mainImage.title ?? "Artikkelbilde"}
        />
        <div className="overflow-hidden p-4">
          <p className="text-2xl">{title}</p>
          <div className="my-2 text-xs opacity-60">
            {`${formatDate(publishedAt)} - ${estimatedReadingTime} min lesning`}
          </div>
          {categories?.map((category, index) => (
            <CategoryUi key={index} value={category.title} />
          ))}
        </div>
      </div>
    </Link>
  );
};
