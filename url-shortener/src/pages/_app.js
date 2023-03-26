import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Loki's Url Shortener</title>
      </Head>
      
    <Component {...pageProps} />
    </>
  
  )
}
