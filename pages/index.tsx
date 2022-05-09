import groq from "groq";
import { useEffect, useState, useCallback } from "react";
import client from "lib/sanityClient";
import BlogPostCard from "components/BlogPostCard";
import { Post } from "./post/[slug]";
import { Pagination } from "components/Pagination";
import { Category } from "components/Category";
import { randomUUID } from "crypto";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const Home = ({ posts }: { posts: PostCardData[] }) => {
  const itemsPerPage = 3;
  const [filteredPosts, setFilteredPosts] = useState<PostCardData[]>(posts);
  const [postsTotal, setPostsTotal] = useState(posts.length);
  const [pagesTotal, setPagesTotal] = useState(Math.ceil(posts.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);
  const [postsInPage, setPostsInPage] = useState<PostCardData[]>(
    posts.slice(0, itemsPerPage)
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePageClick = useCallback((pageNumber: number) => {
    const newOffset = (pageNumber * itemsPerPage) % postsTotal;
    setPostsInPage(filteredPosts.slice(newOffset, newOffset + itemsPerPage));
    setCurrentPage(pageNumber);
  }, [filteredPosts, postsTotal]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((p) => {
          return p.categories?.some((c) => selectedCategories.includes(c));
        })
      );
    }
  }, [selectedCategories, posts]);

  useEffect(() => {
    setPostsInPage(filteredPosts.slice(0, itemsPerPage))
    setPagesTotal(Math.ceil(filteredPosts.length / itemsPerPage));
    setPostsTotal(filteredPosts.length);
    handlePageClick(0);
  }, [filteredPosts, handlePageClick, postsTotal, selectedCategories]);

  const allCategories = posts
    .flatMap((p) => p.categories)
    .filter((c, index, categories) => categories.indexOf(c) === index)
    .filter(notEmpty);
  
  return (
    <div className="w-[80%]">
      <div className="mb-4 p-2">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-500">
          Filtrer på kategori
        </h1>
        {allCategories.map(
          (category, index) =>
            category && (
              <Category key={index} value={category} onClick={() => handleCategoryClick(category)} />
            )
        )}
      </div>
      {postsInPage.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
      {postsTotal > itemsPerPage && (
        <Pagination onPageChange={handlePageClick} pagesTotal={pagesTotal} />
      )}
    </div>
  );
};

export type PostCardData = Omit<Post, "body" | "authors">;

const query = groq`*[_type == "post"] | order(publishedAt desc) {
  title,
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
    revalidate: 60,
  };
};

export default Home;
