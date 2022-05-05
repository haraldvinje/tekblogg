import React from "react";
import Link from "next/link";
import { PostCardData } from "pages";
import Image from "next/image";
import { RichText, urlFor } from "components/RichText";
import { Category } from "components/Category";
import { formatDate } from "lib/utils";

const BlogPostCard = ({ post }: { post: PostCardData }) => {
  const { title, categories, mainImage, publishedAt, introduction, slug } = post;
  const linkRef = `/post/${slug}`;
  return (
    <div className="transition ease-in-out shadow-sm rounded-md border border-slate-400 mb-8 p-2 hover:shadow-xl sm:scale-100 scale-75">
      <div className="ml-4">
        <div className="my-2 flex space-x-2">
          <Link href={linkRef} passHref>
            <a>
              <Image
                src={urlFor(mainImage).url()}
                width={150}
                height={150}
                layout="intrinsic"
                alt="mainImage"
              />
            </a>
          </Link>
          <div>
            <Link href={linkRef} passHref>
              <a className="font-bold text-2xl hover:text-blue-600">{title}</a>
            </Link>
            <div className="text-xs my-2 opacity-60">
              {formatDate(publishedAt)}
            </div>
            <RichText className="text-sm" value={introduction} />
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
