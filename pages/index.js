import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Slider from '../components/Slider'
import PizzaList from '../components/PizzaList'
import axios from "axios"

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NEXT JS Food Ordering App by Shahid</title>
        <meta name="description" content="Best pizza shop in Karachi." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export const getServerSideProps = async () => {
  
  const res = await axios.get("http://localhost:3000/api/products")

  return {
    props: {
      pizzaList: res.data,
    }
  }
}