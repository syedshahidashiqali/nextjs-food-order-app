import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Slider from '../components/Slider'
import PizzaList from '../components/PizzaList'
import axios from "axios"
import { useState } from "react"
import AddButton from '../components/AddButton'
import Add from '../components/Add'

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>NEXT JS Food Ordering App by Shahid</title>
        <meta name="description" content="Best pizza shop in Karachi." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  let admin = false

  if(myCookie.token === process.env.TOKEN) {
    admin = true
  }
  
  const res = await axios.get("https://nextjs-food-order-app-1jo18d5ha-syedshahidashiqali.vercel.app/api/products")

  return {
    props: {
      pizzaList: res.data,
      admin,
    }
  }
}