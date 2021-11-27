import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

export default function FeedHeader() {
    return (
        <div className='text-[#d9d9d9] flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700'>
                <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
                <div className = 'hoverAnimation flex w-9 h-9 items-center justify-center'>
                    <SparklesIcon className='h-5 text-white' />
                </div>
            </div>
    )
}
