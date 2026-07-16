import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useData, SyncStatus } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import {
  Scissors, Images, MessageSquare, Home, MapPin,
  LogOut, LayoutDashboard, CheckCircle, AlertCircle, Loader2, Save,
  ChevronRight, Sparkles, Clock, Menu, Info, ChevronDown
} from 'lucide-react'

const STATUS_LABELS: Record<SyncStatus, { label: string; color: string; bg: string }> = {
  idle: { label: 'Збережено', color: 'text-neutral-400', bg: 'bg-neutral-100' },
  loading: { label: 'Завантаження...', color: 'text-neutral-400', bg: 'bg-neutral-100' },
  saving: { label: 'Збереження...', color: 'text-champagne', bg: 'bg-champagne/10' },
  saved: { label: 'Збережено', color: 'text-green-600', bg: 'bg-green-50' },
  error: { label: 'Помилка збереження', color: 'text-red-500', bg: 'bg-red-50' },
}

const STATUS_ICONS: Record<SyncStatus, React.ReactNode> = {
  idle: null,
  loading: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  saving: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  saved: <CheckCircle className="w-3.5 h-3.5" />,
  error: <AlertCircle className="w-3.5 h-3.5" />,
}

type NavChild = { path: string; label: string }
type NavItem = { path: string; label: string; icon: React.ComponentType<{ className?: string }> } | { label: string; icon: React.ComponentType<{ className?: string }>; children: NavChild[] }

const NAV_ITEMS: NavItem[] = [
  { path: '/admin', label: 'Панель', icon: LayoutDashboard },
  { path: '/admin/home', label: 'Головна сторінка', icon: Home },
  { path: '/admin/pricing', label: 'Ціни', icon: Scissors },
  { path: '/admin/gallery', label: 'Галерея', icon: Images },
  {
    label: 'Про нас', icon: Info,
    children: [
      { path: '/admin/about', label: 'Про салон' },
      { path: '/admin/about/team', label: 'Команда' },
    ],
  },
  { path: '/admin/reviews', label: 'Відгуки', icon: MessageSquare },
  { path: '/admin/contacts', label: 'Контакти', icon: MapPin },
]

const PAGE_TITLES: Record<string, string> = {
  '': 'Головна',
  pricing: 'Ціни та послуги',
  gallery: 'Галерея',
  about: 'Про салон',
  team: 'Команда',
  reviews: 'Відгуки',
  contacts: 'Контакти',
}

function usePageTitle(): string {
  const location = useLocation()
  const path = location.pathname
  for (const [key, title] of Object.entries(PAGE_TITLES)) {
    if (path.endsWith('/' + key) || (key === '' && !path.split('/')[2])) return title
  }
  return ''
}

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { syncStatus, dirty, saveToGithub } = useData()
  const [lastSaved, setLastSaved] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(true)
  const pageTitle = usePageTitle()

  useEffect(() => {
    const authed = sessionStorage.getItem('admin_auth')
    if (!authed) navigate('/admin/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    if (syncStatus === 'saved') {
      const now = new Date()
      setLastSaved(now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }))
    }
  }, [syncStatus])

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  const isActive = (path: string) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path + '/'))
  const isChildActive = (children?: { path: string }[]) => children?.some(c => location.pathname === c.path || location.pathname.startsWith(c.path + '/')) ?? false

  const sidebarContent = (
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
        {NAV_ITEMS.map((item) => {
          if ('children' in item) {
            const open = aboutOpen || isChildActive(item.children)
            return (
              <div key={item.label}>
                <button
                  onClick={() => setAboutOpen(!open)}
                  className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isChildActive(item.children)
                      ? 'bg-champagne/10 text-champagne'
                      : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${open ? 'rotate-0' : '-rotate-90'}`} />
                </button>
                {open && (
                  <div className="ml-3 mt-0.5 space-y-0.5 pl-4 border-l-2 border-neutral-100">
                    {item.children.map((child) => {
                      const active = location.pathname === child.path
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm transition-all ${
                            active
                              ? 'bg-champagne/10 text-champagne font-medium'
                              : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-champagne/10 text-champagne shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? 'text-champagne' : 'text-neutral-400 group-hover:text-neutral-500'}`} />
              <span>{item.label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-champagne" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-neutral-100 space-y-1">
        <Link to="/" className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all">
          <LayoutDashboard className="w-4 h-4" />
          На сайт
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-all w-full">
          <LogOut className="w-4 h-4" />
          Вийти
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream font-body">
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral-100 z-40 hidden lg:flex flex-col shadow-sm">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-up">
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60">
          <div className="px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors flex-shrink-0">
                <Menu className="w-4 h-4" />
              </button>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-heading font-semibold text-neutral-900 truncate">{pageTitle}</h2>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400">
                  <ChevronRight className="w-3 h-3" />
                  <span>{BUSINESS_INFO.name}</span>
                </div>
              </div>
            </div>
              <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${STATUS_LABELS[syncStatus].bg} ${STATUS_LABELS[syncStatus].color}`}>
                {STATUS_ICONS[syncStatus]}
                <span>{STATUS_LABELS[syncStatus].label}</span>
                {lastSaved && syncStatus === 'idle' && (
                  <span className="text-neutral-400 flex items-center gap-1 ml-1"><Clock className="w-3 h-3" />{lastSaved}</span>
                )}
              </div>
              {dirty && syncStatus !== 'loading' && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Є незбережені
                </span>
              )}
              <button
                onClick={saveToGithub}
                disabled={syncStatus === 'saving' || syncStatus === 'loading' || !dirty}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
                  dirty
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {syncStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="hidden sm:inline">Зберегти</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-6 lg:p-8">
          {syncStatus === 'loading' ? (
            <div className="flex items-center justify-center py-32 text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-3 text-sm">Завантаження даних…</span>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  )
}
