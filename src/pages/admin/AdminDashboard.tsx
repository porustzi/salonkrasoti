import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import {
  Scissors, Images, Users, MessageSquare,
  ArrowRight, Sparkles, Smartphone, MapPin, Clock, Globe
} from 'lucide-react'

const SECTIONS = [
  {
    path: '/admin/services',
    icon: Scissors,
    title: 'Послуги та ціни',
    desc: 'Редагуйте перелік послуг, ціни, тривалість та описи',
    color: 'text-champagne',
    bg: 'bg-champagne/5',
    border: 'border-champagne/10',
  },
  {
    path: '/admin/gallery',
    icon: Images,
    title: 'Галерея',
    desc: 'Додавайте та редагуйте фотографії робіт салону',
    color: 'text-neutral-900',
    bg: 'bg-neutral-50',
    border: 'border-neutral-200',
  },
  {
    path: '/admin/team',
    icon: Users,
    title: 'Команда',
    desc: 'Керуйте інформацією про майстрів та співробітників',
    color: 'text-neutral-900',
    bg: 'bg-neutral-50',
    border: 'border-neutral-200',
  },
  {
    path: '/admin/reviews',
    icon: MessageSquare,
    title: 'Відгуки',
    desc: 'Переглядайте та редагуйте відгуки клієнтів',
    color: 'text-neutral-900',
    bg: 'bg-neutral-50',
    border: 'border-neutral-200',
  },
]

export function AdminDashboard() {
  const navigate = useNavigate()
  const { data } = useData()
  const cats = data.services
  const totalServices = cats.reduce((s, c) => s + c.services.length, 0)
  const totalGallery = data.gallery.length
  const totalTeam = data.team.length
  const totalReviews = data.reviews.length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne to-gold flex items-center justify-center shadow-lg shadow-champange/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold text-neutral-900">Вітаємо в адмін-панелі!</h1>
            <p className="text-sm text-neutral-400">{BUSINESS_INFO.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-heading font-bold text-neutral-900">{totalServices}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Послуг</div>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-heading font-bold text-neutral-900">{totalGallery}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Фото</div>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-heading font-bold text-neutral-900">{totalTeam}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Майстрів</div>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-heading font-bold text-neutral-900">{totalReviews}</div>
            <div className="text-xs text-neutral-400 mt-0.5">Відгуків</div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 font-body">Розділи для редагування</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.button
                key={s.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(s.path)}
                className={`flex items-center gap-4 p-5 rounded-2xl border ${s.border} ${s.bg} text-left hover:shadow-medium transition-all duration-200 group`}
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-heading font-semibold text-neutral-900">{s.title}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{s.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-champagne transition-colors flex-shrink-0" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Salon info quick view */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
        <h3 className="text-sm font-heading font-semibold text-neutral-900 mb-4">Інформація про салон</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 text-neutral-500">
            <MapPin className="w-4 h-4 text-champagne" />
            {BUSINESS_INFO.address}
          </div>
          <div className="flex items-center gap-3 text-neutral-500">
            <Smartphone className="w-4 h-4 text-champagne" />
            {BUSINESS_INFO.phone}
          </div>
          <div className="flex items-center gap-3 text-neutral-500">
            <Clock className="w-4 h-4 text-champagne" />
            Щодня 10:00 – 21:00
          </div>
          <div className="flex items-center gap-3 text-neutral-500">
            <Globe className="w-4 h-4 text-champagne" />
            {BUSINESS_INFO.instagram}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
