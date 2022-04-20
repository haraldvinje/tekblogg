import React from 'react'
import Link from 'next/link'

const BlogPostCard = ({ title }: { title?: string }) => {
    const tags = ["Tech", "Cloud", "DevOps", "Dev", "AWS", "React", "Next.js"]

    return (
        <div className='shadow-md rounded-md border-2 mb-4 p-2'>
            <div className='ml-4'>
                <Link href="/about">
                    <a className='font-bold text-2xl hover:text-blue-600'>
                        {title}
                    </a>
                </Link>
                <p className='my-2'>Content</p>
                {tags.map((tag, index) => 
                    <span 
                        key={index} 
                        className='inline-block bg-gray-200 rounded-full 
                            px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                    >
                        {tag}
                    </span>)}
            </div>
        </div>
    )
}

export default BlogPostCard