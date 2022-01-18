import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS Food Ordering App by Shahid</title>
        <meta name="description" content="Best pizza shop in Karachi." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      hello
    </div>
  )
}
