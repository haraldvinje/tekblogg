import { Suspense } from "react";
import { BlogPostList, BlogPostCards } from "./blog-post-list";
import { BlogPostCardData } from "@/lib/sanity-client";

export function Home({
  blogPostsMetadata: blogPostsMetadata,
}: {
  blogPostsMetadata: BlogPostCardData[];
}) {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">
        Velkommen til TekBlogg!
      </h1>
      <Suspense fallback={<BlogPostCards postsCardData={blogPostsMetadata} />}>
        <BlogPostList postsCardData={blogPostsMetadata} />
      </Suspense>
    </div>
  );
}
