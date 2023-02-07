import { ReactNode } from 'react'
import AnimationWrapper from 'src/components/AnimationWrapper'
import Navbar from 'src/components/Navbar'

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <AnimationWrapper>
        <main className="my-10 flex justify-center px-[10%] xl:px-[20%]">{children}</main>
      </AnimationWrapper>
    </>
  )
}

export default BaseLayout
