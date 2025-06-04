"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import styles from "./bike-hero.module.css"
import { ArrowRight } from "lucide-react"
import Logo from "../assets/logo-sem-fundo.png"
import { Outlet, useSearchParams } from 'react-router-dom';

const BikeHero = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const handleRentBike = () => {
    if (email) {
      navigate("/rental?email="+email)
    } else {
      navigate("/login", { state: { from: { pathname: "/rental" } } })
    }
  }

  const handleTelegramRent = () => {
    window.open("https://t.me/VelociRent_Bot", "_blank", "noopener,noreferrer")
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Sua ida mais fácil e sempre disponível</h1>
        <p>
          A sua volta para casa é nossa responsabilidade, com bikes acessíveis e sustentáveis na ponta do seus dedos.
        </p>
        <div className={styles.heroButtons}>
          <button className={styles.primaryButton} onClick={handleRentBike}>
            Alugue uma bicicleta! <ArrowRight size={16} />
          </button>
          <button className={styles.secondaryButton} onClick={handleTelegramRent}>
            Alugar pelo Telegram
          </button>
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
