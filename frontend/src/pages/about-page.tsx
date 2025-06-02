"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { Users, Leaf, Heart, Lightbulb } from "lucide-react"
import styles from "./about-page.module.css"
import Team from "../assets/velociteam.jpg"
import Gabriel from "../assets/gabriel.jpg"
import Giovani from "../assets/giovani.jpg"
import Leticia from "../assets/leticia.jpg"

const AboutPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const values = [
    {
      icon: <Leaf size={40} />,
      title: "Sustentabilidade",
      description:
        "Estamos comprometidos em reduzir as emissões de carbono e promover soluções de transporte ecologicamente corretas.",
    },
    {
      icon: <Users size={40} />,
      title: "Comunidade",
      description:
        "Construindo comunidades mais fortes ao conectar pessoas e tornar as cidades mais acessíveis para todos.",
    },
    {
      icon: <Heart size={40} />,
      title: "Saúde e Bem-estar",
      description: "Promovendo estilos de vida ativos e incentivando o bem-estar físico e mental através do ciclismo.",
    },
    {
      icon: <Lightbulb size={40} />,
      title: "Inovação",
      description:
        "Melhorando continuamente nossa tecnologia e serviços para oferecer a melhor experiência ao usuário.",
    },
  ]

  const team = [
    {
      name: "Leticia Saraiva",
      position: "CEO & Fundadora",
      bio: "Profissional com mais de uma década de experiência em planejamento urbano, focado em transporte sustentável.",
      image: Leticia,
    },
    {
      name: "Giovani Marlon",
      position: "CTO",
      bio: "Empreendedor de tecnologia apaixonado por soluções de mobilidade e tecnologias para cidades inteligentes.",
      image: Giovani,
    },
    {
      name: "Gabriel Vieira",
      position: "Head of Operations",
      bio: "Especialista em operações com experiência em logística e gestão da cadeia de recursos.",
      image: Gabriel,
    },
  ]

  const stats = [
    {
      number: "9,500+",
      label: "Bikes em uso",
    },
    {
      number: "30+",
      label: "Faculdades parceiras",
    },
    {
      number: "100,000+",
      label: "Usuários ativos",
    },
    {
      number: "4M+",
      label: "Corridas totais",
    },
  ]

  const handleWebsiteRental = () => {
    if (isAuthenticated) {
      navigate("/rental")
    } else {
      navigate("/login", { state: { from: { pathname: "/rental" } } })
    }
  }

  const handleTelegramRental = () => {
    window.open("https://t.me/VelociRent_Bot", "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutHero}>
        <div className={styles.aboutHeroContent}>
          <h1>Conheça o VelociRent</h1>
          <p>
            Transformando mobilidade urbana por meio da sustentabilidade, acessibilidade e inovando no ramo de
            bicicletas
          </p>
        </div>
      </div>

      <div className={styles.aboutContainer}>
        <div className={styles.missionSection}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2>Nossa missão</h2>
              <p>
                Nossa missão é revolucionar a mobilidade universitária, oferecendo acesso fácil e acessível a bicicletas
                de qualidade para estudantes e toda a comunidade acadêmica. Acreditamos que a bicicleta é a chave para
                um campus mais dinâmico, saudável e sustentável. Ao simplificar o aluguel de bikes, queremos empoderar
                cada estudante a explorar seu campus e a cidade ao redor com liberdade, contribuindo para uma rotina
                universitária mais ativa e conectada.
              </p>
              <p>
                Estamos empenhados em criar uma experiência de aluguel de bikes sem complicações em todas as
                universidades que atendemos. Nosso compromisso é com a qualidade da frota e a excelência no atendimento,
                garantindo que a mobilidade sobre duas rodas seja uma opção prática e prazerosa. Ao expandir nossa rede
                de franquias, visamos construir uma comunidade de ciclistas universitários, promovendo a sustentadoria e
                o bem-estar por meio de um transporte eficiente e divertido.
              </p>
            </div>
            <div className={styles.missionImage}>
              <img src={Team || "/placeholder.svg"} alt="BikeShare mission" />
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h3>Nosso Impacto</h3>
          <div className={styles.statsList}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.valuesSection}>
          <h3>Nossos Valores</h3>
          <div className={styles.valuesList}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.teamSection}>
          <h3>Conheça o nosso Time</h3>
          <div className={styles.teamList}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className={styles.teamInfo}>
                  <h4>{member.name}</h4>
                  <p className={styles.teamPosition}>{member.position}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aboutCTA}>
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no aplicativo e vá aonde quiser agora mesmo.</p>
          <div className={styles.aboutButtons}>
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

export default AboutPage
