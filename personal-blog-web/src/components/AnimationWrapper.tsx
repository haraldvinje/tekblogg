'use client'

import { ReactNode } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeIn } from 'src/lib/animations'

const AnimationWrapper = ({ children }: { children: ReactNode }) => {
  const animation = fadeIn

  return (
    <div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
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
