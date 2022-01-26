import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard"

function PizzaList({ pizzaList }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        We call it California-style pizza. What exactly is that? Answer: damn good. 
        No rules, no “must have this” or “can’t have that” and no silly debates over what’s 
        the right way to eat it. We just love pizza and all its varieties. And we love California, 
        where we can work with San Francisco-style sour dough, lots of fresh, locally-sourced ingredients 
        and set up shop in a neighborhood where we can welcome one generation after another with good 
        food and good times.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map(pizza => (
          <PizzaCard pizza={pizza} key={pizza._id} />
        ))}
      </div>
    </div>
  )
}

export default PizzaList
