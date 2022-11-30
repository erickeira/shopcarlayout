import Header from '../components/header'
import AuthProvider, { AuthContext } from '../context'
import '../styles/globals.css'
import styles from '../styles/app.module.css'


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header/>
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default MyApp
