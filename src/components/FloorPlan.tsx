export default function FloorPlan() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
      <h3 className="font-display font-semibold text-stone-900 mb-2">
        📐 Planta Baixa Humanizada
      </h3>
      <p className="text-sm text-stone-600 mb-4">
        Veja onde cabe cama, guarda-roupa e mesa de trabalho
      </p>
      <div className="bg-stone-50 rounded-xl p-6 overflow-x-auto">
        <svg
          viewBox="0 0 400 280"
          className="w-full max-w-md mx-auto"
          style={{ minWidth: 320 }}
        >
          {/* Parede externa - kitnet retangular */}
          <rect
            x="20"
            y="20"
            width="360"
            height="240"
            fill="none"
            stroke="#d6d3d1"
            strokeWidth="3"
            rx="4"
          />
          {/* porta entrada */}
          <rect x="20" y="100" width="8" height="40" fill="#fafaf9" stroke="#a8a29e" strokeWidth="1" />
          <text x="24" y="125" fontSize="10" fill="#78716c" textAnchor="middle" transform="rotate(-90 24 125)">Entrada</text>

          {/* Área principal - sala/cozinha/dormitório */}
          <rect x="40" y="40" width="200" height="200" fill="#e0f2fe" fillOpacity="0.5" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4" rx="2" />
          <text x="140" y="130" fontSize="12" fill="#0369a1" fontWeight="600" textAnchor="middle">Área principal</text>
          <text x="140" y="145" fontSize="10" fill="#64748b" textAnchor="middle">~20m²</text>

          {/* Cama */}
          <rect x="50" y="50" width="70" height="90" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" rx="4" />
          <text x="85" y="92" fontSize="11" fill="#0369a1" fontWeight="600" textAnchor="middle">Cama</text>
          <text x="85" y="105" fontSize="9" fill="#64748b" textAnchor="middle">Queen</text>

          {/* Guarda-roupa */}
          <rect x="50" y="155" width="70" height="75" fill="#7dd3fc" fillOpacity="0.7" stroke="#0ea5e9" strokeWidth="2" rx="2" />
          <text x="85" y="190" fontSize="10" fill="#0369a1" fontWeight="600" textAnchor="middle">Guarda-</text>
          <text x="85" y="202" fontSize="10" fill="#0369a1" fontWeight="600" textAnchor="middle">roupa</text>

          {/* Mesa trabalho */}
          <rect x="135" y="50" width="90" height="55" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" rx="2" />
          <text x="180" y="80" fontSize="10" fill="#0369a1" fontWeight="600" textAnchor="middle">Mesa</text>
          <text x="180" y="92" fontSize="9" fill="#64748b" textAnchor="middle">trabalho</text>

          {/* Cozinha compacta */}
          <rect x="135" y="115" width="90" height="50" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
          <text x="180" y="142" fontSize="10" fill="#475569" fontWeight="500" textAnchor="middle">Cozinha</text>

          {/* Banheiro */}
          <rect x="240" y="40" width="80" height="100" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="2" />
          <text x="280" y="78" fontSize="10" fill="#475569" fontWeight="600" textAnchor="middle">Banheiro</text>
          <rect x="255" y="90" width="25" height="35" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" rx="1" />
          <text x="267" y="110" fontSize="8" fill="#64748b" textAnchor="middle">Chuveiro</text>

          {/* Legenda */}
          <g transform="translate(260, 160)">
            <rect x="0" y="0" width="120" height="70" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="4" />
            <text x="10" y="18" fontSize="9" fill="#78716c" fontWeight="600">Legenda</text>
            <rect x="10" y="28" width="12" height="10" fill="#bae6fd" stroke="#0ea5e9" />
            <text x="28" y="37" fontSize="8" fill="#64748b">Móveis</text>
            <rect x="10" y="48" width="12" height="10" fill="#e0f2fe" stroke="#0ea5e9" strokeDasharray="2" />
            <text x="28" y="57" fontSize="8" fill="#64748b">Área útil</text>
          </g>
        </svg>
      </div>
    </div>
  )
}
