"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { Mail, Lock, Eye, EyeOff, Bike } from "lucide-react"
import styles from "./login-page.module.css"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvoyvinchnjokkmpduqn.supabase.co'; // URL da API REST
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2b3l2aW5jaG5qb2trbXBkdXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzc2MDUsImV4cCI6MjA2MjkxMzYwNX0.lfAXwC-v737vM0OLSFyh2ZeJ3EHUoLXTc11MlEkzojI'; // Chave pública (anon ou service role)

const supabase = createClient(supabaseUrl, supabaseKey);


const LoginPage = () => {
 const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const from = location.state?.from?.pathname || "/rental?email=" + formData.email + "#test"

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const { data: userData, error: userError } = await supabase
        .from('veloci_users')
        .select('matricula')
        .eq('email', formData.email)
        .single()

      if (userError || !userData) {
        setError("Email não encontrado")
        return
      }

      if (formData.password !== userData.matricula.toString()) {
        setError("Matrícula/senha incorreta")
        return
      }

      const success = await login(formData.email, formData.password)

      if (success) {
        alert("Login bem-sucedido!")
        navigate(from, { replace: true })
      } else {
        setError("Falha no login")
      }
    } catch (err) {
      setError("Ocorreu um erro durante o login")
      console.error(err)
    }
  }
  return (
    <div id="test" className={styles.loginPage}>
      <div className={styles.loginHero}>
        <div className={styles.loginHeroContent}>
          <h1>Bem-vindo!</h1>
          <p>Faça login e entre nessa VelociViagem!</p>
        </div>
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.loginIcon}>
              <Bike size={48} />
            </div>
            <h2>Login</h2>
            <p>Digite seus dados para entrar na sua conta</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Digite seu email"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Matrícula
              </label>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Digite sua matrícula"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  aria-label="Ativiar/Desativar visibilidade da senha"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginButton} disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

       
        </div>
      </div>
    </div>
  )
}

export default LoginPage
