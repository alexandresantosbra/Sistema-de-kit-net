import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../lib/api'
import CostCalculator from '../components/CostCalculator'
import VisitScheduler from '../components/VisitScheduler'
import ChatWidget from '../components/ChatWidget'
import PropertyMap from '../components/PropertyMap'
import FloorPlan from '../components/FloorPlan'
import type { Kitnet } from '../types'

export default function PropertyPage() {
  const { id } = useParams()
  const [kitnet, setKitnet] = useState<Kitnet | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    api
      .get<Kitnet>(`/kitnets/${id}`)
      .then(setKitnet)
      .catch(() => setKitnet(null))
      .finally(() => setLoading(false))
  }, [id])

  const [mainImage, setMainImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'photos' | 'video' | 'floorplan'>('photos')

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500">Carregando...</p>
      </div>
    )
  }

  if (!kitnet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-stone-900">Kitnet não encontrada</h1>
        <Link to="/kitnets" className="text-primary-600 hover:underline mt-4 inline-block">
          Voltar à busca
        </Link>
      </div>
    )
  }

  const utilitiesLabel: string[] = []
  if (kitnet.utilitiesIncluded.water) utilitiesLabel.push('água')
  if (kitnet.utilitiesIncluded.electricity) utilitiesLabel.push('luz')
  if (kitnet.utilitiesIncluded.gas) utilitiesLabel.push('gás')
  if (kitnet.utilitiesIncluded.internet) utilitiesLabel.push('internet')
  const utilitiesText = utilitiesLabel.length
    ? `Inclui: ${utilitiesLabel.join(', ')}`
    : 'Contas não inclusas'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/kitnets" className="text-stone-500 hover:text-primary-600 text-sm">
          ← Voltar à busca
        </Link>
      </div>

      {/* Título e preço */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
            {kitnet.title}
          </h1>
          <p className="text-stone-600 mt-1">
            {kitnet.address}, {kitnet.neighborhood} - {kitnet.city}/{kitnet.state}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {utilitiesLabel.length >= 3 && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-lg">
                Contas inclusas
              </span>
            )}
            {kitnet.furnished && (
              <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-lg">
                Mobiliado
              </span>
            )}
            {kitnet.petFriendly && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-lg">
                Aceita pet
              </span>
            )}
          </div>
        </div>
        <div className="lg:text-right">
          <span className="text-3xl font-bold text-stone-900">
            R$ {kitnet.price.toLocaleString('pt-BR')}
          </span>
          <span className="text-stone-500">/mês</span>
          <p className="text-sm text-stone-500 mt-1">{utilitiesText}</p>
        </div>
      </div>

      {/* Galeria e Tour Visual */}
      <section className="mb-12">
        <div className="flex gap-2 mb-4">
          {(['photos', 'video', 'floorplan'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === t
                  ? 'bg-primary-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t === 'photos' && '📷 Fotos'}
              {t === 'video' && '🎬 Tour em vídeo'}
              {t === 'floorplan' && '📐 Planta baixa'}
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80">
          {activeTab === 'photos' && (
            <>
              <div className="aspect-video bg-stone-200">
                <img
                  src={kitnet.images[mainImage]}
                  alt={kitnet.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 p-4 overflow-x-auto bg-white">
                {kitnet.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      mainImage === i ? 'border-primary-600' : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-500 px-4 pb-4">
                Fotos de ângulos abertos para você visualizar o espaço
              </p>
            </>
          )}
          {activeTab === 'video' && (
            <div className="aspect-video">
              {kitnet.videoTour ? (
                <iframe
                  src={kitnet.videoTour}
                  title="Tour em vídeo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500">
                  Tour em vídeo em breve
                </div>
              )}
            </div>
          )}
          {activeTab === 'floorplan' && (
            <div className="p-6 bg-white">
              <FloorPlan />
            </div>
          )}
        </div>
      </section>

      {/* Botão Agendar em destaque */}
      <div className="mb-12 p-6 bg-primary-50 border border-primary-100 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold text-stone-900">
              Gostou? Agende sua visita
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Escolha data e horário pelo celular, sem precisar ligar
            </p>
          </div>
          <a
            href="#agendar"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
          >
            📅 Agendar Visita
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Descrição */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
            <h2 className="font-display font-semibold text-stone-900 mb-4">Descrição</h2>
            <p className="text-stone-600 leading-relaxed">{kitnet.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">{kitnet.area}m²</p>
                <p className="text-xs text-stone-500">Área</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">{kitnet.bedrooms}</p>
                <p className="text-xs text-stone-500">Quarto(s)</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold text-stone-900">{kitnet.bathrooms}</p>
                <p className="text-xs text-stone-500">Banheiro(s)</p>
              </div>
            </div>
          </div>

          {/* Contas inclusas - transparência */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
            <h2 className="font-display font-semibold text-stone-900 mb-4">
              💡 O que está incluso no preço?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'water', label: 'Água', included: kitnet.utilitiesIncluded.water },
                { key: 'electricity', label: 'Luz', included: kitnet.utilitiesIncluded.electricity },
                { key: 'gas', label: 'Gás', included: kitnet.utilitiesIncluded.gas },
                { key: 'internet', label: 'Internet', included: kitnet.utilitiesIncluded.internet },
              ].map(u => (
                <div key={u.key} className="flex items-center gap-2 p-3 rounded-xl bg-stone-50">
                  {u.included ? (
                    <span className="text-emerald-600">✓</span>
                  ) : (
                    <span className="text-stone-400">—</span>
                  )}
                  <span className={u.included ? 'text-stone-800' : 'text-stone-500'}>
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Próximo de */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
            <h2 className="font-display font-semibold text-stone-900 mb-4">
              Próximo de você
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Universidades</p>
                <ul className="space-y-1">
                  {kitnet.nearby.universities.map((u, i) => (
                    <li key={i} className="text-stone-600 text-sm">
                      {u.name} — {u.distance}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Metrô</p>
                <ul className="space-y-1">
                  {kitnet.nearby.subway.map((s, i) => (
                    <li key={i} className="text-stone-600 text-sm">
                      {s.line} — {s.distance}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-700 mb-2">Comércio</p>
                <ul className="space-y-1">
                  {kitnet.nearby.commerce.map((c, i) => (
                    <li key={i} className="text-stone-600 text-sm">
                      {c.name} ({c.type}) — {c.distance}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <PropertyMap kitnet={kitnet} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div id="agendar">
            <VisitScheduler kitnetId={kitnet.id} />
          </div>
          <CostCalculator kitnet={kitnet} />
          <div className="p-4 bg-stone-50 rounded-2xl text-center">
            <p className="text-sm text-stone-600 mb-2">
              Análise de crédito rápida, sem fiador tradicional
            </p>
            <button className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium rounded-xl text-sm transition-colors">
              Assinatura digital do contrato
            </button>
          </div>
        </div>
      </div>

      <ChatWidget kitnetTitle={kitnet.title} ownerName="Proprietário" />
    </div>
  )
}
