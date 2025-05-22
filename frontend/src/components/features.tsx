import styles from "./features.module.css"
import { MapPin, Clock, CreditCard, Leaf } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Convenient Locations",
      description: "Find bikes at hundreds of stations across the city, always within walking distance.",
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Availability",
      description: "Our bikes are available day and night, whenever you need them.",
    },
    {
      icon: <CreditCard size={32} />,
      title: "Affordable Pricing",
      description: "Pay only for what you use with flexible pricing plans for every budget.",
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint and help create a cleaner, greener city.",
    },
  ]

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2>Why choose BikeShare?</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconContainer}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
