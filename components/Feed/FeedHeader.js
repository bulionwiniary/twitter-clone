import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

import { ArrowLeftIcon } from '@heroicons/react/outline'

export default function FeedHeader({ children, isHome }) {

    const backHandler = () => {
        history.back()
    }

    return (
        <div className={`text-[#d9d9d9] flex items-center py-2 px-3 sticky top-0 z-30 bg-black border-b border-gray-700 ${isHome ? 'justify-between' : 'space-x-3'}`}>
            {!isHome && <div className='hoverAnimation flex w-9 px-0 py-0 h-9 items-center justify-center'>
                <ArrowLeftIcon className='h-5 text-white' onClick={backHandler} />
            </div>}

            <h2 className='text-lg sm:text-xl font-bold'>{children}</h2>
            
            {isHome && <div className='hoverAnimation flex w-9 h-9 items-center justify-center'>
                <SparklesIcon className='h-5 text-white' />
            </div>}
        </div>
    )
}
