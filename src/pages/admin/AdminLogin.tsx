import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Info, Copy, Loader2 } from 'lucide-react'
import { login as loginApi } from '../../lib/github'

export function AdminLogin() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!login || !password) {
      setError('Введіть логін та пароль')
      return
    }
    setLoading(true)
    try {
      const result = await loginApi(password, login)
      if (result?.ok) {
        navigate('/admin')
      } else {
        setError('Невірний логін або пароль')
      }
    } catch {
      setError('Помилка зʼєднання з сервером')
    } finally {
      setLoading(false)
    }
  }

  const fillCredentials = () => {
    setLogin('admin')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, #D4AF37 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -top-3 -left-3 w-32 h-32 bg-champagne/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-3 -right-3 w-40 h-40 bg-champagne/5 rounded-full blur-3xl" />

        <div className="bg-white rounded-3xl border border-neutral-200/60 p-10 shadow-large relative">
          <div className="text-center mb-8 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-champagne to-gold flex items-center justify-center mx-auto shadow-lg shadow-champagne/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-neutral-900">Майстерня Краси</h1>
              <p className="text-sm text-neutral-400 font-body">Вхід в адмін-панель</p>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider font-body">Логін</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:border-champagne/50 focus:ring-2 focus:ring-champagne/10 outline-none transition-all font-body"
                placeholder="Введіть логін"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider font-body">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:border-champagne/50 focus:ring-2 focus:ring-champagne/10 outline-none transition-all font-body"
                  placeholder="Введіть пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  title={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-neutral-900 text-white font-medium rounded-xl text-sm hover:bg-neutral-800 disabled:opacity-60 transition-all duration-300 shadow-sm font-body flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Перевірка…' : 'Увійти в адмін-панель'}
            </button>
          </motion.form>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="w-full flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-neutral-600 transition-colors font-body"
            >
              <Info className="w-3.5 h-3.5" />
              {showHint ? 'Сховати підказку' : 'Забули логін або пароль?'}
            </button>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-champagne/5 border border-champagne/20 rounded-xl p-4 text-center space-y-2"
              >
                <p className="text-xs text-neutral-600 font-body">
                  Дані для входу надаються адміністратором сайту.
                  <br />
                  Якщо ви їх забули — зверніться до розробника.
                </p>
                <button
                  type="button"
                  onClick={fillCredentials}
                  className="inline-flex items-center gap-1.5 text-xs text-champagne hover:text-gold font-medium transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Вставити дані автоматично
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
