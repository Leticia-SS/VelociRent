import styles from "./bike-hero.module.css"
import { ArrowRight } from "lucide-react"
import Logo from "../assets/logo-sem-fundo.png"

const BikeHero = () => {
    // alteração inutil
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Explore the city on two wheels</h1>
        <p>Convenient, affordable, and eco-friendly bike rentals at your fingertips</p>
        <div className={styles.heroButtons}>
          <button className={styles.primaryButton}>
            Rent a bike <ArrowRight size={16} />
          </button>
          <button className={styles.secondaryButton}>Download app</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.imageContainer}>
          <img src={Logo} alt="logo dino" />
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouseIcon}></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default BikeHero
