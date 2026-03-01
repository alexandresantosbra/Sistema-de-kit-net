import { axiosInstance } from './axios'

/**
 * Cliente de API para consumo do backend.
 * Compatível com Node/Express atual e Java (Spring Boot, etc.).
 */

export const api = {
  get<T>(path: string, params?: Record<string, string | number | boolean>) {
    return axiosInstance.get<T>(path, { params }).then((res) => res.data)
  },

  post<T>(path: string, body?: unknown) {
    return axiosInstance.post<T>(path, body).then((res) => res.data)
  },

  put<T>(path: string, body?: unknown) {
    return axiosInstance.put<T>(path, body).then((res) => res.data)
  },

  patch<T>(path: string, body?: unknown) {
    return axiosInstance.patch<T>(path, body).then((res) => res.data)
  },

  delete<T>(path: string) {
    return axiosInstance.delete<T>(path).then((res) => res.data)
  },
}
