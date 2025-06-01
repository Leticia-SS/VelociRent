import { Clock, Home, MapPin, Calendar, Star, Shield, Zap, Coffee } from "lucide-react"
import styles from "./usage-page.module.css"

const UsagePage = () => {
  const usageOptions = [
    {
      id: 1,
      icon: <Zap size={40} />,
      title: "Quick Rides",
      duration: "15 minutes - 2 hours",
      description: "Perfect for short trips around the city, commuting, or quick errands.",
      features: [
        "Ideal for city commuting",
        "Quick station-to-station trips",
        "No overnight storage needed",
        "Most affordable option",
      ],
      price: "Starting at $2/hour",
      popular: false,
    },
    {
      id: 2,
      icon: <Coffee size={40} />,
      title: "Day Adventures",
      duration: "2 - 12 hours",
      description: "Explore the city at your own pace with extended rental periods.",
      features: ["Perfect for sightseeing", "Flexible return times", "Multiple stop capability", "Great for tourists"],
      price: "Starting at $15/day",
      popular: true,
    },
    {
      id: 3,
      icon: <Home size={40} />,
      title: "Take Home",
      duration: "24+ hours",
      description: "Take the bike home for extended use, perfect for multi-day adventures.",
      features: ["Keep bike overnight", "Use for multiple days", "Store at your location", "Maximum flexibility"],
      price: "Starting at $25/day",
      popular: false,
    },
  ]

  const benefits = [
    {
      icon: <Clock size={32} />,
      title: "Flexible Timing",
      description: "Choose the rental duration that fits your needs, from minutes to days.",
    },
    {
      icon: <MapPin size={32} />,
      title: "No Return Pressure",
      description: "With longer rentals, explore without worrying about return deadlines.",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Storage",
      description: "Take bikes home safely with our built-in security features.",
    },
    {
      icon: <Star size={32} />,
      title: "Premium Experience",
      description: "Enjoy the freedom of having your own bike for as long as you need.",
    },
  ]

  const guidelines = [
    {
      title: "Quick Rides (Under 2 hours)",
      rules: [
        "Return to any BikeShare station",
        "Perfect for one-way trips",
        "Automatic billing when returned",
        "No special requirements",
      ],
    },
    {
      title: "Day Adventures (2-12 hours)",
      rules: [
        "Can be returned to any station",
        "Ideal for exploring multiple locations",
        "Pause timer at designated rest stops",
        "Extended battery life available",
      ],
    },
    {
      title: "Take Home (24+ hours)",
      rules: [
        "Secure the bike at your location",
        "Use the app to pause/resume rental",
        "Return to any station when finished",
        "Responsible for bike security",
      ],
    },
  ]

  return (
    <div className={styles.usagePage}>
      <div className={styles.usageHero}>
        <div className={styles.usageHeroContent}>
          <h1>Usage Time Options</h1>
          <p>From quick trips to extended adventures - choose the rental duration that works for you</p>
        </div>
      </div>

      <div className={styles.usageContainer}>
        <div className={styles.usageIntro}>
          <div className={styles.usageIconContainer}>
            <Calendar size={48} />
          </div>
          <h2>Rent for as long as you need</h2>
          <p>
            Whether you need a bike for a quick commute, a day of exploration, or an extended adventure, BikeShare
            offers flexible rental options to match your lifestyle. Take bikes home, use them for multiple days, or just
            enjoy short rides around the city.
          </p>
        </div>

        <div className={styles.optionsSection}>
          <h3>Choose Your Rental Duration</h3>
          <div className={styles.optionsList}>
            {usageOptions.map((option) => (
              <div key={option.id} className={`${styles.optionCard} ${option.popular ? styles.popular : ""}`}>
                {option.popular && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon}>{option.icon}</div>
                  <h4>{option.title}</h4>
                  <p className={styles.optionDuration}>{option.duration}</p>
                </div>
                <div className={styles.optionContent}>
                  <p className={styles.optionDescription}>{option.description}</p>
                  <ul className={styles.optionFeatures}>
                    {option.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <div className={styles.optionPrice}>{option.price}</div>
                  <button className={styles.optionButton}>Select Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3>Why Choose Flexible Rentals?</h3>
          <div className={styles.benefitsList}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <div className={styles.benefitContent}>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.guidelinesSection}>
          <h3>Usage Guidelines</h3>
          <div className={styles.guidelinesList}>
            {guidelines.map((guideline, index) => (
              <div key={index} className={styles.guidelineCard}>
                <h4>{guideline.title}</h4>
                <ul>
                  {guideline.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex}>{rule}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.usageCTA}>
          <h3>Ready to start your adventure?</h3>
          <p>Download our app and choose the perfect rental duration for your next ride.</p>
          <div className={styles.usageButtons}>
            <button className={styles.primaryButton}>Start Renting</button>
            <button className={styles.secondaryButton}>View Pricing</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsagePage
