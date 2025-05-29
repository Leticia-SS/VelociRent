import { Bike, Battery, Wind, Shield, Weight, Clock } from "lucide-react"
import "./bikes-page.css"

const BikesPage = () => {
  const bikes = [
    {
      id: 1,
      name: "City Cruiser",
      description: "Perfect for casual rides and city commuting",
      image: "https://placehold.co/600x400",
      features: [
        { icon: <Battery size={20} />, text: "Up to 4 hours of battery life" },
        { icon: <Wind size={20} />, text: "Lightweight aluminum frame" },
        { icon: <Shield size={20} />, text: "Built-in security features" },
      ],
    },
    {
      id: 2,
      name: "Urban Explorer",
      description: "Designed for longer trips and varied terrain",
      image: "https://placehold.co/600x400",
      features: [
        { icon: <Battery size={20} />, text: "Up to 6 hours of battery life" },
        { icon: <Weight size={20} />, text: "Reinforced frame for durability" },
        { icon: <Clock size={20} />, text: "Quick charging capability" },
      ],
    },
    {
      id: 3,
      name: "Mountain Rider",
      description: "Tackle hills and rough terrain with ease",
      image: "https://placehold.co/600x400",
      features: [
        { icon: <Battery size={20} />, text: "Up to 5 hours of battery life" },
        { icon: <Wind size={20} />, text: "All-terrain tires" },
        { icon: <Shield size={20} />, text: "Enhanced suspension system" },
      ],
    },
  ]

  return (
    <div className="bikesPage">
      <div className="bikesHero">
        <div className="bikesHeroContent">
          <h1>Our Bikes</h1>
          <p>Explore our range of high-quality bikes available for rent</p>
        </div>
      </div>

      <div className="bikesContainer">
        <div className="bikesIntro">
          <div className="bikeIconContainer">
            <Bike size={48} />
          </div>
          <h2>Choose the perfect ride for your journey</h2>
          <p>
            We offer a variety of bikes to suit your needs, whether you're commuting to work, exploring the city, or
            enjoying a leisurely ride through the park. All our bikes are regularly maintained and sanitized for your
            safety and comfort.
          </p>
        </div>

        <div className="bikesList">
          {bikes.map((bike) => (
            <div key={bike.id} className="bikeCard">
              <div className="bikeImageContainer">
                <img src={bike.image || "/placeholder.svg"} alt={bike.name} />
              </div>
              <div className="bikeContent">
                <h3>{bike.name}</h3>
                <p className="bikeDescription">{bike.description}</p>
                <div className="bikeFeatures">
                  {bike.features.map((feature, index) => (
                    <div key={index} className="bikeFeature">
                      <div className="bikeFeatureIcon">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <button className="bikeRentButton">Rent Now</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bikesCTA">
          <h3>Ready to ride?</h3>
          <p>Download our app to find and rent bikes near you in seconds.</p>
          <div className="bikesButtons">
            <button className="primaryButton">Download App</button>
            <button className="secondaryButton">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BikesPage
