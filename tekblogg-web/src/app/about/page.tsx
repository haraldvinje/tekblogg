import { Metadata } from 'next'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { About } from './about'

const title = 'Om TekBlogg'

export const metadata: Metadata = {
  title,
  description:
    'TekBlogg er en blogg om teknologi og programmering. Bloggen er drevet av Harald Vinje.'
}

export default async function AboutPage() {
  return (
    <AnimationWrapper>
      <About />
    </AnimationWrapper>
  )
}
