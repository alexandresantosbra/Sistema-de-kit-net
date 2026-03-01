import { useState } from 'react'
import type { Kitnet } from '../types'

interface CostCalculatorProps {
  kitnet: Kitnet
}

export default function CostCalculator({ kitnet }: CostCalculatorProps) {
  const [customUtilities, setCustomUtilities] = useState(kitnet.avgUtilities || 150)

  const rent = kitnet.price
  const condo = kitnet.condominium || 0
  const iptu = kitnet.iptu || 0

  const utilsIncluded = kitnet.utilitiesIncluded.water && kitnet.utilitiesIncluded.electricity &&
    kitnet.utilitiesIncluded.gas && kitnet.utilitiesIncluded.internet

  const utilities = utilsIncluded ? 0 : customUtilities
  const total = rent + condo + iptu + utilities

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-6">
      <h3 className="font-display font-semibold text-stone-900 mb-4">
        🧮 Calculadora de Custo Total
      </h3>
      <p className="text-sm text-stone-600 mb-4">
        Saiba exatamente quanto vai gastar por mês
      </p>

      <div className="space-y-3">
        <div className="flex justify-between text-stone-700">
          <span>Aluguel</span>
          <span>R$ {rent.toLocaleString('pt-BR')}</span>
        </div>
        {condo > 0 && (
          <div className="flex justify-between text-stone-700">
            <span>Condomínio</span>
            <span>R$ {condo.toLocaleString('pt-BR')}</span>
          </div>
        )}
        {iptu > 0 && (
          <div className="flex justify-between text-stone-700">
            <span>IPTU (rateado)</span>
            <span>R$ {iptu.toLocaleString('pt-BR')}</span>
          </div>
        )}
        {!utilsIncluded && (
          <>
            <div className="flex justify-between text-stone-700">
              <span>Água, luz, internet (média)</span>
              <span>R$ {utilities.toLocaleString('pt-BR')}</span>
            </div>
            <div className="pt-2">
              <label className="text-xs text-stone-500">Ajustar média de contas:</label>
              <input
                type="range"
                min="80"
                max="300"
                step="10"
                value={customUtilities}
                onChange={e => setCustomUtilities(Number(e.target.value))}
                className="w-full mt-1"
              />
              <span className="text-sm text-stone-600 ml-2">R$ {customUtilities}</span>
            </div>
          </>
        )}
        {utilsIncluded && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Contas inclusas</span>
            <span>Incluso no valor</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-stone-900">Total mensal</span>
          <span className="text-2xl font-bold text-primary-600">
            R$ {total.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  )
}
