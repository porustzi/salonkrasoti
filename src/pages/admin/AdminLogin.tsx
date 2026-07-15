import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Key } from 'lucide-react'

export function AdminLogin() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('https://api.github.com/repos/porustzi/salonkrasoti', {
        headers: { Authorization: 	oken , Accept: 'application/vnd.github.v3+json' }
      })
      if (res.ok) {
        sessionStorage.setItem('github_token', token)
        navigate('/admin')
      } else {
        setError('Невірний токен')
      }
    } catch {
      setError('Помилка підключення')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-neutral-200 p-10 shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Майстерня Краси</h1>
          <p className="text-sm text-neutral-400 mt-1">Вхід в адмін-панель</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 text-center">{error}</div>}
          
          <div>
            <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5">GitHub Personal Access Token</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="password" value={token} onChange={(e) => setToken(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" autoFocus />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              <a href="https://github.com/settings/tokens/new?scopes=repo&description=salonkrasoti" target="_blank" className="underline hover:text-neutral-600">Створити токен &rarr;</a>
            </p>
          </div>

          <button type="submit" className="w-full py-3 bg-neutral-900 text-white font-medium rounded-xl text-sm hover:bg-neutral-800 transition-all">
            Увійти в адмін-панель
          </button>
        </form>
      </div>
    </div>
  )
}
