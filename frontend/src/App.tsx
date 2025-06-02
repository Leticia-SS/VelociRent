import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import HomePage from "./pages/home-page"
import BikesPage from "./pages/bikes-page"
import PickupPage from "./pages/pickup-page"
import UsagePage from "./pages/usage-page"
import InternshipsPage from "./pages/internships-page"
import AboutPage from "./pages/about-page"
import LoginPage from "./pages/login-page"
import RentalPage from "./pages/rental-page"
import ProtectedRoute from "./components/protected-route"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bikes" element={<BikesPage />} />
              <Route path="/pickup" element={<PickupPage />} />
              <Route path="/usage" element={<UsagePage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/rental"
                element={
                  <ProtectedRoute>
                    <RentalPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
