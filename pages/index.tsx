import groq from "groq";
import { useEffect, useState, useCallback } from "react";
import client from "lib/sanityClient";
import BlogPostCard from "components/BlogPostCard";
import { Post } from "./post/[slug]";
import { Pagination } from "components/Pagination";
import { Category } from "components/Category";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const Home = ({ posts }: { posts: PostCardData[] }) => {
  const itemsPerPage = 5;
  const [filteredPosts, setFilteredPosts] = useState<PostCardData[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [postsInPage, setPostsInPage] = useState<PostCardData[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setFilteredPosts(posts);
    setPagesCount(Math.ceil(posts.length / itemsPerPage));
    setPostsInPage(posts.slice(0, itemsPerPage));
    setAllCategories(posts
      .flatMap((p) => p.categories)
      .filter((c, index, categories) => categories.indexOf(c) === index)
      .filter(notEmpty)
    );
  }, [posts]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePageClick = useCallback(
    (pageNumber: number) => {
      const newOffset = (pageNumber * itemsPerPage) % filteredPosts.length;
      setPostsInPage(filteredPosts.slice(newOffset, newOffset + itemsPerPage));
    },
    [filteredPosts]
  );

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
    return () => {
      setFilteredPosts(posts);
    };
  }, [selectedCategories, posts]);

  useEffect(() => {
    setPostsInPage(filteredPosts.slice(0, itemsPerPage));
    setPagesCount(Math.ceil(filteredPosts.length / itemsPerPage));
    handlePageClick(0);
    return () => {
      setPostsInPage(posts.slice(0, itemsPerPage));
    };
  }, [filteredPosts, handlePageClick, posts, selectedCategories]);


  return (
    <div className="w-[80%]">
      <div className="mb-4 p-2">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-500">
          Filtrer på kategori
        </h1>
        {allCategories.map(
          (category, index) =>
            category && (
              <Category
                key={index}
                value={category}
                onClick={() => handleCategoryClick(category)}
              />
            )
        )}
      </div>
      {postsInPage.map((post, index) => (
        <BlogPostCard key={index} post={post} />
      ))}
      {filteredPosts.length > itemsPerPage && (
        <Pagination onPageChange={handlePageClick} pagesTotal={pagesCount} />
      )}
    </div>
  );
};

export type PostCardData = Omit<Post, "body" | "authors">;

export const getStaticProps = async () => {
  const posts: PostCardData[] = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      title,
      "categories": categories[]->title,
      "publishedAt": publishedAt,
      "slug": slug.current,
      mainImage,
      introduction
    }`
  );

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

export default Home;
