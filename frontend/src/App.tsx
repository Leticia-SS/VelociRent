import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import HomePage from "./pages/home-page"
import BikesPage from "./pages/bikes-page"
import PickupPage from "./pages/pickup-page"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="main">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bikes" element={<BikesPage />} />
            <Route path="/pickup" element={<PickupPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
