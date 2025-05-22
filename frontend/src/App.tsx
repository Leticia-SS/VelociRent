import Navbar from "./components/navbar"
import BikeHero from "./components/bike-hero"
import Features from "./components/features"
import HowItWorks from "./components/how-it-works"
import Footer from "./components/footer"
import "./App.css"

function App() {
  return (
    <main className="main">
      <Navbar />
      <BikeHero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
