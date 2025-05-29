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
          <span>BikeShare</span>
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
              How to pick up
            </Link>
          </li>
          <li>
            <Link to="/usage" onClick={closeMenu}>
              Usage time
            </Link>
          </li>
          <li>
            <Link to="/internships" onClick={closeMenu}>
              Internships
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>

        <div className={`${styles.navButtons} ${isMenuOpen ? styles.active : ""}`}>
          <button className={styles.loginButton}>Log in</button>
          <button className={styles.signupButton}>Sign up</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
