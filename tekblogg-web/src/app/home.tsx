import type { ReactNode } from 'react'
import { BlogPostHomePageData, BlogPostMetadata } from '@/lib/sanity-client'
import { richToPlainText } from '@/lib/text-utils'
import { BlogPostList } from './blog-post-list'

export type ComponentsDictionary = { [key: string]: ReactNode }

function cutTextAfterNthOccurrence(text: string, character: string, n: number) {
  let index = -1
  for (let i = 0; i < text.length; i++) {
    if (text[i].toLowerCase() === character.toLowerCase()) {
      n--
      if (n === 0) {
        index = i
        break
      }
    }
  }

  if (index !== -1) {
    return text.substring(0, index + 1)
  } else {
    return text
  }
}

export function Home({ blogPostsHomePageData }: { blogPostsHomePageData: BlogPostHomePageData[] }) {
  const blogPostIntroductionsServerComponentsDictionary: ComponentsDictionary = Object.fromEntries(
    blogPostsHomePageData.map((post) => [
      post.slug,
      <p className="text-sm" key={post.slug}>
        {cutTextAfterNthOccurrence(richToPlainText(post.introduction), '.', 1)}
      </p>
    ])
  )

  const blogPostsMetadata = blogPostsHomePageData.map((post) => {
    const { introduction: _, ...postMetadata } = post
    return postMetadata as BlogPostMetadata
  })

  return (
    <div className="w-[80%]">
      <h1 className="text-center text-4xl font-bold dark:text-white">Velkommen til TekBlogg!</h1>
      <BlogPostList
        postsMetadata={blogPostsMetadata}
        introductionComponentsDictionary={blogPostIntroductionsServerComponentsDictionary}
      />
    </div>
  )
}
