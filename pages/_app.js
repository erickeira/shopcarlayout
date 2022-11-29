import Header from '../components/header'
import AuthProvider, { AuthContext } from '../context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
