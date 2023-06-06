import { AnimationWrapper } from '@/components/animation-wrapper'
import { About } from './about'

export const metadata = {
  title: 'Om TekBlogg',
  description: 'TekBlogg er laget og drevet av Harald Vinje.'
}

export default async function AboutPage() {
  return (
    <AnimationWrapper>
      <About />
    </AnimationWrapper>
  )
}
