import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useData, SyncStatus } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import {
  Scissors, Images, Users, MessageSquare,
  LogOut, LayoutDashboard, CheckCircle, AlertCircle, Loader2, Save,
  ChevronRight, Sparkles, Clock, Menu, X
} from 'lucide-react'

const STATUS_LABELS: Record<SyncStatus, { label: string; color: string; bg: string }> = {
  idle: { label: '—', color: 'text-neutral-400', bg: 'bg-neutral-100' },
  saving: { label: 'Збереження...', color: 'text-champagne', bg: 'bg-champagne/10' },
  saved: { label: 'Збережено', color: 'text-green-600', bg: 'bg-green-50' },
  error: { label: 'Помилка', color: 'text-red-500', bg: 'bg-red-50' },
}

const STATUS_ICONS: Record<SyncStatus, React.ReactNode> = {
  idle: null,
  saving: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  saved: <CheckCircle className="w-3.5 h-3.5" />,
  error: <AlertCircle className="w-3.5 h-3.5" />,
}

const SIDEBAR = [
  { path: '/admin', label: 'Головна', icon: LayoutDashboard },
  { path: '/admin/services', label: 'Послуги та ціни', icon: Scissors },
  { path: '/admin/gallery', label: 'Галерея', icon: Images },
  { path: '/admin/team', label: 'Команда', icon: Users },
  { path: '/admin/reviews', label: 'Відгуки', icon: MessageSquare },
]

const PAGE_TITLES: Record<string, string> = {
  '': 'Головна',
  services: 'Послуги та ціни',
  gallery: 'Галерея',
  team: 'Команда',
  reviews: 'Відгуки',
}

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { syncStatus, saveToSupabase } = useData()
  const [lastSaved, setLastSaved] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

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

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 border-b border-champagne/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-champagne to-gold flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-heading font-semibold text-neutral-900 truncate">Майстерня Краси</h1>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-body">Адмін-панель</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {SIDEBAR.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-champagne/10 text-champagne shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                isActive ? 'text-champagne' : 'text-neutral-400 group-hover:text-neutral-500'
              }`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-champagne" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-neutral-100 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          На сайт
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Вийти
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral-100 z-40 hidden lg:flex flex-col shadow-sm">
        {sidebar}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slide-up">
            {sidebar}
          </div>
        </div>
      )}

      {/* Main */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">{pageTitle}</h2>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <ChevronRight className="w-3 h-3" />
                  <span>{BUSINESS_INFO.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${STATUS_LABELS[syncStatus].bg} ${STATUS_LABELS[syncStatus].color} transition-all duration-300`}>
                {STATUS_ICONS[syncStatus]}
                <span>{STATUS_LABELS[syncStatus].label}</span>
                {lastSaved && syncStatus === 'idle' && (
                  <span className="text-neutral-400 flex items-center gap-1 ml-1">
                    <Clock className="w-3 h-3" />
                    {lastSaved}
                  </span>
                )}
              </div>

              <button
                onClick={saveToSupabase}
                disabled={syncStatus === 'saving'}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
              >
                {syncStatus === 'saving' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Зберегти</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
