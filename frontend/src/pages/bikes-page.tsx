"use client"

import { useNavigate } from "react-router-dom"
import { Bike, Leaf, Wind, Shield, Weight, Gauge, User, Zap, Compass } from "lucide-react"
import "./bikes-page.css"
import { useSearchParams } from 'react-router-dom';
import Explorer from "../assets/caloiexplorer.webp"
import Speed from "../assets/caloispeed.jpg"
import Mountain from "../assets/oggimountain.png"


const BikesPage = () => {
  const navigate = useNavigate()
  
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');  

  const bikes = [
    {
      id: 1,
      name: "Caloi Speed Pro",
      description: "Ideal para quem busca velocidade e desempenho no asfalto",
      image: Explorer,
      features: [
        { icon: <User size={20} />, text: "Escolha mais popular" },
        { icon: <Leaf size={20} />, text: "Aro leve de alumínio" },
        { icon: <Shield size={20} />, text: "Design mais seguro" },
      ],
    },
    {
      id: 2,
      name: "Caloi Explorer Pro",
      description: "Perfeita para trilhas leves e aventuras urbanas com conforto",
      image: Speed,
      features: [
        { icon: <Compass size={20} />, text: "Combinação perfeita para trilhas" },
        { icon: <Weight size={20} />, text: "Maior durabilidade no aro" },
        { icon: <Gauge size={20} />, text: "Alto desempenho de velocidade" },
      ],
    },
    {
      id: 3,
      name: "Oggi Mountain Storm",
      description: "Feita para encarar trilhas exigentes com robustez e controle total",
      image: Mountain,
      features: [
        { icon: <Zap size={20} />, text: "Mais de 6 horas de bateria" },
        { icon: <Wind size={20} />, text: "Pneus adaptáveis" },
        { icon: <Shield size={20} />, text: "Systema de suspensão melhorado" },
      ],
    },
  ]

const handleWebsiteRental = () => {
  if (email) {
    navigate("/rental?email=" + encodeURIComponent(email) + "#test");
    
    // Aguardar a navegação terminar para fazer o scroll
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Pequeno delay para garantir que o elemento esteja no DOM
  } else {
    navigate("/login", { state: { from: { pathname: "/rental" } } });
  }
};

  const handleTelegramRental = () => {
    window.open("https://t.me/VelociRent_Bot", "_blank", "noopener,noreferrer")
  }

  const handleIndividualBikeRent = () => {
  if (email) {
    navigate("/rental?email=" + encodeURIComponent(email) + "#test");
    
    // Aguardar a navegação terminar para fazer o scroll
    setTimeout(() => {
      const el = document.getElementById("test");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Pequeno delay para garantir que o elemento esteja no DOM
  } else {
    navigate("/login", { state: { from: { pathname: "/rental" } } });
  }
  }

  return (
    <div id="test" className="bikesPage">
      <div className="bikesHero">
        <div className="bikesHeroContent">
          <h1>Nossas bikes</h1>
          <p>Explore nossa variedade de bicicletas de alta qualidade disponíveis para aluguel.</p>
        </div>
      </div>

      <div className="bikesContainer">
        <div className="bikesIntro">
          <div className="bikeIconContainer">
            <Bike size={48} />
          </div>
          <h2>Selecione a escolha ideal para a sua jornada</h2>
          <p>
            Apresentamos uma variedade de bicicletas para atender às suas necessidades, seja para o deslocamento diário,
            a exploração urbana ou um passeio tranquilo no parque. Todas as nossas bicicletas são regularmente mantidas
            e higienizadas para garantir sua segurança e conforto.
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
                <button className="bikeRentButton" onClick={handleIndividualBikeRent}>
                  Alugue agora!
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bikesCTA">
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no site ou Telegram e vá aonde quiser agora mesmo.</p>
          <div className="bikesButtons">
            <button className="primaryButton" onClick={handleWebsiteRental}>
              Aluguel no Site
            </button>
            <button className="secondaryButton" onClick={handleTelegramRental}>
              Aluguel no Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BikesPage
