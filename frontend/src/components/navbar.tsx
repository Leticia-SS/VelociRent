"use client"

import { useState } from "react"
import styles from "./navbar.module.css"
import { Bike, Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Bike size={24} />
          <span>VelociRent</span>
        </div>

        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <a href="#">Bikes</a>
          </li>
          <li>
            <a href="#">Como retirar</a>
          </li>
          <li>
            <a href="#">Tempo de uso</a>
          </li>
          <li>
            <a href="#">Estágios</a>
          </li>
          <li>
            <a href="#">Sobre nós</a>
          </li>
        </ul>

        <div className={`${styles.navButtons} ${isMenuOpen ? styles.active : ""}`}>
          <button className={styles.loginButton}>Login</button>
          <button className={styles.signupButton}>Cadastre-se</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
