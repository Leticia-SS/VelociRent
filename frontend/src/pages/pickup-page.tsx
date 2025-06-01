import { MapPin, Smartphone, QrCode, Unlock, CheckCircle, Clock, Shield, AlertCircle } from "lucide-react"
import styles from "./pickup-page.module.css"

const PickupPage = () => {
  const steps = [
    {
      id: 1,
      icon: <Smartphone size={40} />,
      title: "Open the App",
      description: "Launch the BikeShare app on your smartphone and ensure you're logged in to your account.",
      details: ["Make sure location services are enabled", "Check that you have a stable internet connection"],
    },
    {
      id: 2,
      icon: <MapPin size={40} />,
      title: "Find a Station",
      description: "Use the map to locate the nearest bike station with available bikes.",
      details: ["Green dots indicate available bikes", "Red dots show stations that are full or out of service"],
    },
    {
      id: 3,
      icon: <QrCode size={40} />,
      title: "Scan the QR Code",
      description: "Point your phone's camera at the QR code located on the bike's handlebars.",
      details: ["Hold your phone steady for 2-3 seconds", "Make sure the QR code is well-lit and visible"],
    },
    {
      id: 4,
      icon: <Unlock size={40} />,
      title: "Unlock the Bike",
      description: "The bike will automatically unlock once the QR code is successfully scanned.",
      details: ["You'll hear a click sound when unlocked", "The LED light will turn green"],
    },
    {
      id: 5,
      icon: <CheckCircle size={40} />,
      title: "Start Your Ride",
      description: "Adjust the seat height if needed and begin your journey safely.",
      details: ["Check brakes before riding", "Ensure the helmet fits properly if using one"],
    },
  ]

  const tips = [
    {
      icon: <Clock size={24} />,
      title: "Check Operating Hours",
      description: "Most stations operate 24/7, but some may have limited hours in certain areas.",
    },
    {
      icon: <Shield size={24} />,
      title: "Inspect Before Riding",
      description: "Always check the bike's condition, including brakes, tires, and chain before starting.",
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Report Issues",
      description: "If you notice any problems with the bike, report them immediately through the app.",
    },
  ]

  return (
    <div className={styles.pickupPage}>
      <div className={styles.pickupHero}>
        <div className={styles.pickupHeroContent}>
          <h1>How to Pick Up a Bike</h1>
          <p>Follow these simple steps to get your bike and start riding in minutes</p>
        </div>
      </div>

      <div className={styles.pickupContainer}>
        <div className={styles.pickupIntro}>
          <div className={styles.pickupIconContainer}>
            <MapPin size={48} />
          </div>
          <h2>Getting started is easy</h2>
          <p>
            Our streamlined pickup process ensures you can get on the road quickly and safely. Follow the step-by-step
            guide below to pick up your bike from any BikeShare station.
          </p>
        </div>

        <div className={styles.stepsSection}>
          <h3>Step-by-Step Guide</h3>
          <div className={styles.stepsList}>
            {steps.map((step) => (
              <div key={step.id} className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>{step.id}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <div className={styles.stepContent}>
                  <h4>{step.title}</h4>
                  <p className={styles.stepDescription}>{step.description}</p>
                  <ul className={styles.stepDetails}>
                    {step.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tipsSection}>
          <h3>Important Tips</h3>
          <div className={styles.tipsList}>
            {tips.map((tip, index) => (
              <div key={index} className={styles.tipCard}>
                <div className={styles.tipIcon}>{tip.icon}</div>
                <div className={styles.tipContent}>
                  <h4>{tip.title}</h4>
                  <p>{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pickupCTA}>
          <h3>Ready to ride?</h3>
          <p>Download our app and find the nearest bike station to get started.</p>
          <div className={styles.pickupButtons}>
            <button className={styles.primaryButton}>Download App</button>
            <button className={styles.secondaryButton}>Find Stations</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PickupPage
