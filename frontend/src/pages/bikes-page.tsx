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
          <h1>Nossas bikes</h1>
          <p>Explore nossa variedade de bicicletas de alta qualidade disponíveis para aluguel</p>
        </div>
      </div>

      <div className="bikesContainer">
        <div className="bikesIntro">
          <div className="bikeIconContainer">
            <Bike size={48} />
          </div>
          <h2>Selecione a escolha ideal para a sua jornada</h2>
          <p>
            Apresentamos uma variedade de bicicletas para atender às suas necessidades, 
            seja para o deslocamento diário, a exploração urbana ou um passeio tranquilo no parque. 
            Todas as nossas bicicletas são regularmente mantidas e higienizadas para garantir sua segurança e conforto.
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
                <button className="bikeRentButton">Alugue agora!</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bikesCTA">
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no aplicativo e vá aonde quiser agora mesmo.</p>
          <div className="bikesButtons">
            <button className="primaryButton">Aluguel no Telegram</button>
            <button className="secondaryButton">Aluguel no Site</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BikesPage
