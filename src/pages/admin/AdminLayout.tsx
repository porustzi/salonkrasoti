import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useData, SyncStatus } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import { CheckCircle, AlertCircle, Loader2, Save, LogOut, LayoutDashboard, Scissors, Images, Users, MessageSquare, FileText, Tag } from 'lucide-react'

const STATUS_LABELS: Record<SyncStatus, { text: string; color: string }> = {
  idle: { text: '', color: '' },
  saving: { text: 'Збереження...', color: 'text-blue-600' },
  saved: { text: 'Збережено', color: 'text-green-600' },
  error: { text: 'Помилка', color: 'text-red-600' },
}

const SIDEBAR = [
  { path: '/admin/services', label: 'Послуги та ціни', icon: Scissors },
  { path: '/admin/gallery', label: 'Галерея', icon: Images },
  { path: '/admin/team', label: 'Команда', icon: Users },
  { path: '/admin/reviews', label: 'Відгуки', icon: MessageSquare },
  { path: '/admin/blog', label: 'Блог', icon: FileText },
  { path: '/admin/promotions', label: 'Акції', icon: Tag },
]

function SyncBar({ status, onSave }: { status: SyncStatus; onSave: () => void }) {
  const s = STATUS_LABELS[status]
  return (
    <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-neutral-200 px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-2 text-sm">
        {status === 'saving' && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
        {status === 'saved' && <CheckCircle className="w-4 h-4 text-green-600" />}
        {status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
        <span className={s?.color || ''}>{s?.text}</span>
      </div>
      <button
        onClick={onSave}
        disabled={status === 'saving'}
        className="inline-flex items-center gap-2 px-4 py-2 bg-champagne text-white rounded-lg text-sm font-medium hover:bg-champagne/90 disabled:opacity-50 transition-colors"
      >
        <Save className="w-4 h-4" />
        Зберегти
      </button>
    </div>
  )
}

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { syncStatus, saveToSupabase } = useData()

  useEffect(() => {
    const authed = sessionStorage.getItem('admin_auth')
    if (!authed) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral-200 z-40 flex flex-col">
        <div className="p-4 border-b border-neutral-100">
          <h1 className="text-base font-semibold text-neutral-900">Адмін-панель</h1>
          <p className="text-xs text-neutral-500 truncate">{BUSINESS_INFO.name}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {SIDEBAR.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-champagne/10 text-champagne'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-neutral-100 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500 hover:bg-neutral-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </aside>

      <main className="ml-64 p-6">
        <Outlet />
      </main>

      <SyncBar status={syncStatus} onSave={saveToSupabase} />
    </div>
  )
}
