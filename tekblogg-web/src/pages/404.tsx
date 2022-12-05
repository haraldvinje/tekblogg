import Metatags from 'src/components/Metatags'

const Custom404 = () => {
  return (
    <>
      <Metatags title="404" />
      <main>
        <h1 className="mb-4 text-xl font-bold text-dark">404 - Siden finnes ikke</h1>
      </main>
    </>
  )
}

export default Custom404
