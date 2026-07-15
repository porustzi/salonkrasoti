import { Outlet, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export function AdminLayout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <nav className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-neutral-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-rose-400" />
          </button>
          <span className="font-bold text-neutral-900">Майстерня Краси</span>
        </div>
        <button onClick={() => { sessionStorage.removeItem('github_token'); navigate('/admin/login') }} className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">Вийти</button>
      </nav>
      <main className="p-6"><Outlet /></main>
    </div>
  )
}
