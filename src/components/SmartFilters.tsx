import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const UTILITIES_OPTIONS = [
  { id: 'water', label: 'Água', icon: '💧' },
  { id: 'electricity', label: 'Luz', icon: '⚡' },
  { id: 'gas', label: 'Gás', icon: '🔥' },
  { id: 'internet', label: 'Internet', icon: '📶' },
]

export default function SmartFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(false)

  const [filters, setFilters] = useState({
    maxPrice: searchParams.get('maxPrice') || '',
    utilities: searchParams.get('utilities')?.split(',').filter(Boolean) || [] as string[],
    furnished: searchParams.get('furnished') === 'true',
    petFriendly: searchParams.get('petFriendly') === 'true',
    maxDistUni: searchParams.get('maxDistUni') || '',
    maxDistMetro: searchParams.get('maxDistMetro') || '',
  })

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.utilities.length) params.set('utilities', filters.utilities.join(','))
    if (filters.furnished) params.set('furnished', 'true')
    if (filters.petFriendly) params.set('petFriendly', 'true')
    if (filters.maxDistUni) params.set('maxDistUni', filters.maxDistUni)
    if (filters.maxDistMetro) params.set('maxDistMetro', filters.maxDistMetro)
    setSearchParams(params)
    setIsExpanded(false)
  }

  const toggleUtility = (id: string) => {
    setFilters(prev => ({
      ...prev,
      utilities: prev.utilities.includes(id)
        ? prev.utilities.filter(u => u !== id)
        : [...prev.utilities, id],
    }))
  }

  const clearFilters = () => {
    setFilters({
      maxPrice: '',
      utilities: [],
      furnished: false,
      petFriendly: false,
      maxDistUni: '',
      maxDistMetro: '',
    })
    setSearchParams({})
    setIsExpanded(false)
  }

  const hasActiveFilters = filters.maxPrice || filters.utilities.length || filters.furnished || filters.petFriendly || filters.maxDistUni || filters.maxDistMetro

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-stone-900">Filtros Inteligentes</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 text-sm font-medium hover:underline lg:hidden"
        >
          {isExpanded ? 'Fechar' : 'Expandir'}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Preço máximo */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Preço máximo (R$/mês)
          </label>
          <input
            type="number"
            placeholder="Ex: 1500"
            value={filters.maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition"
          />
        </div>

        {/* Contas inclusas - maior diferencial */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            💡 Contas inclusas no aluguel?
          </label>
          <div className="flex flex-wrap gap-2">
            {UTILITIES_OPTIONS.map(u => (
              <button
                key={u.id}
                onClick={() => toggleUtility(u.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filters.utilities.includes(u.id)
                    ? 'bg-primary-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {u.icon} {u.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-1">Selecione o que deseja incluso</p>
        </div>

        {/* Mobiliado / Vazio */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Mobiliado ou vazio?
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFilters(prev => ({ ...prev, furnished: !prev.furnished }))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filters.furnished ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              Mobiliado
            </button>
          </div>
        </div>

        {/* Aceita Pet */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="petFriendly"
            checked={filters.petFriendly}
            onChange={e => setFilters(prev => ({ ...prev, petFriendly: e.target.checked }))}
            className="w-4 h-4 rounded border-stone-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="petFriendly" className="text-sm font-medium text-stone-700 cursor-pointer">
            🐾 Aceita Pet
          </label>
        </div>

        {/* Proximidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Máx. distância de universidade (km)
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="Ex: 2"
              value={filters.maxDistUni}
              onChange={e => setFilters(prev => ({ ...prev, maxDistUni: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Máx. distância do metrô (m)
            </label>
            <input
              type="number"
              placeholder="Ex: 1000"
              value={filters.maxDistMetro}
              onChange={e => setFilters(prev => ({ ...prev, maxDistMetro: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={applyFilters}
            className="flex-1 py-3 px-6 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Aplicar Filtros
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="py-3 px-6 border border-stone-300 text-stone-600 font-medium rounded-xl hover:bg-stone-50 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
