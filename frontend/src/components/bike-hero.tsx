import styles from "./bike-hero.module.css"
import { ArrowRight } from "lucide-react"
import Logo from "../assets/logo-sem-fundo.png"

const BikeHero = () => {
    // alteração inutil
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Sua ida mais fácil e sempre disponível</h1>
        <p>A sua volta para casa é nossa responsabilidade, com bikes acessíveis e sustentáveis na ponta do seus dedos.</p>
        <div className={styles.heroButtons}>
          <button className={styles.primaryButton}>
            Alugue uma bicicleta! <ArrowRight size={16} />
          </button>
          <button className={styles.secondaryButton}>Acessar pelo app</button>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.imageContainer}>
          <img src={Logo} alt="logo dino" />
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouseIcon}></div>
        <span>Role para explorar</span>
      </div>
    </section>
  )
}

export default BikeHero
