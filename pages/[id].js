import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal/Modal'
import Post from '../components/Post/Post'
import Sidebar from '../components/Sidebar/Sidebar'
import Head from 'next/head'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore'
import { db } from '../firebase'
import FeedHeader from '../components/Feed/FeedHeader'
import Login from '../components/Login/Login'
import Comment from '../components/Comment/Comment'
import Widgets from '../components/Widgets/Widgets'

export default function PostPage({ trendingResults, followResults, providers }) {

    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useRecoilState(modalState)
    const [post, setPost] = useState()
    const [comments, setComments] = useState()
    const router = useRouter()
    const { id } = router.query



    useEffect(() => (
        onSnapshot(doc(db, 'posts', id), snapshot => {
            setPost(snapshot.data())
        })
    ), [db, id])

    useEffect(() => (
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            snapshot => setComments(snapshot.docs)
        )
    ), [db, id])

    if (!session) return <Login providers={providers} ></Login >

    return (
        <>
            <Head>
                <title>{post?.username} on Twitter: "{post?.text}"</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto ">
                <Sidebar />
                <div className='flex-grow  max-w-2xl sm:ml-[73px] sm:border-l sm:border-r border-gray-700 xl:ml-[370px]'>

                    <FeedHeader>Tweet</FeedHeader>
                    <Post id={id} post={post} postPage />

                    {comments?.length > 0 &&
                        comments.map(comment =>
                            <Comment key={comment.id} id={comment.id} comment={comment.data()} />)}
                </div>
                <Widgets trendingResults={trendingResults} followResults={followResults} />
                {isOpen && <Modal />}

            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(res => res.json())

    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(res => res.json())

    const providers = await getProviders()
    const session = await getSession(context)

    return {
        props: {
            trendingResults,
            followResults,
            providers,
            session
        }
    }
}