import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/cartSlice"

function Product({ pizza }) {
  
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(pizza.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number)
  }
  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const changeHandler = (e, option) => {
    const checked = e.target.checked

    if(checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    dispatch(addProduct({...pizza, quantity, price, extras}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" objectFit="contain" priority />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src={"/images/size.png"} layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src={"/images/size.png"} layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src={"/images/size.png"} layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map(option => (
            <div className={styles.option} key={option._id}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={option.text}
                name={option.text}
                onChange={(e) => changeHandler(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            className={styles.quantity}
            type="number"
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {

  const res = await axios.get(`https://nextjs-food-order-app-1jo18d5ha-syedshahidashiqali.vercel.app/api/products/${params.id}`)

  return {
    props: {
      pizza: res.data,
    }
  }
}

export default Product
