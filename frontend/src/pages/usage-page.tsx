"use client"

import { useNavigate } from "react-router-dom"
import { Clock, Home, MapPin, Calendar, Star, Shield, Zap, Coffee } from "lucide-react"
import styles from "./usage-page.module.css"
import { useSearchParams } from 'react-router-dom';

const UsagePage = () => {
  const navigate = useNavigate()

  const usageOptions = [
    {
      id: 1,
      icon: <Zap size={40} />,
      title: "Viagem Rápida",
      duration: "15 minutos - 2 horas",
      description: "Perfeito para rápidas viagens ao redor do campus.",
      features: [
        "Ideal para locomoção na cidade",
        "Viagem rápida de ida e volta",
        "Disponibiliza a bike mais rapidamente",
        "Opção mais confortável",
      ],
      popular: false,
    },
    {
      id: 2,
      icon: <Coffee size={40} />,
      title: "Aventuras do Dia a Dia",
      duration: "2 - 12 horas",
      description: "Explore a cidade na sua velocidade.",
      features: [
        "Perfeito para dias cheios de compromisso",
        "Tempo de retorno flexível",
        "Pode fazer diversas paradas",
        "Possibilidade de uso turístico",
      ],
      popular: false,
    },
    {
      id: 3,
      icon: <Home size={40} />,
      title: "Volte para casa",
      duration: "Mais de 24 horas",
      description: "Pegue a bike para voltar para casa.",
      features: [
        "Passar a noite com a bicicleta",
        "Utilize para ir e voltar",
        "Uso responsável perto da sua casa",
        "Mais flexível",
      ],
      popular: true,
    },
  ]

  const benefits = [
    {
      icon: <Clock size={32} />,
      title: "Tempo flexível",
      description: "Sempre disponível, no seu tempo e para o seu tempo.",
    },
    {
      icon: <MapPin size={32} />,
      title: "Sem pressão de retorno",
      description: "Você pode retirar para utilizar em qualquer necessidade pessoal.",
    },
    {
      icon: <Shield size={32} />,
      title: "Prioridade para Segurança",
      description: "Vá e volte de maneira segura para casa.",
    },
    {
      icon: <Star size={32} />,
      title: "Experiência Premium",
      description: "Aproveite a liberdade e a paz de uma viagem de bicicleta.",
    },
  ]

const handleWebsiteRental = () => {
  if (email) {
    navigate("/rental?email=" + email);
  } else {
    navigate("/login", { state: { from: { pathname: "/rental" } } });
  }
};

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');  const handleTelegramRental = () => {
    window.open("https://t.me/VelociRent_Bot", "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.usagePage}>
      <div className={styles.usageHero}>
        <div className={styles.usageHeroContent}>
          <h1>Entenda o Tempo de Uso</h1>
          <p>Viagens curtas, longas ou sua ida e volta para casa.</p>
        </div>
      </div>

      <div className={styles.usageContainer}>
        <div className={styles.usageIntro}>
          <div className={styles.usageIconContainer}>
            <Calendar size={48} />
          </div>
        </div>

        <div className={styles.optionsSection}>
          <h3>Como você pode utilizar?</h3>
          <div className={styles.optionsList}>
            {usageOptions.map((option) => (
              <div key={option.id} className={`${styles.optionCard} ${option.popular ? styles.popular : ""}`}>
                {option.popular && <div className={styles.popularBadge}>Mais utilizado</div>}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3>VelociRent como a sua opção</h3>
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

        <div className={styles.usageCTA}>
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no site ou Telegram e vá aonde quiser agora mesmo.</p>
          <div className={styles.usageButtons}>
            <button className={styles.primaryButton} onClick={handleWebsiteRental}>
              Aluguel no Site
            </button>
            <button className={styles.secondaryButton} onClick={handleTelegramRental}>
              Aluguel no Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsagePage
