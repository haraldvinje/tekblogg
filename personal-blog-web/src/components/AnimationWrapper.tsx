'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeIn } from 'src/lib/animations'

const AnimationWrapper = ({ children }: { children: ReactNode }) => {
  const animation = fadeIn
  const pathname = usePathname()

  return (
    <div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            key={pathname.concat(animation.name)}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation.variants}
            transition={animation.transition}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}

export default AnimationWrapper
