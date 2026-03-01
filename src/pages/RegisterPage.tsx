import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    try {
      await register(email, password, name)
      navigate('/kitnets')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="font-display text-2xl font-semibold text-stone-900 text-center mb-8">
          Criar conta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-stone-600 text-sm">
          Já tem conta?{' '}
          <Link to="/entrar" className="text-primary-600 font-medium hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
