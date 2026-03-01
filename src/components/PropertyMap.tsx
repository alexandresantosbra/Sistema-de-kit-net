import { useEffect, useRef } from 'react'
import type { Kitnet } from '../types'

interface PropertyMapProps {
  kitnet: Kitnet
}

export default function PropertyMap({ kitnet }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    let map: import('leaflet').Map | null = null

    const loadMap = async () => {
      const L = await import('leaflet')

      map = L.map(mapRef.current!).setView(
        [kitnet.latitude, kitnet.longitude],
        16
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      L.marker([kitnet.latitude, kitnet.longitude])
        .addTo(map)
        .bindPopup(`<strong>${kitnet.title}</strong><br/>${kitnet.address}`)
    }

    loadMap()
    return () => { map?.remove() }
  }, [kitnet])

  const googleMapsUrl = `https://www.google.com/maps?q=${kitnet.latitude},${kitnet.longitude}`

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden">
      <h3 className="font-display font-semibold text-stone-900 p-4 border-b border-stone-100">
        📍 Localização e Vizinhança
      </h3>
      <div ref={mapRef} className="h-[300px] w-full" />
      <div className="p-4 flex flex-wrap gap-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-sm font-medium transition-colors"
        >
          Abrir no Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/@${kitnet.latitude},${kitnet.longitude},3a,75y,90h/data=!3m6!1e1!3m4!1s${kitnet.latitude}!2e0!7i16384!8i8192`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-sm font-medium transition-colors"
        >
          Street View
        </a>
      </div>
      <div className="px-4 pb-4">
        <p className="text-sm text-stone-600">
          Veja padarias, lavanderias e farmácias próximas no mapa.
        </p>
      </div>
    </div>
  )
}
