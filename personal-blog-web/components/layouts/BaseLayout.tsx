import { ReactNode } from 'react'
import AnimationLayout from 'components/layouts/AnimationLayout'
import Navbar from 'components/Navbar'

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <AnimationLayout>
        <main className="my-10 flex justify-center py-[5%] px-[10%] xl:px-[20%]">{children}</main>
      </AnimationLayout>
    </>
  )
}

export default BaseLayout
