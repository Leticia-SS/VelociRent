"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Bike, Menu, X } from "lucide-react"
import styles from "./navbar.module.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <Bike size={24} />
          <span>VelociRent</span>
        </Link>

        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link to="/bikes" onClick={closeMenu}>
              Bikes
            </Link>
          </li>
          <li>
            <Link to="/pickup" onClick={closeMenu}>
              Como pegar
            </Link>
          </li>
          <li>
            <Link to="/usage" onClick={closeMenu}>
              Tempo de uso
            </Link>
          </li>
          <li>
            <Link to="/internships" onClick={closeMenu}>
              Estágios
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              Sobre nós
            </Link>
          </li>
        </ul>

        <div className={`${styles.navButtons} ${isMenuOpen ? styles.active : ""}`}>
          <Link to="/login" className={styles.loginButton} onClick={closeMenu}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
