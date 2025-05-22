import styles from "./how-it-works.module.css"
import { Smartphone, Map, BikeIcon, ThumbsUp } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone size={32} />,
      title: "Download the app",
      description: "Get our free app for iOS or Android to get started.",
    },
    {
      icon: <Map size={32} />,
      title: "Find a bike",
      description: "Locate the nearest bike station on the map.",
    },
    {
      icon: <BikeIcon size={32} />,
      title: "Scan & unlock",
      description: "Scan the QR code on the bike to unlock it.",
    },
    {
      icon: <ThumbsUp size={32} />,
      title: "Enjoy the ride",
      description: "Ride to your destination and park at any station.",
    },
  ]

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>How it works</h2>
          <p className={styles.subtitle}>Renting a bike has never been easier</p>

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
            <img src="/placeholder.svg?height=500&width=400" alt="Person using the BikeShare app" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
