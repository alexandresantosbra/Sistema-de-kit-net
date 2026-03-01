import { createContext, useCallback, useContext, useState, ReactNode, useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextType {
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

function createId() {
  return Math.random().toString(36).slice(2)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = createId()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const showSuccess = useCallback((message: string) => addToast('success', message), [addToast])
  const showError = useCallback((message: string) => addToast('error', message), [addToast])
  const showInfo = useCallback((message: string) => addToast('info', message), [addToast])

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
        {toasts.map(toast => {
          const base =
            'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-sm text-white border'
          const byType: Record<ToastType, string> = {
            success: 'bg-emerald-600 border-emerald-500',
            error: 'bg-red-600 border-red-500',
            info: 'bg-stone-900 border-stone-700',
          }
          return (
            <div key={toast.id} className={`${base} ${byType[toast.type]}`}>
              <div className="mt-0.5">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '⚠️'}
                {toast.type === 'info' && 'ℹ️'}
              </div>
              <div className="flex-1">
                <p className="font-medium">{toast.message}</p>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="ml-2 text-white/70 hover:text-white"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider')
  return ctx
}

