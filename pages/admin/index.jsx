import styles from "../../styles/Admin.module.css"
import Image from "next/image"
import axios from "axios"
import { useState } from "react"

const Admin = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products)
  const [orderList, setOrderList] = useState(orders)

  const status = ["preparing", "on the way", "delivered"]

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:3000/api/products/${id}`)
      setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    }catch(err){
      console.log(err)
    }
  }

  const handleStatus = async (id) => {

    const item = orderList.filter(order => order._id === id)[0]
    const currentStatus = item.status

    try{
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {status: currentStatus + 1 })
      setOrderList([
        res.data,
        ...orderList.filter(order => order._id !== id)
      ])
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pizzaList.map((pizza) => (
              <tr className={styles.trTitle} key={product._id}>
                <td>
                  <Image
                    src={pizza.img}
                    width="50"
                    height="50"
                    objectFit="cover"
                  />
                </td>
                <td>{pizza._id.slice(0, 5)}...</td>
                <td>{pizza.title}</td>
                <td>${pizza.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? 
                  (
                    <span>Cash</span>
                  ) : (
                    <span>Paid</span>
                  )}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  const productRes = await axios.get("http://localhost:3000/api/products")
  const orderRes = await axios.get("http://localhost:3000/api/orders")

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    }
  }
}
export default Admin