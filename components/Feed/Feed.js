import React, { useState, useEffect } from 'react'
import FeedHeader from './FeedHeader'
import Input from './Input/Input'
import { onSnapshot, query, collection, orderBy } from '@firebase/firestore'
import { db } from '../../firebase'
import Post from '../Post/Post'
import Modal from '../Modal/Modal'

export default function Feed() {

    const [posts, setPosts] = useState([])

    useEffect(
        () => (onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => (
            setPosts(snapshot.docs)
        )))
        , [db])

    return (
        <div className='flex-grow  max-w-2xl sm:ml-[73px] sm:border-l sm:border-r border-gray-700 xl:ml-[370px]'>
            <FeedHeader isHome>Home</FeedHeader>
            <Input></Input>
            <div className='pb-72'>
                {posts.map(post => {
                    return <Post key={post.id} id={post.id} post={post.data()} />
                })}
            </div>   
        </div>
    )
}
