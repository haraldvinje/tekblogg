import { AnimationWrapper } from '@/components/animation-wrapper'
import { generateCanonicalUrl } from '@/lib/text-utils'
import { About } from './about'

export const metadata = {
  title: 'Om TekBlogg',
  description: 'TekBlogg er laget og drevet av Harald Vinje.',
  url: generateCanonicalUrl('/about')
}

export default async function AboutPage() {
  return (
    <AnimationWrapper>
      <About />
    </AnimationWrapper>
  )
}
