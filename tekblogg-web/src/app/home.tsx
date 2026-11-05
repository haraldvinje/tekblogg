import { Suspense } from 'react'
import { BlogPostList, BlogPostCards } from './blog-post-list'
import { BlogPostCardData } from '@/lib/sanity-client'

export function Home({ blogPostCards }: { blogPostCards: BlogPostCardData[] }) {
  return (
    <div className="min-h-screen">
      <section className="mb-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-primary mb-4 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span>TekBlogg</span>
          </h1>
          <p className="text-secondary mx-auto max-w-2xl text-lg leading-8 sm:text-xl">
            Utforsk det nyeste innen teknologi og programmering. Dybdeartikler, tutorials og innsikt
            fra utviklingsmiljøet.
          </p>
          <div className="via-primary-300 dark:via-primary-700 mt-8 h-px bg-linear-to-r from-transparent to-transparent" />
        </div>
      </section>

      <section>
        <Suspense fallback={<BlogPostCards blogPostCards={blogPostCards} />}>
          <BlogPostList blogPostCards={blogPostCards} />
        </Suspense>
      </section>
    </div>
  )
}
