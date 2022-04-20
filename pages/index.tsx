import BlogPostCard from 'components/BlogPostCard'
import type { NextPage } from 'next'

const Home: NextPage = () => {

  const titles = ["Learn Tailwind!", "Learn AWS", "Learn React", "Learn Next.js"]

  return (
    <div>
      {titles.map((title, index) => <BlogPostCard key={index} title={title} />)}
    </div>
  )
}

export default Home
