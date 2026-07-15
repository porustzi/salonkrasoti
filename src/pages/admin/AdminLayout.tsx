import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useData, SyncStatus } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import {
  Scissors, Images, Users, MessageSquare, FileText, Tag,
  LogOut, LayoutDashboard, CheckCircle, AlertCircle, Loader2, Save,
  ChevronRight, Sparkles, Clock
} from 'lucide-react'

const STATUS_LABELS: Record<SyncStatus, { label: string; color: string; bg: string }> = {
  idle: { label: '—', color: 'text-white/40', bg: 'bg-white/5' },
  saving: { label: 'Збереження...', color: 'text-champagne', bg: 'bg-champagne/10' },
  saved: { label: 'Збережено', color: 'text-green-400', bg: 'bg-green-500/10' },
  error: { label: 'Помилка', color: 'text-red-400', bg: 'bg-red-500/10' },
}

const STATUS_ICONS: Record<SyncStatus, React.ReactNode> = {
  idle: null,
  saving: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  saved: <CheckCircle className="w-3.5 h-3.5" />,
  error: <AlertCircle className="w-3.5 h-3.5" />,
}

const SIDEBAR = [
  { path: '/admin/services', label: 'Послуги та ціни', icon: Scissors },
  { path: '/admin/gallery', label: 'Галерея', icon: Images },
  { path: '/admin/team', label: 'Команда', icon: Users },
  { path: '/admin/reviews', label: 'Відгуки', icon: MessageSquare },
  { path: '/admin/blog', label: 'Блог', icon: FileText },
  { path: '/admin/promotions', label: 'Акції', icon: Tag },
]

const PAGE_TITLES: Record<string, string> = {
  services: 'Послуги та ціни',
  gallery: 'Галерея',
  team: 'Команда',
  reviews: 'Відгуки',
  blog: 'Блог',
  promotions: 'Акції',
}

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { syncStatus, saveToSupabase } = useData()
  const [lastSaved, setLastSaved] = useState<string>('')

  const currentPage = location.pathname.split('/').pop() || 'services'
  const pageTitle = PAGE_TITLES[currentPage] || ''

  useEffect(() => {
    const authed = sessionStorage.getItem('admin_auth')
    if (!authed) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (syncStatus === 'saved') {
      const now = new Date()
      setLastSaved(now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }))
    }
  }, [syncStatus])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-neutral-900 z-40 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-champagne to-gold flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-neutral-900" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-heading font-semibold text-white truncate">Майстерня Краси</h1>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Адмін-панель</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {SIDEBAR.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-champagne/10 text-champagne shadow-sm'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-champagne' : 'text-white/30 group-hover:text-white/50'
                }`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-champagne" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-heading font-semibold text-neutral-900">{pageTitle}</h2>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <ChevronRight className="w-3 h-3" />
                <span>{BUSINESS_INFO.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Sync Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${STATUS_LABELS[syncStatus].bg} ${STATUS_LABELS[syncStatus].color} transition-all duration-300`}>
                {STATUS_ICONS[syncStatus]}
                <span>{STATUS_LABELS[syncStatus].label}</span>
                {lastSaved && syncStatus === 'idle' && (
                  <span className="text-white/30 flex items-center gap-1 ml-1">
                    <Clock className="w-3 h-3" />
                    {lastSaved}
                  </span>
                )}
              </div>

              <button
                onClick={saveToSupabase}
                disabled={syncStatus === 'saving'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
              >
                {syncStatus === 'saving' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Зберегти
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
