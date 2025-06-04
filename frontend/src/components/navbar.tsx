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

useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [useLocation()]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
<Link
  to={email ? `/?email=${encodeURIComponent(email)}#test` : "/#test"}
  className={styles.logo}
  onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
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
      to={email ? `/bikes?email=${encodeURIComponent(email)}#test` : "/bikes#test"}
        onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
    >
      Bikes
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/pickup?email=${encodeURIComponent(email)}#test` : "/pickup#test"}
       onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
    >
      Como pegar
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/usage?email=${encodeURIComponent(email)}#test` : "/usage#test"}
      onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
    >
      Tempo de uso
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/internships?email=${encodeURIComponent(email)}#test` : "/internships#test"}
      onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
    >
      Estágios
    </Link>
  </li>
  <li>
    <Link
      to={email ? `/about?email=${encodeURIComponent(email)}#test` : "/about#test"}
    onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
    >
      Sobre nós
    </Link>
  </li>
</ul>

        <div className={`${styles.navButtons} ${isMenuOpen ? styles.active : ""}`}>
          <Link
            to={"login#test"}
            className={styles.loginButton}
                onClick={(e) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Aguarda o DOM carregar
  }}
          >
            {(email) ? email + " / logout" : "Login"}
            
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
