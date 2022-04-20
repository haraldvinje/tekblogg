
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Article: NextPage = () => {
    const { query: { pid } } = useRouter()
    return (
        <div>
            {pid}
        </div>
    )
}

export default Article