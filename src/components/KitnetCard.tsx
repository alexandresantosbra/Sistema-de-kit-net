import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../contexts/FavoritesContext'
import type { Kitnet } from '../types'

interface KitnetCardProps {
  kitnet: Kitnet
}

export default function KitnetCard({ kitnet }: KitnetCardProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toggleFavorite, isFavorite, isLoading } = useFavorites()
  const favorited = isFavorite(kitnet.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      navigate('/entrar')
      return
    }
    toggleFavorite(kitnet.id)
  }
  const totalPrice = kitnet.price + (kitnet.condominium || 0) + (kitnet.iptu || 0) +
    (kitnet.utilitiesIncluded.water && kitnet.utilitiesIncluded.electricity && kitnet.utilitiesIncluded.internet ? 0 : (kitnet.avgUtilities || 0))

  const utilitiesLabel = []
  if (kitnet.utilitiesIncluded.water) utilitiesLabel.push('água')
  if (kitnet.utilitiesIncluded.electricity) utilitiesLabel.push('luz')
  if (kitnet.utilitiesIncluded.gas) utilitiesLabel.push('gás')
  if (kitnet.utilitiesIncluded.internet) utilitiesLabel.push('internet')
  const allInclusive = utilitiesLabel.length >= 3

  return (
    <Link
      to={`/kitnet/${kitnet.id}`}
      className="block bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={kitnet.images[0]}
          alt={kitnet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center hover:bg-white disabled:opacity-50 transition-all z-10"
          title={user ? (favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos') : 'Faça login para salvar'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-stone-400 hover:text-red-400'}`}
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {allInclusive && (
            <span className="px-2.5 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-lg">
              Contas inclusas
            </span>
          )}
          {kitnet.furnished && (
            <span className="px-2.5 py-1 bg-white/95 text-stone-700 text-xs font-medium rounded-lg shadow-sm">
              Mobiliado
            </span>
          )}
          {kitnet.petFriendly && (
            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-lg">
              🐾 Pet
            </span>
          )}
        </div>
      </div>
      <div className="relative p-5">
        <div className="absolute -top-4 left-5 right-5 flex justify-between">
          <span className="text-2xl font-bold text-stone-900">
            R$ {kitnet.price.toLocaleString('pt-BR')}
            <span className="text-sm font-normal text-stone-500">/mês</span>
          </span>
        </div>
        <div className="pt-4">
          <h3 className="font-display font-semibold text-stone-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {kitnet.title}
          </h3>
          <p className="text-stone-500 text-sm mt-1">
            {kitnet.neighborhood}, {kitnet.city}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="text-stone-600">{kitnet.area} m²</span>
            <span className="text-stone-400">•</span>
            {kitnet.utilitiesIncluded.internet && <span>Wi-Fi</span>}
            {kitnet.nearby.subway[0] && (
              <span className="text-stone-600">Metrô {kitnet.nearby.subway[0].distance}</span>
            )}
          </div>
          <p className="text-xs text-stone-400 mt-2">
            Total estimado: R$ {totalPrice.toLocaleString('pt-BR')}/mês
          </p>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 font-medium rounded-xl text-sm">
              Agendar visita →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
