import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { ChatIcon, HeartIcon, ShareIcon, DotsHorizontalIcon, TrashIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../../atoms/modalAtom'
import { deleteDoc, doc, setDoc, onSnapshot, collection, orderBy, query } from '@firebase/firestore'
import { db } from '../../firebase'

export const dateDiffToString = (date1, date2) => {
    const diffInSec = Math.abs(date1 - date2)
    if (diffInSec < 10) return 'now'
    if (diffInSec / 60 < 1) return Math.floor(diffInSec) + 's' //return seconds
    if (diffInSec / 60 / 60 < 1) return Math.floor(diffInSec / 60) + 'm' //return minutes
    if (diffInSec / 60 / 60 / 24 < 1) return Math.floor(diffInSec / 60 / 60) + 'h' //return hours
    return Math.floor(diffInSec / 60 / 60 / 24) + 'd'
}

export default function Post({ id, post, postPage }) {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    // const [liked, setLiked] = useState(false)
    const router = useRouter()

    useEffect(() => (
        onSnapshot(query(
            collection(db, 'posts', id, 'comments'),
            orderBy('timestamp', 'desc')
        ),
            snapshot => {
                setComments(snapshot.docs)
            })
    ), [db, id])

    useEffect(() => (
        onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => {
            setLikes(snapshot.docs)
        })
    ), [db, id])


    const liked = likes.findIndex((like) => like.id === session?.user?.uid) !== -1

    let diff = 'now'
    if (post?.timestamp?.seconds) {
        const now = new Date()
        diff = dateDiffToString((now / 1000), post.timestamp.seconds)
    }

    const openPost = e => {
        console.log(session.user.uid)
        router.push(`/${id}`)
    }

    const openProfile = e => {
        e.stopPropagation()
        console.log('img')
    }

    const openComments = e => {
        e.stopPropagation()
        setPostId(id);
        setIsOpen(true)
    }

    const likePost = async e => {
        e.stopPropagation()
        // ver 1 na tablicy:
        // let newLikes = []
        // if (post.likes.length === 0) {
        //     newLikes.push(session.user.uid)
        // } else if(!liked){
        //     newLikes = [...post.likes]
        //     newLikes.push(session.user.uid)
        // } else {
        //     newLikes = post.likes.filter(element => {
        //         return element !== session.user.uid
        //     })
        // }
        // await updateDoc(doc(db, 'posts', id), {
        //     ...post,
        //     likes: newLikes
        // })

        //ver 2
        if (liked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.name
            })
        }

    }

    const deletePost = e => {
        e.stopPropagation()
        deleteDoc(doc(db, 'posts', id))
        router.push('/')
    }

    return (
        <div className='flex space-x-3 border-gray-700 border-b relative p-3 cursor-pointer hover:bg-gray-900 duration-200' onClick={openPost}>
            {!postPage && (<img src={post.userImg} alt='user image' className='rounded-full w-11 h-11 hover:opacity-80 transition' onClick={openProfile} />)}

            <div className='space-y-3 w-full'>
                <div className=''>

                    <div className='text-sm flex justify-start flex-row w-full text-[#536471]'>
                        {postPage && (<img src={post?.userImg} alt='user image' className='rounded-full w-11 h-11 hover:opacity-80 transition' onClick={openProfile} />)}
                        <div className={` group mr-1 ${postPage ? ('inline-block ml-1.5') : 'flex space-x-1'}`} >
                            <h4 className='text-[#d9d9d9] font-bold group-hover:underline'>{post?.username}</h4>
                            <p>@{post?.tag}</p>
                        </div>
                        {!postPage && (
                            <>
                                <p>·</p>
                                <p className='hover:underline ml-1'> {diff} ago</p>
                            </>
                        )}

                        <div className='ml-auto mr-8 flex-shrink-0'>
                            <div className='absolute icon'>
                                <DotsHorizontalIcon className='h-5'></DotsHorizontalIcon>
                            </div>
                        </div>
                    </div>
                    <div className ={`${postPage && 'mt-2'}`}>
                        <p className='text-[#d9d9d9] text-base'>{post?.text}</p>
                    </div>
                </div>
                <div>
                    {post?.image && <img
                        src={post?.image}
                        alt='selected image'
                        className='rounded-2xl max-h-80 object-cover' />}
                </div>
                <div className='text-[#63767d] flex justify-between w-10/12'>

                    <div className='flex items-center space-x-1 group'
                        onClick={openComments}>
                        <div className='icon group-hover:bg-opacity-10 group-hover:bg-[#1d9bf0]' >
                            <ChatIcon className='h-[22px] group-hover:text-[#1d9bf0]'></ChatIcon>
                        </div>
                        {comments.length > 0 && (
                            <span className='group-hover:text-[#1d9bf0] text-sm'>{comments.length}</span>
                        )}
                    </div>

                    {session?.user?.uid === post?.id ? (
                        <div className='flex items-center space-x-1 group' onClick={deletePost}>
                            <div className='icon group-hover:bg-opacity-10 group-hover:bg-red-600/10'>
                                <TrashIcon className='h-[22px] group-hover:text-red-600'></TrashIcon>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center space-x-1 group'>
                            <div className='icon group-hover:bg-green-500/10'>
                                <SwitchHorizontalIcon className='h-[22px] group-hover:text-green-500'></SwitchHorizontalIcon>
                            </div>
                        </div>
                    )}

                    <div className='flex items-center space-x-1 group' onClick={likePost}>
                        <div className='icon group-hover:bg-opacity-10 group-hover:bg-[#1d9bf0]'>
                            {liked ? (
                                <HeartIconFilled className='h-[22px] text-pink-600'></HeartIconFilled>
                            ) : (
                                <HeartIcon className='h-[22px] group-hover:text-pink-600'></HeartIcon>
                            )}
                        </div>
                        {likes?.length > 0 && (
                            <span className='group-hover:text-pink-600 text-sm'>{likes.length}</span>
                        )}
                    </div>

                    <div className='flex items-center space-x-1 group'>
                        <div className='icon group-hover:bg-opacity-10 group-hover:bg-[#1d9bf0] '>
                            <ShareIcon className='h-[22px] group-hover:text-[#1d9bf0]'></ShareIcon>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}
