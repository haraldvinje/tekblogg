import React from "react";
import Link from "next/link";
import { PostCardData } from "pages";
import Image from "next/image";
import { RichText, urlFor } from "components/RichText";
import { Category } from "components/Category";
import { formatDate } from "lib/utils";
import { useWidthMediaQuery } from "lib/hooks/useWidthMediaQuery";

const BlogPostCard = ({ post }: { post: PostCardData }) => {
  const { title, categories, mainImage, publishedAt, introduction, slug } =
    post;
  const wideEnough = useWidthMediaQuery(800);
  const linkRef = `/post/${slug}`;
  return (
    <div className="transition ease-in-out shadow-sm rounded-md border border-slate-400 sm:mb-8 p-2 hover:shadow-xl sm:scale-100 scale-90">
      <div className="ml-4">
        <div className="my-2 flex items-center space-x-2">
          {wideEnough && (
            <Link href={linkRef} passHref>
              <a>
                <Image
                  src={urlFor(mainImage).url()}
                  width={300}
                  height={300}
                  layout="intrinsic"
                  alt="mainImage"
                />
              </a>
            </Link>
          )}
          <div>
            <Link href={linkRef} passHref>
              <a className="font-bold text-2xl hover:text-blue-600">{title}</a>
            </Link>
            <div className="text-xs my-2 opacity-60">
              {formatDate(publishedAt)}
            </div>
            <RichText className="text-sm mr-6" value={introduction} />
          </div>
        </div>
        {categories?.map((category, index) => (
          <Category key={index} value={category} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostCard;
