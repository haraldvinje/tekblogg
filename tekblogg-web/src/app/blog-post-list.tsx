'use client'

import {
  Suspense,
  ViewTransition,
  addTransitionType,
  startTransition,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { BlogPostCard } from './blog-post-card'
import { FeaturedBlogPostCard } from './featured-blog-post-card'
import { BlogPostCardData } from '@/lib/sanity-client'
import { CategoryButton } from '@/components/category-button'
import { CategoryUi } from '@/components/category-ui'
import { FILTER_POSTS_TRANSITION } from '@/lib/view-transitions'
import { useIsClient } from '@/lib/hooks/use-is-client'

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export function BlogPostList({ blogPostCards }: { blogPostCards: BlogPostCardData[] }) {
  const mounted = useIsClient()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const allCategories = useMemo(
    () =>
      blogPostCards
        .flatMap((post) => post.categories)
        .filter(
          (category, index, categories) =>
            categories.map((c) => c.slug.current).indexOf(category.slug.current) === index
        )
        .filter(notEmpty),
    [blogPostCards]
  )

  const categoryQueryKey = 'category'
  const selectedCategories = searchParams.getAll(categoryQueryKey)

  const filterInvalidCategories = useCallback(() => {
    if (!mounted) return

    const validCategories = selectedCategories.filter((selectedCategory) =>
      allCategories.map((c) => c.slug.current).includes(selectedCategory)
    )
    if (validCategories.length === selectedCategories.length) return

    const params = new URLSearchParams()
    validCategories.forEach((c) => params.append(categoryQueryKey, c))
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [allCategories, selectedCategories, mounted, router])

  useEffect(() => {
    filterInvalidCategories()
  }, [filterInvalidCategories])

  const filteredPosts =
    selectedCategories.length === 0
      ? blogPostCards
      : blogPostCards.filter((p) =>
          p.categories?.some((category) => selectedCategories.includes(category.slug.current))
        )

  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)
  const hasFilters = selectedCategories.length > 0

  return (
    <>
      <div className="mb-12">
        <div className="text-center">
          <h2 className="text-primary mb-2 text-2xl font-bold">Artikler</h2>
          <p className="text-secondary mb-6">
            Filtrer etter kategori for å finne det du leter etter
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories.map(
              (category, index) =>
                category.slug && (
                  <Suspense key={index} fallback={<CategoryUi value={category.title} />}>
                    <CategoryButton
                      value={category.title}
                      slug={category.slug.current}
                      isSelected={selectedCategories.includes(category.slug.current)}
                    />
                  </Suspense>
                )
            )}
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                if (!mounted) return
                const scrollY = window.scrollY
                startTransition(() => {
                  addTransitionType(FILTER_POSTS_TRANSITION)
                  router.replace(pathname, { scroll: false })
                })
                setTimeout(() => {
                  window.scrollTo(0, scrollY)
                }, 0)
              }}
              className="bg-surface border-border hover:bg-surface-hover text-secondary hover:text-primary flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Fjern filtre
            </button>
          )}
        </div>
      </div>

      {!hasFilters && featuredPost && (
        <ViewTransition
          key={featuredPost.slug}
          default={{ [FILTER_POSTS_TRANSITION]: 'auto', default: 'none' }}
        >
          <FeaturedBlogPostCard postCardData={featuredPost} />
        </ViewTransition>
      )}

      {(hasFilters ? filteredPosts : regularPosts).length > 0 && (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogPostCards blogPostCards={hasFilters ? filteredPosts : regularPosts} />
          </div>
        </>
      )}

      {(hasFilters ? filteredPosts : regularPosts).length === 0 && (
        <div className="py-12 text-center">
          <p className="text-secondary text-lg">Ingen artikler funnet med de valgte kategoriene.</p>
        </div>
      )}
    </>
  )
}

export function BlogPostCards({ blogPostCards }: { blogPostCards: BlogPostCardData[] }) {
  return (
    <>
      {blogPostCards.map((postCardData) => (
        // Keyed by slug so cards move to their new grid slot when filtering,
        // instead of being re-used by position.
        <ViewTransition
          key={postCardData.slug}
          default={{ [FILTER_POSTS_TRANSITION]: 'auto', default: 'none' }}
        >
          <BlogPostCard postCardData={postCardData} />
        </ViewTransition>
      ))}
    </>
  )
}
