import styles from "./features.module.css"
import { MapPin, Clock, CreditCard, Leaf } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Localização ideal",
      description: "Bikes disponíveis e de fácil acesso no campus da sua faculdade.",
    },
    {
      icon: <Clock size={32} />,
      title: "Ao seu dispor",
      description: "Nossas bikes podem ficar a sua disposição por mais de 24 horas.",
    },
    {
      icon: <CreditCard size={32} />,
      title: "Sem custos",
      description: "Com sua matrícula ativa, você pode fazer o uso de nossas bikes.",
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco-Friendly",
      description: "Diminua a emissão de carbono e crie um mundo mais verde.",
    },
  ]

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2>Por que ir de VelociRent?</h2>
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
