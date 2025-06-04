"use client"

import { useState } from "react"
import { MapPin, Clock, CreditCard, Bike, Shield, CheckCircle, User } from "lucide-react"
import { useAuth } from "../context/auth-context"
import styles from "./rental-page.module.css"

const RentalPage = () => {
  const { user } = useAuth()
  const [selectedStation, setSelectedStation] = useState("")
  const [selectedBike, setSelectedBike] = useState("")
  const [rentalDuration, setRentalDuration] = useState("2")

  const stations = [
    { id: "1", name: "Instituto INFNET", address: "São José 90", availableBikes: 8 },
    { id: "2", name: "UFRJ Praia Vermelha", address: "Avenida Pasteur 250", availableBikes: 12 },
    { id: "3", name: "UERJ Maracanã", address: "São Francisco Xavier 524", availableBikes: 5 },
    { id: "4", name: "IBMEC Centro", address: "Avenida Presidente Wilson 118", availableBikes: 15 },
  ]

  const bikeTypes = [
    { id: "city", name: "Caloi Speed Pro", price: 2, description: "Perfect for city rides" },
    { id: "urban", name: "Caloi Explorer", price: 3, description: "Great for longer trips" },
    { id: "mountain", name: "Oggi Mountain", price: 4, description: "For adventurous rides" },
  ]

  const calculatePrice = () => {
    const selectedBikeType = bikeTypes.find((bike) => bike.id === selectedBike)
    if (!selectedBikeType) return 0
    return selectedBikeType.price * Number.parseInt(rentalDuration)
  }

  const handleRentBike = () => {
    // Handle bike rental logic
    alert("Bike rental confirmed!")
  }

  return (
    <div className={styles.rentalPage}>
      <div className={styles.rentalHero}>
        <div className={styles.rentalHeroContent}>
          <h1>Rent a Bike</h1>
          <p>Choose your bike and start your sustainable journey, {user?.firstName}!</p>
        </div>
      </div>

      <div className={styles.rentalContainer}>
        <div className={styles.rentalContent}>
          <div className={styles.rentalForm}>
            <div className={styles.formSection}>
              <h3>
                <MapPin size={24} />
                Select Pickup Station
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
                      <span>{station.availableBikes} bikes available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>
                <Bike size={24} />
                Choose Bike Type
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
                      <div className={styles.bikePrice}>${bike.price}/hour</div>
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

            <div className={styles.formSection}>
              <h3>
                <Clock size={24} />
                Rental Duration
              </h3>
              <div className={styles.durationSelector}>
                <select
                  value={rentalDuration}
                  onChange={(e) => setRentalDuration(e.target.value)}
                  className={styles.durationSelect}
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours (Day pass)</option>
                  <option value="24">24 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.rentalSummary}>
            <div className={styles.summaryCard}>
              <h3>Rental Summary</h3>

              <div className={styles.summaryItem}>
                <span>Station:</span>
                <span>{selectedStation ? stations.find((s) => s.id === selectedStation)?.name : "Not selected"}</span>
              </div>

              <div className={styles.summaryItem}>
                <span>Bike Type:</span>
                <span>{selectedBike ? bikeTypes.find((b) => b.id === selectedBike)?.name : "Not selected"}</span>
              </div>

              <div className={styles.summaryItem}>
                <span>Duration:</span>
                <span>
                  {rentalDuration} hour{Number.parseInt(rentalDuration) > 1 ? "s" : ""}
                </span>
              </div>

              <div className={styles.summaryDivider}></div>

              <div className={styles.summaryTotal}>
                <span>Total Price:</span>
                <span>${calculatePrice()}</span>
              </div>

              <div className={styles.paymentSection}>
                <h4>
                  <CreditCard size={20} />
                  Payment Method
                </h4>
                <div className={styles.paymentCard}>
                  <span>•••• •••• •••• 1234</span>
                  <span>Visa</span>
                </div>
              </div>

              <button
                className={styles.rentButton}
                onClick={handleRentBike}
                disabled={!selectedStation || !selectedBike}
              >
                <CheckCircle size={20} />
                Confirm Rental
              </button>
            </div>

            <div className={styles.instructionsCard}>
              <h4>Next Steps</h4>
              <ol className={styles.instructionsList}>
                <li>Go to the selected pickup station</li>
                <li>Scan the QR code on your chosen bike</li>
                <li>Unlock and start your ride</li>
                <li>Return to any station when finished</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalPage
