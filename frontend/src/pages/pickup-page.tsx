"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { MapPin, Smartphone, QrCode, Unlock, CheckCircle, Clock, Shield, AlertCircle } from "lucide-react"
import styles from "./pickup-page.module.css"
import { Outlet, useSearchParams } from 'react-router-dom';

const PickupPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const steps = [
    {
      id: 1,
      icon: <Smartphone size={40} />,
      title: "Abra o Site ou Telegram",
      description: "Abra o site ou bot do telegram.",
      details: ["Verifique se sua conexão a internet é estável", "Não utilize o celular em áreas de risco"],
    },
    {
      id: 2,
      icon: <MapPin size={40} />,
      title: "Vá até o seu campus",
      description: "Esteja no seu campus quando for retirar a bicicleta.",
      details: ["As bicicletas disponíveis iram aparecer", "Caso não tenham bikes disponíveis voce será sinalizado"],
    },
    {
      id: 3,
      icon: <QrCode size={40} />,
      title: "Entre com sua matrícula",
      description: "Faça seu login ou entrada com seu número de matrícula.",
      details: ["É necessário estar com sua matrícula ativa", "Matrículas pendentes serão tratadas como inexistentes"],
    },
    {
      id: 4,
      icon: <Unlock size={40} />,
      title: "Desbloqueie sua bike",
      description: "Após escolher o modelo a bike estará disponível para sua retirada.",
      details: ["Esteja no local quando desbloquear", "Sejá responsável com o uso da bicicleta"],
    },
    {
      id: 5,
      icon: <CheckCircle size={40} />,
      title: "Comece sua viagem!",
      description: "Ajuste a altura do banco e viaje em segurança.",
      details: ["Verifique a condição da bicicleta", "É desejável o uso de capacete"],
    },
  ]

  const tips = [
    {
      icon: <Clock size={24} />,
      title: "Verifique a disponibilidade",
      description:
        "A estação opera 24 horas, mas pode ser de escolha do campus limitar que horas o aluno pode ter acesso.",
    },
    {
      icon: <Shield size={24} />,
      title: "Inspecione antes da corrida",
      description: "Atente-se à condição e integridade da bicicleta para evitar acidentes.",
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Relate problemas",
      description: "Se você notar algum problema ou defeito na bicicleta, reporte imeditamente.",
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
    <div className={styles.pickupPage}>
      <div className={styles.pickupHero}>
        <div className={styles.pickupHeroContent}>
          <h1>Como pegar a sua bike?</h1>
          <p>Siga estes passos simples para pegar sua bicicleta e começar a pedalar em minutos</p>
        </div>
      </div>

      <div className={styles.pickupContainer}>
        <div className={styles.pickupIntro}>
          <div className={styles.pickupIconContainer}>
            <MapPin size={48} />
          </div>
          <h2>Começar nunca foi tão fácil</h2>
          <p>
            Nosso processo otimizado de retirada garante que você possa começar a pedalar com rapidez e segurança. Siga
            o guia passo a passo abaixo para retirar sua bicicleta quando necessário.
          </p>
        </div>

        <div className={styles.stepsSection}>
          <h3>Guia Passo a Passo</h3>
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
          <h3>Dicas Importantes</h3>
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
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no aplicativo e vá aonde quiser agora mesmo.</p>
          <div className={styles.pickupButtons}>
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

export default PickupPage
