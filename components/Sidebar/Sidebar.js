import SidebarLink from './SidebarLink'
import { HomeIcon } from '@heroicons/react/solid'
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon
} from '@heroicons/react/outline'

import Image from 'next/image'
import React from 'react'

export default function Sidebar() {
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[360px] p-2 h-full fixed">
            <div className="flex items-center justify-center w-14 hoverAnimation p-0 xl:ml-24">
                <Image src='https://rb.gy/ogau5a' width={30} height={30} />
            </div>
            <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
                <SidebarLink text="Home" Icon={HomeIcon} active />
                <SidebarLink text="Explore" Icon={HashtagIcon} />
                <SidebarLink text="Notifications" Icon={BellIcon} />
                <SidebarLink text="Messages" Icon={InboxIcon} />
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
                <SidebarLink text="Lists" Icon={ClipboardListIcon} />
                <SidebarLink text="Profile" Icon={UserIcon} />
                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
            </div>
            <button className="hidden xl:inline ml-auto rounded-full text-[#d9d9d9] bg-[#1292e7] w-56 h-[52px] text-lg font-bold shadow-sm hover:bg-[#1a8cd8] duration-200">Tweet</button>

            <div className='text-[#d9d9d9] hidden sm:flex flex-row items-center justify-center mt-auto xl:ml-24 hoverAnimation -mr-5'>
                <img src='https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=H9Aph8axL3kAX87x4GW&_nc_ht=scontent-frx5-1.xx&oh=9e69a83385611ebef0232ec10774d7d7&oe=61C66F8E' alt='user Image' className='rounded-full h-10 w-10 rounded-full xl:mr-2.5' />
                <div className='hidden xl:inline leading-5 '>
                    <h4 className='font-bold'>Mateusz Krawczyk</h4>
                    <p className='text-[#6e767d]'>@bulionwiniary</p>
                </div>
                <DotsHorizontalIcon className='h-5 hidden xl:inline ml-10' />
            </div>
        </div>
    )
}
