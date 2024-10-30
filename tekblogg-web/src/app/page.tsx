import { Home } from "./home";
import { AnimationWrapper } from "@/components/animation-wrapper";
import { getAllBlogPostsCardData } from "@/lib/sanity-client";

export const revalidate = 60;

export default async function Page() {
  const posts = await getAllBlogPostsCardData();
  return (
    <AnimationWrapper>
      <Home blogPostCards={posts} />
    </AnimationWrapper>
  );
}
