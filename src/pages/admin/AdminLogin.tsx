import { useState } from 'react'
import { LockKeyhole, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ADMIN_CREDENTIALS = {
  login: 'admin',
  password: 'admin@salon2024!',
}

export function AdminLogin() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('admin_auth', 'true')
      navigate('/admin/services')
    } else {
      setError('Невірний логін або пароль')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-medium p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mx-auto">
            <LockKeyhole className="w-6 h-6 text-champagne" />
          </div>
          <h1 className="text-xl font-semibold text-neutral-900">Адмін-панель</h1>
          <p className="text-sm text-neutral-500">Увійдіть для керування сайтом</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2.5 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Логін</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none"
              placeholder="admin"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 pr-10 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-champagne text-white rounded-lg text-sm font-medium hover:bg-champagne/90 transition-colors"
        >
          Увійти
        </button>

        <p className="text-xs text-neutral-400 text-center">
          Тільки для адміністратора салону
        </p>
      </form>
    </div>
  )
}
