import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import KitnetCard from '../components/KitnetCard'
import type { Kitnet } from '../types'

export default function FavoritosPage() {
  const [kitnets, setKitnets] = useState<Kitnet[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<{ kitnets: Kitnet[] }>('/kitnets'),
      api.get<{ kitnetIds: string[] }>('/favorites'),
    ])
      .then(([data1, data2]) => {
        setKitnets(data1.kitnets)
        setFavoriteIds(data2.kitnetIds)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const favorites = kitnets.filter(k => favoriteIds.includes(k.id))

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-2xl font-semibold text-stone-900 mb-8">
          Minhas Favoritas
        </h1>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-stone-100 border border-stone-200/70 animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-2xl font-semibold text-stone-900 mb-8">
        Minhas Favoritas
      </h1>
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/80">
          <p className="text-stone-600 mb-4">Você ainda não salvou nenhuma kitnet.</p>
          <Link
            to="/kitnets"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:underline"
          >
            Buscar kitnets →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-stone-600 mb-6">
            {favorites.length} {favorites.length === 1 ? 'favorita' : 'favoritas'}
          </p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {favorites.map(kitnet => (
              <KitnetCard key={kitnet.id} kitnet={kitnet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
