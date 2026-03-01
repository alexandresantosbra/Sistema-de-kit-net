import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-stone-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
            Encontre a kitnet ideal
            <br />
            <span className="text-primary-600">sem complicação</span>
          </h1>
          <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto">
            Filtros inteligentes, transparência total e agendamento online.
            Saiba exatamente o que está incluso antes de visitar.
          </p>
          <Link
            to="/kitnets"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
          >
            Buscar Kitnets
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-2xl font-semibold text-stone-900 text-center mb-16">
          Por que o KitNetFácil?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: '🔍',
              title: 'Filtros Inteligentes',
              desc: 'Contas inclusas, mobiliado, pet-friendly e proximidade de universidades e metrô.',
            },
            {
              icon: '📹',
              title: 'Tour Virtual',
              desc: 'Vídeos e plantas baixas para você sentir o espaço antes de visitar.',
            },
            {
              icon: '📅',
              title: 'Agende Online',
              desc: 'Escolha data e hora da visita sem precisar ligar para ninguém.',
            },
            {
              icon: '🧮',
              title: 'Custo Real',
              desc: 'Calculadora que mostra aluguel + condomínio + contas no total mensal.',
            },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-display font-semibold text-stone-900 mt-4">{f.title}</h3>
              <p className="text-stone-600 text-sm mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
