import Head from 'next/head'
import Header from '../components/Header'
import StyleBar from '../components/StyleBar'


export default function Home() {
  return (
    <>
      <Head>
        <title>Editr. - yet another simple Rich Text Editor</title>
      </Head>
      <Header />
      <StyleBar />
    </>
  )
}
