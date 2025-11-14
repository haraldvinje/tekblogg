import { Home } from "./home";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { FrontPageDebug } from "@/components/front-page-debug";
import { getAllBlogPostsCardData } from "@/lib/sanity-client";

export const revalidate = 60;

export default async function Page() {
  const posts = await getAllBlogPostsCardData();
  return (
    <>
      <FrontPageDebug />
      <Home blogPostCards={posts} />
    </>
  );
}
