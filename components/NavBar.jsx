import styles from "../styles/NavBar.module.css"
import Image from "next/image"
import { useSelector } from 'react-redux'
import Link from "next/link"

function NavBar() {

  // read data from the store with useSelector
  const quantity = useSelector((state) => state.cart.quantity)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src={"/images/telephone.png"} width={32} height={32} alt="" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>0315 8604063</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
            <li className={styles.listItem}>Homepage</li>
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Menu</li>
            <Image src="/images/logo.png" alt="" width="160px" height="69px" />
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/images/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NavBar