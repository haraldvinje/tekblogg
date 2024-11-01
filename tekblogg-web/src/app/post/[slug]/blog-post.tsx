import type { ReactNode } from "react";
import { formatAuthors, formatDate } from "@/lib/text-utils";
import { CategoryUi } from "@/components/category-ui";
import { ShareButtons } from "@/components/share-buttons";
import { SanityImage } from "@/components/sanity-image";
import type { BlogPostMetadata } from "@/lib/sanity-client";

export function BlogPost({
  postMetadata,
  postIntroductionComponent,
  postBodyComponent,
}: {
  postMetadata: BlogPostMetadata;
  postIntroductionComponent: ReactNode;
  postBodyComponent: ReactNode;
}) {
  const {
    title,
    authors,
    categories,
    mainImage,
    publishedAt,
    estimatedReadingTime,
  } = postMetadata;

  return (
    <>
      <article className="prose w-full dark:prose-invert">
        <h1 className="flex justify-center">{title}</h1>
        <div className="flex flex-col space-y-2">
          <span className="flex items-center justify-between">
            {formatAuthors(authors)}
            <ShareButtons />
          </span>
          <p>
            <b>{formatDate(publishedAt)}</b>
          </p>
          <p>{`${estimatedReadingTime} min lesning`}</p>
        </div>
        {categories ? (
          <>
            <div className="my-2 flex flex-wrap">
              <span className="mr-2">
                {categories.length > 1 && <i>Kategorier:</i>}
                {categories.length == 1 && <i>Kategori:</i>}
              </span>
              {categories.map((category, index) => (
                <CategoryUi key={index} value={category.title} />
              ))}
            </div>
          </>
        ) : null}
        {postIntroductionComponent}
        {mainImage ? (
          <SanityImage priority maxWidth={500} image={mainImage} />
        ) : null}
        {postBodyComponent}
        <ShareButtons className="justify-center" />
      </article>
    </>
  );
}
