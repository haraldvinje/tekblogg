import { notFound } from "next/navigation";
import { BlogPost } from "./blog-post";
import { getAllSlugs, getBlogPost, imageUrlBuilder } from "@/lib/sanity-client";
import {
  richToPlainText,
  getAppropriateMetaDescriptionText,
  generateCanonicalUrl,
} from "@/lib/text-utils";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { RichText } from "@/components/rich-text";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;

  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const {
    title,
    mainImage: { url: mainImageUrl },
    introduction,
  } = post;
  const rawIntro = richToPlainText(introduction);

  const imageWidth = 1200;
  const imageHeight = 630;
  const imageUrl = imageUrlBuilder(mainImageUrl)
    .width(imageWidth)
    .height(imageHeight)
    .url();

  const image = {
    url: imageUrl,
    alt: title,
    width: imageWidth,
    height: imageHeight,
  };

  const url = generateCanonicalUrl(`/post/${params.slug}`);

  const commonFields = {
    title,
    description: getAppropriateMetaDescriptionText(rawIntro),
    url,
  };

  return {
    alternates: {
      canonical: url.pathname,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@haraldvin",
      images: [image],
      ...commonFields,
    },
    openGraph: {
      type: "article",
      images: [image],
      ...commonFields,
    },
    ...commonFields,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { introduction: _, body: __, ...postMetadata } = post;
  const postIntroductionServerComponent = (
    <RichText
      className="prose max-w-none hyphens-auto text-xl font-bold dark:prose-invert sm:hyphens-none"
      value={post.introduction}
    />
  );
  const postBodyServerComponent = (
    <RichText
      className="prose max-w-none overflow-hidden hyphens-auto dark:prose-invert sm:hyphens-none"
      value={post.body}
    />
  );

  return (
    <AnimationWrapper className="flex flex-col items-center">
      <BlogPost
        postMetadata={postMetadata}
        postIntroductionComponent={postIntroductionServerComponent}
        postBodyComponent={postBodyServerComponent}
      />
    </AnimationWrapper>
  );
}
