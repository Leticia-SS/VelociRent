"use client"

import { useNavigate } from "react-router-dom"
import { Wrench, Building2, Calculator, GraduationCap, Users, Award, Clock } from "lucide-react"
import styles from "./internships-page.module.css"
import { useSearchParams } from 'react-router-dom';

const InternshipsPage = () => {
  const navigate = useNavigate()

  const internshipTypes = [
    {
      id: 1,
      icon: <Wrench size={40} />,
      title: "Mecânico das Bikes",
      field: "Engenharia Mecânica",
      description:
        "Adquira experiência prática na manutenção e reparo da nossa frota de bicicletas. Aprenda sobre tecnologia de transporte sustentável e desenvolva habilidades de engenharia práticas.",
      responsibilities: [
        "Assistência no reparo e manutenção de bikes",
        "Ajude a implementar novas melhorias",
        "Participação no controle de qualidade",
        "Aprender sobre sustentabilidade na tecnologia",
      ],
      requirements: [
        "Cursando Engenharia Mecânica no momento",
        "Entendimento básico de mecânica",
        "Habilidade de resolução de problemas",
      ],
    },
    {
      id: 2,
      icon: <Building2 size={40} />,
      title: "Gestão de Operações",
      field: "Administração",
      description:
        "Trabalhe com nossa equipe de operações para otimizar a distribuição de bicicletas, gerenciar a logística das estações e aprimorar a eficiência geral do serviço.",
      responsibilities: [
        "Analizar relatórios",
        "Assistencia com a distribuição de bikes",
        "Ajuda na otização de processos",
        "Contribuir para iniciativas de melhora de serviço",
      ],
      requirements: ["Cursando Administração", "Forte habilidade analítica", "Interesse em mobilidade urbana"],
    },
    {
      id: 3,
      icon: <Calculator size={40} />,
      title: "Análise Financeira",
      field: "Economia ou Contablididade",
      description:
        "Junte-se à nossa equipe financeira para adquirir experiência em planejamento financeiro, análise de custos e estratégia de negócios em uma empresa de mobilidade em crescimento.",
      responsibilities: [
        "Assistência com relatórios financeiros",
        "Ajuda em desenvolvimento de estratégias",
        "Participar do planejamento de budget",
        "Analize de custos e eficiência operacional",
      ],
      requirements: ["Cursando Economia ou Contabilidade", "Alta habilidade númerica", "Atencioso com detalhes"],
    },
  ]

  const benefits = [
    {
      icon: <GraduationCap size={32} />,
      title: "Bolsa acadêmica",
      description: "Nossos estágios se qualificam para bolsa acadêmica nas universidades parceiras",
    },
    {
      icon: <Users size={32} />,
      title: "Mentoria",
      description: "Trabalhe diretamente com profissionais qualificados que vão guiar seu desenvolvimento.",
    },
    {
      icon: <Award size={32} />,
      title: "Impacto Real",
      description: "Seu trabalho impacta diretamente no coditidiano dos nossos clientes.",
    },
    {
      icon: <Clock size={32} />,
      title: "Horas flexíveis",
      description: "Nós oferecemos horário flexível para encaixar na sua rotina.",
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

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');  const handleTelegramRental = () => {
    window.open("https://t.me/VelociRent_Bot", "_blank", "noopener,noreferrer")
  }

  return (
    <div id="test" className={styles.internshipsPage}>
      <div className={styles.internshipsHero}>
        <div className={styles.internshipsHeroContent}>
          <h1>Estágios para estudantes</h1>
          <p>Alavanque sua carreira na melhor empresa de aluguel de bicicletas da América Latina!</p>
        </div>
      </div>

      <div className={styles.internshipsContainer}>
        <div className={styles.internshipsIntro}>
          <div className={styles.internshipsIconContainer}>
            <GraduationCap size={48} />
          </div>
          <h2>Construa seu futuro com a VelociRent</h2>
          <p>
            Oferecemos oportunidades de estágio significativas para estudantes universitários das áreas de engenharia
            mecânica, administração, economia e contabilidade. Adquira experiência prática enquanto contribui para
            soluções de mobilidade urbana sustentável que fazem a diferença em sua comunidade.
          </p>
        </div>

        <div className={styles.programsSection}>
          <h3>Programas de Estágio</h3>
          <div className={styles.programsList}>
            {internshipTypes.map((internship) => (
              <div key={internship.id} className={styles.programCard}>
                <div className={styles.programHeader}>
                  <div className={styles.programIcon}>{internship.icon}</div>
                  <h4>{internship.title}</h4>
                  <p className={styles.programField}>{internship.field}</p>
                </div>
                <div className={styles.programContent}>
                  <p className={styles.programDescription}>{internship.description}</p>
                  <div className={styles.programDetails}>
                    <div className={styles.programResponsibilities}>
                      <h5>Responsabilidades</h5>
                      <ul>
                        {internship.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.programRequirements}>
                      <h5>Requisitado</h5>
                      <ul>
                        {internship.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.benefitsSection}>
          <h3>Por que estagiar conosco?</h3>
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

        <div className={styles.internshipsCTA}>
          <h3>Pronto para sua viagem?</h3>
          <p>Entre no site ou Telegram e vá aonde quiser agora mesmo.</p>
          <div className={styles.internshipsButtons}>
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

export default InternshipsPage
