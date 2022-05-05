import groq from "groq";
import { useState } from "react";
import client from "lib/sanityClient";
import BlogPostCard from "components/BlogPostCard";
import { Post } from "./post/[slug]";
import { Pagination } from "components/Pagination";

const Home = ({ posts }: { posts: PostCardData[] }) => {
  const itemsPerPage = 3;
  const postsTotal = posts.length;
  const pagesTotal = Math.ceil(postsTotal / itemsPerPage);
  const [currentPosts, setCurrentPosts] = useState<PostCardData[]>(
    posts.slice(0, itemsPerPage)
  );

  const handlePageClick = (pageNumber: number) => {
    const newOffset = (pageNumber * itemsPerPage) % postsTotal;
    setCurrentPosts(posts.slice(newOffset, newOffset + itemsPerPage));
  };

  return (
    <div>
      {currentPosts.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
      {postsTotal > itemsPerPage && (
        <Pagination
          initalPageNumber={0}
          onPageChange={handlePageClick}
          pageCount={pagesTotal}
        />
      )}
    </div>
  );
};

export type PostCardData = Omit<Post, "body">;

const query = groq`*[_type == "post"]{
  title,
  "author": author->name,
  "categories": categories[]->title,
  "publishedAt": publishedAt,
  "slug": slug.current,
  mainImage,
  introduction
}`;

export const getStaticProps = async () => {
  const posts: PostCardData[] = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
