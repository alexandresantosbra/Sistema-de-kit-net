import axios, { AxiosError } from 'axios'

/**
 * Base URL da API.
 * Para backend Java (ex: Spring Boot na porta 8080):
 * Crie .env com VITE_API_URL=http://localhost:8080/api
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requisição: adiciona token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de resposta: tratamento de erros e token expirado
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: string; message?: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Erro na requisição'

    return Promise.reject(new Error(message))
  }
)
