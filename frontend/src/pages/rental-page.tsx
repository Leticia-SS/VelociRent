"use client"

import { useState } from "react"
import { MapPin, CreditCard, Bike, Shield, CheckCircle, User } from "lucide-react"
import styles from "./rental-page.module.css"
import { useSearchParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvoyvinchnjokkmpduqn.supabase.co'; // URL da API REST
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2b3l2aW5jaG5qb2trbXBkdXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzc2MDUsImV4cCI6MjA2MjkxMzYwNX0.lfAXwC-v737vM0OLSFyh2ZeJ3EHUoLXTc11MlEkzojI'; // Chave pública (anon ou service role)

const supabase = createClient(supabaseUrl, supabaseKey);

const RentalPage = () => {
  const [selectedStation, setSelectedStation] = useState("")
  const [selectedBike, setSelectedBike] = useState("")

  const stations = [
    { id: "1", name: "Instituto INFNET", address: "São José 90", availableBikes: 8 },
    { id: "2", name: "UFRJ Praia Vermelha", address: "Avenida Pasteur 250", availableBikes: 12 },
    { id: "3", name: "UERJ Maracanã", address: "São Francisco Xavier 524", availableBikes: 5 },
    { id: "4", name: "IBMEC Centro", address: "Avenida Presidente Wilson 118", availableBikes: 15 },
  ]

  const bikeTypes = [
    { id: "city", name: "Caloi Speed Pro", price: 5, description: "Perfeita para a cidade" },
    { id: "urban", name: "Caloi Explorer", price: 5, description: "Para curtas trilhas e alta velocidade" },
    { id: "mountain", name: "Oggi Mountain", price: 5, description: "Bike elétrica de grande porte" },
  ]

  const calculatePrice = () => {
    const selectedBikeType = bikeTypes.find((bike) => bike.id === selectedBike)
    if (!selectedBikeType) return 0
    return selectedBikeType.price
  }


  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

const handleRentBike = async () => {
  if (!email) {
    console.error('Email não encontrado nos parâmetros da URL.');
    return;
  }

  // Busca dados do Supabase
  let { data, error } = await supabase
    .from('veloci_users')
    .select('cpf, email, name')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Erro ao buscar dados do usuário:', error.message);
    return;
  }

  if (!data) {
    console.error('Usuário não encontrado.');
    return;
  }

  const { cpf, name } = data;
  console.log('Enviando ao PHP:', { name, email, cpf });

  // Envia para o PHP
  fetch('https://newandrews.com.br/api-velocirent/checkout.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, cpf })
  })
    .then(res => res.json())
    .then(resposta => {
      console.log('Resposta do PHP:', resposta);

      if (resposta.paymentLink) {
        const linkPagamento = resposta.paymentLink;
        console.log('Link de pagamento:', linkPagamento);

        // Exemplo de uso: redirecionar
        window.location.href = linkPagamento;

        // ou abrir em nova aba:
        // window.open(linkPagamento, '_blank');

        // ou mostrar em alerta:
        // alert(`Link de pagamento: ${linkPagamento}`);
      } else {
        alert('Erro: link de pagamento não encontrado.');
        console.error(resposta);
      }
    })
    .catch(err => {
      console.error('Erro ao chamar o PHP:', err);
      alert('Erro ao criar cliente.');
    });
};


  return (
    <div id="test" className={styles.rentalPage}>
      <div className={styles.rentalHero}>
        <div className={styles.rentalHeroContent}>
          <h1>Alugue sua bike!</h1>
          <p>Escolha sua bike e comece sua jornada!</p>
        </div>
      </div>

      <div className={styles.rentalContainer}>
        <div className={styles.rentalContent}>
          <div className={styles.rentalForm}>
            <div className={styles.formSection}>
              <h3>
                <MapPin size={24} />
                Selecione a estação
              </h3>
              <div className={styles.stationGrid}>
                {stations.map((station) => (
                  <div
                    key={station.id}
                    className={`${styles.stationCard} ${selectedStation === station.id ? styles.selected : ""}`}
                    onClick={() => setSelectedStation(station.id)}
                  >
                    <h4>{station.name}</h4>
                    <p>{station.address}</p>
                    <div className={styles.availability}>
                      <Bike size={16} />
                      <span>{station.availableBikes} bikes disponíveis</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>
                <Bike size={24} />
                Escolha o modelo da bicicleta
              </h3>
              <div className={styles.bikeGrid}>
                {bikeTypes.map((bike) => (
                  <div
                    key={bike.id}
                    className={`${styles.bikeCard} ${selectedBike === bike.id ? styles.selected : ""}`}
                    onClick={() => setSelectedBike(bike.id)}
                  >
                    <div className={styles.bikeHeader}>
                      <h4>{bike.name}</h4>
                      <div className={styles.bikePrice}>${bike.price}/aluguel</div>
                    </div>
                    <p>{bike.description}</p>
                    <div className={styles.bikeFeatures}>
                      <div className={styles.feature}>
                        <Shield size={16} />
                        <span>Bike assegurada</span>
                      </div>
                      <div className={styles.feature}>
                        <User size={16} />
                        <span>Desbloqueio com a matrícula</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rentalSummary}>
            <div className={styles.summaryCard}>
              <h3>Sumário de Aluguel</h3>

              <div className={styles.summaryItem}>
                <span>Estação:</span>
                <span>{selectedStation ? stations.find((s) => s.id === selectedStation)?.name : "Não selecionado"}</span>
              </div>

              <div className={styles.summaryItem}>
                <span>Tipo de bike:</span>
                <span>{selectedBike ? bikeTypes.find((b) => b.id === selectedBike)?.name : "Não selecionado"}</span>
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryTotal}>
                <span>Preço Total:</span>
                <span>${calculatePrice()}</span>
              </div>

              <div className={styles.paymentSection}>
                <h4>
                  <CreditCard size={20} />
                  Método de Pagamento
                </h4>
                <div className={styles.paymentCard}>
                  <span>Boleto / PIX / Crédito / Débito</span>
          
                </div>
              </div>

              <button
                className={styles.rentButton}
                onClick={handleRentBike}
                disabled={!selectedStation || !selectedBike}
              >
                <CheckCircle size={20} />
                Escolher forma de pagamento
              </button>
            </div>

            <div className={styles.instructionsCard}>
              <h4>Próximos passos:</h4>
              <ol className={styles.instructionsList}>
                <li>Vá até o local selecionado</li>
                <li>Procure pela bike desbloqueada</li>
                <li>Comece sua corrida</li>
                <li>Devolva quando acabar a corrida</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalPage
