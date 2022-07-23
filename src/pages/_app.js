import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store = {store}>
      <NextNProgress options={{showSpinner:false}} height={6} color="rgb(74,222,128)"/>
      <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp