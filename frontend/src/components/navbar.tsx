"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Bike, Menu, X } from "lucide-react"
import styles from "./navbar.module.css"
import { Outlet, useSearchParams } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";



const Navbar = () => {

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

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
        <Link to={email ? `/?email=${encodeURIComponent(email)}` : "/"} className={styles.logo} onClick={closeMenu}
        
        >
          <Bike size={24} />
          <span>VelociRent</span>
        </Link>

        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

<ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
  <li>
    <Link
      to={email ? `/bikes?email=${encodeURIComponent(email)}` : "/bikes"}
      onClick={closeMenu}
    >
      Bikes
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/pickup?email=${encodeURIComponent(email)}` : "/pickup"}
      onClick={closeMenu}
    >
      Como pegar
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/usage?email=${encodeURIComponent(email)}` : "/usage"}
      onClick={closeMenu}
    >
      Tempo de uso
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/internships?email=${encodeURIComponent(email)}` : "/internships"}
      onClick={closeMenu}
    >
      Estágios
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/about?email=${encodeURIComponent(email)}` : "/about"}
      onClick={closeMenu}
    >
      Sobre nós
    </Link>
  </li>
</ul>

        <div className={`${styles.navButtons} ${isMenuOpen ? styles.active : ""}`}>
          <Link
            to={"login"}
            className={styles.loginButton}
            onClick={closeMenu}
          >
            {(email) ? email + " / logout" : "Login"}
            
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
