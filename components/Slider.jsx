import styles from "../styles/Slider.module.css"
import Image from "next/image"
import { useState } from "react"

const images = [
  "/images/featured.png",
  "/images/featured2.png",
  "/images/featured3.png",
]

function Slider() {

  const [index, setIndex] = useState(0)

  const handleArrow = (direction) => {
    if(direction === "l"){
      setIndex(index !== 0 ? index - 1 : 2)
    }
    if(direction === "r"){
      setIndex(index === 2 ? 0 : index + 1 )
      // setIndex(index !== 2 ? index + 1 : 0) <OR>
    }
  }
  // console.log(index)
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{left:0}} onClick={() => handleArrow("l")}>
        <Image src={"/images/arrowl.png"} layout="fill" objectFit="contain" alt="" />
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
          {images.map((img, i) => {
            return (
              <div className={styles.imgContainer} key={i}>
                <Image src={img} layout="fill" objectFit="contain" alt="" />
              </div>
            )
          })}
      </div>
      <div className={styles.arrowContainer} style={{right:0}} onClick={() => handleArrow("r")}>
        <Image src={"/images/arrowr.png"} layout="fill" objectFit="contain" alt="" />
      </div>
    </div>
  )
}

export default Slider
