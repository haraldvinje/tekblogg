import { Suspense } from "react";
import { BlogPostList, BlogPostCards } from "./blog-post-list";
import { BlogPostCardData } from "@/lib/sanity-client";

export function Home({ blogPostCards }: { blogPostCards: BlogPostCardData[] }) {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">
        Velkommen til TekBlogg!
      </h1>
      <Suspense fallback={<BlogPostCards blogPostCards={blogPostCards} />}>
        <BlogPostList blogPostCards={blogPostCards} />
      </Suspense>
    </div>
  );
}
