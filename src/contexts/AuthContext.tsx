"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { api } from "../services/api"

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    const { access_token, user } = response.data

    localStorage.setItem("token", access_token)
    localStorage.setItem("user", JSON.stringify(user))

    setToken(access_token)
    setUser(user)
    setIsAuthenticated(true)

    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
  }

  const register = async (username: string, email: string, password: string) => {
    await api.post("/auth/register", { username, email, password })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
    setIsAuthenticated(false)

    delete api.defaults.headers.common["Authorization"]
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

