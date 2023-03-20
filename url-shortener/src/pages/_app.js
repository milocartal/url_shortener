import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>URL Shortener 2000 | By Milo</title>
      </Head>
      
    <Component {...pageProps} />
    </>
  
  )
}
