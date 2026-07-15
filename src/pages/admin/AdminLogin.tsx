import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Sparkles } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
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

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl relative">
          <div className="text-center mb-8 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-champagne to-gold flex items-center justify-center mx-auto shadow-lg shadow-champagne/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-white">Майстерня Краси</h1>
              <p className="text-sm text-white/50 font-body">Адмін-панель</p>
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
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider">Логін</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:border-champagne/50 focus:ring-2 focus:ring-champagne/10 outline-none transition-all"
                placeholder="admin"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-white/60 uppercase tracking-wider">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:border-champagne/50 focus:ring-2 focus:ring-champagne/10 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-champagne to-gold text-neutral-900 font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-champagne/20 transition-all duration-300"
            >
              Увійти
            </button>
          </motion.form>

          <div className="mt-6 flex items-center gap-2 justify-center text-white/20 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>Тільки для адміністратора</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
