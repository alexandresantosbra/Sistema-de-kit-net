import { useState } from 'react'

interface ChatWidgetProps {
  kitnetTitle: string
  ownerName?: string
}

const DEFAULT_ANSWERS: Record<string, string> = {
  fumar: 'O prédio não permite fumar nas áreas comuns. Dentro do apartamento, segue as regras do condomínio.',
  pet: 'Verifique no anúncio se aceita pet. Caso não esteja claro, posso confirmar com o proprietário.',
  silêncio: 'O condomínio segue o horário de silêncio das 22h às 8h. Evite barulhos altos nesse período.',
  fiador: 'Oferecemos opções com seguro-fiança ou análise de crédito rápida, sem fiador tradicional.',
  visitar: 'Use o botão "Agendar Visita" para escolher data e horário diretamente pelo site.',
}

export default function ChatWidget({ kitnetTitle, ownerName = 'Proprietário' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'owner'; text: string }[]>([])

  const sendMessage = () => {
    if (!message.trim()) return

    setMessages(prev => [...prev, { role: 'user', text: message }])

    const lower = message.toLowerCase()
    let reply = 'Obrigado pela mensagem! Em breve responderemos. Enquanto isso, você pode agendar uma visita ou ver os detalhes do anúncio.'

    for (const [key, ans] of Object.entries(DEFAULT_ANSWERS)) {
      if (lower.includes(key)) {
        reply = ans
        break
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'owner', text: reply }])
    }, 800)

    setMessage('')
  }

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isOpen ? 'w-[380px] h-[480px]' : 'w-16 h-16'
        }`}
      >
        {isOpen ? (
          <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-stone-200 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-stone-100">
              <div>
                <h3 className="font-display font-semibold text-stone-900">{ownerName}</h3>
                <p className="text-xs text-stone-500 truncate max-w-[200px]">{kitnetTitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <p className="text-sm text-stone-500 text-center">
                  Tire dúvidas sobre regras, horários ou documentação. Ex: "pode fumar?", "tem horário de silêncio?"
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-stone-100 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Sua mensagem..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none text-sm"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-primary-600 text-white rounded-2xl shadow-lg hover:bg-primary-700 flex items-center justify-center transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
