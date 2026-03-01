import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SmartFilters from '../components/SmartFilters'
import KitnetCard from '../components/KitnetCard'
import { api } from '../lib/api'
import type { Kitnet } from '../types'

const SORT_OPTIONS = [
  { value: '', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'area-desc', label: 'Maior área' },
  { value: 'area-asc', label: 'Menor área' },
] as const

function filterKitnets(kitnets: Kitnet[], searchParams: URLSearchParams): Kitnet[] {
  let result = [...kitnets]

  const maxPrice = searchParams.get('maxPrice')
  if (maxPrice) {
    const val = Number(maxPrice)
    result = result.filter(k => k.price <= val)
  }

  const utilities = searchParams.get('utilities')?.split(',').filter(Boolean) || []
  if (utilities.length) {
    result = result.filter(k => {
      if (utilities.includes('water') && !k.utilitiesIncluded.water) return false
      if (utilities.includes('electricity') && !k.utilitiesIncluded.electricity) return false
      if (utilities.includes('gas') && !k.utilitiesIncluded.gas) return false
      if (utilities.includes('internet') && !k.utilitiesIncluded.internet) return false
      return true
    })
  }

  if (searchParams.get('furnished') === 'true') {
    result = result.filter(k => k.furnished)
  }

  if (searchParams.get('petFriendly') === 'true') {
    result = result.filter(k => k.petFriendly)
  }

  return result
}

function sortKitnets(kitnets: Kitnet[], sort: string): Kitnet[] {
  const copy = [...kitnets]
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'area-desc':
      return copy.sort((a, b) => b.area - a.area)
    case 'area-asc':
      return copy.sort((a, b) => a.area - b.area)
    default:
      return copy
  }
}

export default function ListingPage() {
  const [searchParams] = useSearchParams()
  const [kitnets, setKitnets] = useState<Kitnet[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('')

  useEffect(() => {
    api
      .get<{ kitnets: Kitnet[] }>('/kitnets')
      .then(({ kitnets: data }) => setKitnets(data))
      .catch(() => setKitnets([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filterKitnets(kitnets, searchParams)
  const sorted = sortKitnets(filtered, sort)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-2xl font-semibold text-stone-900 mb-8">
        Buscar Kitnets
      </h1>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SmartFilters />
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-stone-600">
              {filtered.length} {filtered.length === 1 ? 'kitnet encontrada' : 'kitnets encontradas'}
            </p>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none text-sm"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value || 'default'} value={opt.value}>
                  Ordenar: {opt.label}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <p className="text-stone-500">Carregando...</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map(kitnet => (
                  <KitnetCard key={kitnet.id} kitnet={kitnet} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-stone-500">
                  Nenhuma kitnet encontrada com esses filtros. Tente ajustar.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
