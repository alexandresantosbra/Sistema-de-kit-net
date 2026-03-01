import { useState } from 'react'

interface VisitSchedulerProps {
  kitnetId: string
  onClose?: () => void
}

const HOURS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return d
})

export default function VisitScheduler({ kitnetId }: VisitSchedulerProps) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDay || !selectedHour) return
    setSubmitted(true)
  }

  const formatDay = (d: Date) =>
    d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200/80 p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-stone-900">Visita agendada!</h3>
        <p className="text-stone-600 mt-2">
          {selectedDay && selectedHour && (
            <>Confirmamos sua visita para {formatDay(selectedDay)} às {selectedHour}.</>
          )}
        </p>
        <p className="text-sm text-stone-500 mt-4">
          Você receberá um e-mail de confirmação em breve.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
      <h3 className="font-display font-semibold text-stone-900 mb-2">
        📅 Agendar Visita
      </h3>
      <p className="text-sm text-stone-600 mb-6">
        Escolha o dia e horário. Sem precisar ligar.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">Data</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map(d => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setSelectedDay(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedDay?.toDateString() === d.toDateString()
                    ? 'bg-primary-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {formatDay(d)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">Horário</label>
          <div className="flex flex-wrap gap-2">
            {HOURS.map(h => (
              <button
                key={h}
                type="button"
                onClick={() => setSelectedHour(h)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedHour === h ? 'bg-primary-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedDay || !selectedHour}
          className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Confirmar Visita
        </button>
      </form>
    </div>
  )
}
