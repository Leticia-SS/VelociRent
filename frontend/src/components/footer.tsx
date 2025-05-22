import styles from "./footer.module.css"
import { Bike, Facebook, Twitter, Instagram, Smartphone, Mail, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <div className={styles.logo}>
              <Bike size={24} />
              <span>BikeShare</span>
            </div>
            <p>Convenient, affordable, and eco-friendly bike rentals for everyone.</p>
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
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Safety</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3>Contact</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Smartphone size={16} />
                <span>(123) 456-7890</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>info@bikeshare.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>123 Bike Street, City</span>
              </div>
            </div>
            <div className={styles.appButtons}>
              <button className={styles.appButton}>App Store</button>
              <button className={styles.appButton}>Google Play</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} BikeShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
