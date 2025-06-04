import styles from "./footer.module.css"
import { Bike, Facebook, Twitter, Instagram, Smartphone, Mail, MapPin } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom" 
import { useSearchParams } from 'react-router-dom';

const Footer = () => {

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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <div className={styles.logo}>
              <Bike size={24} />
              <span>VelociRent</span>
            </div>
            <p>A sua volta para casa é nossa responsabilidade, com bikes acessíveis e sustentáveis na ponta do seus dedos.</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h3>Nossos Links</h3>
            <ul>
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
          </div>

          <div className={styles.footerColumn}>
            <h3>Suporte</h3>
            <ul>
              <li>
                <a href="#">Termos de Serviço</a>
              </li>
              <li>
                <a href="#">Política de Privacidade</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3>Contato</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Smartphone size={16} />
                <span>(+55) 4002-8922</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>VeloSuport@vmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>23 Via Verde, Varsóvia</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} VelociBikes. Todos os direitos reservados. RAAWWRRRR!!!</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
