import { Metadata } from 'next'
import { AnimationWrapper } from '@/components/animation-wrapper'
import { generateCanonicalUrl } from '@/lib/text-utils'
import { About } from './about'

export const metadata: Metadata = {
  title: 'Om TekBlogg',
  description:
    'TekBlogg er en blogg om teknologi og programmering. Bloggen er drevet av Harald Vinje.',
  metadataBase: generateCanonicalUrl('/about')
}

export default async function AboutPage() {
  return (
    <AnimationWrapper>
      <About />
    </AnimationWrapper>
  )
}
