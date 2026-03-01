import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const { showInfo } = useToast()

  const handleLogout = () => {
    logout()
    showInfo('Você saiu da sua conta.')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-display font-semibold text-xl text-stone-900 tracking-tight">
              KitNet<span className="text-primary-600">Fácil</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-stone-600 hover:text-primary-600 transition-colors">
                Início
              </Link>
              <Link to="/kitnets" className="text-stone-600 hover:text-primary-600 transition-colors">
                Buscar Kitnets
              </Link>
              {!loading && (
                user ? (
                  <>
                    <Link to="/favoritos" className="text-stone-600 hover:text-primary-600 transition-colors">
                      Favoritos
                    </Link>
                    <span className="text-stone-500 text-sm">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-stone-500 hover:text-stone-700 text-sm"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/entrar" className="text-stone-600 hover:text-primary-600 transition-colors">
                      Entrar
                    </Link>
                    <Link
                      to="/cadastro"
                      className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Cadastrar
                    </Link>
                  </>
                )
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-stone-100 border-t border-stone-200/80 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-stone-500 text-sm text-center">
            © 2026 KitNetFácil. Alugue sua kitnet ideal com transparência e facilidade.
          </p>
        </div>
      </footer>
    </div>
  )
}
