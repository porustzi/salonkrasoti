import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Scissors, Images, Users, MessageSquare, ArrowRight } from 'lucide-react'

const SECTIONS = [
  { path: '/admin/editor/general', icon: FileText, title: 'Загальна інформація', desc: 'Назва, адреса, телефон, Instagram' },
  { path: '/admin/editor/services', icon: Scissors, title: 'Послуги', desc: 'Створюйте, редагуйте послуги' },
  { path: '/admin/editor/gallery', icon: Images, title: 'Галерея', desc: 'Фотографії робіт' },
  { path: '/admin/editor/team', icon: Users, title: 'Команда', desc: 'Майстри та співробітники' },
  { path: '/admin/editor/reviews', icon: MessageSquare, title: 'Відгуки', desc: 'Клієнтські відгуки' },
]

export function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Вітаємо в адмін-панелі!</h1>
        <p className="text-neutral-500 mt-2">Тут ви можете редагувати контент сайту Майстерня Краси</p>
      </div>
      <div>
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Розділи для редагування</h2>
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
                className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-200 bg-white text-left hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-neutral-900">{s.title}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{s.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300" />
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}