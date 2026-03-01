import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { api } from '../lib/api'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

interface FavoritesContextType {
  favoriteIds: string[]
  isLoading: boolean
  toggleFavorite: (kitnetId: string) => Promise<void>
  isFavorite: (kitnetId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { showError, showSuccess, showInfo } = useToast()

  useEffect(() => {
    if (!user) {
      setFavoriteIds([])
      return
    }
    setIsLoading(true)
    api
      .get<{ kitnetIds: string[] }>('/favorites')
      .then(({ kitnetIds }) => setFavoriteIds(kitnetIds))
      .catch(() => {
        setFavoriteIds([])
        showError('Não foi possível carregar seus favoritos.')
      })
      .finally(() => setIsLoading(false))
  }, [user?.id])

  const toggleFavorite = useCallback(async (kitnetId: string) => {
    if (!user) return
    setIsLoading(true)
    try {
      const isFav = favoriteIds.includes(kitnetId)
      if (isFav) {
        const { kitnetIds } = await api.delete<{ kitnetIds: string[] }>(`/favorites/${kitnetId}`)
        setFavoriteIds(kitnetIds)
        showInfo('Removido dos favoritos.')
      } else {
        const { kitnetIds } = await api.post<{ kitnetIds: string[] }>('/favorites', { kitnetId })
        setFavoriteIds(kitnetIds)
        showSuccess('Salvo em favoritos.')
      }
    } catch {
      showError('Não foi possível atualizar seus favoritos.')
    } finally {
      setIsLoading(false)
    }
  }, [user, favoriteIds, showError, showSuccess, showInfo])

  const isFavorite = useCallback(
    (kitnetId: string) => favoriteIds.includes(kitnetId),
    [favoriteIds]
  )

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isLoading, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  return ctx
}
