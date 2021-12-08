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
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function Sidebar() {

    const { data: session } = useSession()

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

            <div className='text-[#d9d9d9] text-sm hidden sm:flex flex-row items-center justify-center mt-auto xl:ml-20 hoverAnimation -mr-5' onClick={signOut} >
                <img src={session.user.image} alt='user Image' className=' h-10 w-10 rounded-full xl:mr-2.5' />
                <div className='hidden xl:inline leading-5 '>
                    <h4 className='font-bold'>{session.user.name}</h4>
                    <p className='text-[#6e767d]'>@{session.user.tag}</p>
                </div>
                <div>
                    <DotsHorizontalIcon className='h-5 hidden xl:inline ml-1 z-50 text-white' />
                </div>
            </div>
        </div>
    )
}
