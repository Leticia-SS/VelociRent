import styles from "./how-it-works.module.css"
import { Smartphone, Map, BikeIcon, ThumbsUp } from "lucide-react"
import Icon from "../assets/logo-icon-sem-fundo.png"


const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone size={32} />,
      title: "Acesse o canal ou site",
      description: "Aluguel pelo site VelociRent ou pelo Telegram com VelociBot.",
    },
    {
      icon: <Map size={32} />,
      title: "Faça o login",
      description: "Entre com sua mátricula ativa para poder retirar a bike.",
    },
    {
      icon: <BikeIcon size={32} />,
      title: "Escolha sua VelociBike",
      description: "Selecione qual bike você vai utilizar.",
    },
    {
      icon: <ThumbsUp size={32} />,
      title: "Curta o passeio",
      description: "Utilize a bike para qualquer viagem desejada.",
    },
  ]

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Como funciona?</h2>
          <p className={styles.subtitle}>Voltar pra casa nunca foi tão fácil!</p>

          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <img src={Icon} alt="Dinossauro com bicicleta" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
