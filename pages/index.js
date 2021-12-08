import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Login from '../components/Login/Login'

import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import Modal from '../components/Modal/Modal'
import Widgets from '../components/Widgets/Widgets'

export default function Home({ trendingResults, followResults, providers }) {

  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const session = useSession();

  if (!session.data) return <Login providers={providers} ></Login >


  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto ">
        <Sidebar />
        <Feed />
        <Widgets trendingResults={trendingResults} followResults={followResults} />
        {isOpen && <Modal />}

      </main>
    </div>
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