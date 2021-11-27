import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className = "bg-black min-h-screen flex max-w-[1500px] mx-auto ">
        <Sidebar/>
        <Feed/>
      </main>
    </div>
  )
}