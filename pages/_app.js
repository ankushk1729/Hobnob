import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress options={{showSpinner:false}} height={6} color="rgb(74,222,128)"/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp