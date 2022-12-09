import { useState, useMemo } from 'react'
import groq from 'groq'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import client from 'src/lib/sanityClient'
import Metatags from 'src/components/Metatags'
import BlogPostCard from 'src/components/BlogPostCard'
import { Category } from 'src/components/Category'
import { Post } from 'src/pages/post/[slug]'
import BaseLayout from 'src/components/layouts/BaseLayout'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

interface HomePageProps {
  posts: PostCardData[]
}

const Home: NextPage<HomePageProps> = ({ posts }: HomePageProps) => {
  const { t } = useTranslation('common')

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const allCategories = useMemo(
    () =>
      posts
        .flatMap((post) => post.categories)
        .filter((category, index, categories) => categories.indexOf(category) === index)
        .filter(notEmpty),
    [posts]
  )

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredPosts =
    selectedCategories.length === 0
      ? posts
      : posts.filter((p) => p.categories?.some((c) => selectedCategories.includes(c)))

  return (
    <BaseLayout>
      <Metatags title="TekBlogg" description={t('html_head_description') ?? ''} />
      <div className="w-[80%]">
        <div className="mb-4 p-2">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-500">
            {t('filter_on_category')}
          </h1>
          {allCategories.map(
            (category, index) =>
              category && (
                <Category key={index} value={category} onCategoryClick={handleCategoryClick} />
              )
          )}
        </div>
        {filteredPosts.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
      </div>
    </BaseLayout>
  )
}

export type PostCardData = Omit<Post, 'body' | 'authors'>

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const posts: PostCardData[] = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      title,
      "categories": categories[]->title,
      publishedAt,
      "slug": slug.current,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      mainImage,
      introduction
    }`
  )

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'nb', ['common'])),
      posts
    },
    revalidate: 60
  }
}

export default Home
