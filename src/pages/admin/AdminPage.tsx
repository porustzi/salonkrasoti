import { useState } from 'react'
import { motion } from 'framer-motion'
import { useData, SyncStatus } from '../../context/DataContext'
import { BUSINESS_INFO } from '../../config/constants'
import { CheckCircle, AlertCircle, Loader2, Save, LogOut } from 'lucide-react'

const STATUS_LABELS: Record<SyncStatus, { text: string; color: string; icon: React.ReactNode }> = {
  idle: { text: '', color: '', icon: null },
  saving: { text: 'Збереження...', color: 'text-blue-600', icon: <Loader2 className="w-4 h-4 animate-spin" /> },
  saved: { text: 'Збережено', color: 'text-green-600', icon: <CheckCircle className="w-4 h-4" /> },
  error: { text: 'Помилка', color: 'text-red-600', icon: <AlertCircle className="w-4 h-4" /> },
}

const TABS = [
  { id: 'services', label: 'Послуги' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'team', label: 'Команда' },
  { id: 'reviews', label: 'Відгуки' },
  { id: 'blog', label: 'Блог' },
  { id: 'promotions', label: 'Акції' },
] as const

type TabId = typeof TABS[number]['id']

function SyncBar({ status, onSave }: { status: SyncStatus; onSave: () => void }) {
  const s = STATUS_LABELS[status]
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-2 text-sm">
        {s?.icon}
        <span className={s?.color || ''}>{s?.text}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={status === 'saving'}
          className="inline-flex items-center gap-2 px-4 py-2 bg-champagne text-white rounded-lg text-sm font-medium hover:bg-champagne/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          Зберегти
        </button>
      </div>
    </div>
  )
}

function TextEditor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none"
      />
    </div>
  )
}

function TextAreaEditor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none resize-y"
      />
    </div>
  )
}

function ServicesEditor() {
  const { data, updateServices } = useData()
  const cats = data.services

  const updateService = (catIdx: number, svcIdx: number, field: string, value: string) => {
    const next = cats.map((cat, ci) => {
      if (ci !== catIdx) return cat
      return {
        ...cat,
        services: cat.services.map((svc, si) => {
          if (si !== svcIdx) return svc
          return { ...svc, [field]: value }
        }),
      }
    })
    updateServices(next)
  }

  const updateCatField = (catIdx: number, field: string, value: string) => {
    const next = cats.map((cat, ci) => {
      if (ci !== catIdx) return cat
      return { ...cat, [field]: value }
    })
    updateServices(next)
  }

  return (
    <div className="space-y-6">
      {cats.map((cat, ci) => (
        <div key={cat.id} className="bg-neutral-50 rounded-xl p-4 space-y-3">
          <input
            type="text"
            value={cat.title}
            onChange={(e) => updateCatField(ci, 'title', e.target.value)}
            className="w-full text-lg font-semibold px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none"
          />
          <input
            type="text"
            value={cat.description}
            onChange={(e) => updateCatField(ci, 'description', e.target.value)}
            className="w-full text-sm px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-champagne/20 focus:border-champagne outline-none"
          />
          <div className="space-y-2 pl-4 border-l-2 border-champagne/30">
            {cat.services.map((svc, si) => (
              <div key={si} className="bg-white rounded-lg p-3 grid grid-cols-3 gap-2">
                <TextEditor label="Назва" value={svc.name} onChange={(v) => updateService(ci, si, 'name', v)} />
                <TextEditor label="Тривалість" value={svc.duration} onChange={(v) => updateService(ci, si, 'duration', v)} />
                <TextEditor label="Ціна" value={svc.price} onChange={(v) => updateService(ci, si, 'price', v)} />
                <div className="col-span-3">
                  <TextAreaEditor label="Опис" value={svc.description} onChange={(v) => updateService(ci, si, 'description', v)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function GalleryEditor() {
  const { data, updateGallery } = useData()
  const images = data.gallery

  const updateImage = (idx: number, field: string, value: string) => {
    const next = images.map((img, i) => {
      if (i !== idx) return img
      return { ...img, [field]: value }
    })
    updateGallery(next)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div key={img.id} className="bg-neutral-50 rounded-xl p-3 space-y-2">
          <img src={img.src} alt={img.alt} className="w-full h-32 object-cover rounded-lg" />
          <TextEditor label="Alt текст" value={img.alt} onChange={(v) => updateImage(i, 'alt', v)} />
          <TextEditor label="Категорія" value={img.category} onChange={(v) => updateImage(i, 'category', v)} />
          <TextEditor label="URL" value={img.src} onChange={(v) => updateImage(i, 'src', v)} />
        </div>
      ))}
    </div>
  )
}

function TeamEditor() {
  const { data, updateTeam } = useData()
  const members = data.team

  const updateMember = (idx: number, field: string, value: string) => {
    const next = members.map((m, i) => {
      if (i !== idx) return m
      return { ...m, [field]: value }
    })
    updateTeam(next)
  }

  return (
    <div className="space-y-4">
      {members.map((m, i) => (
        <div key={m.id} className="bg-neutral-50 rounded-xl p-4 grid grid-cols-2 gap-3">
          <TextEditor label="Ім'я" value={m.name} onChange={(v) => updateMember(i, 'name', v)} />
          <TextEditor label="Посада" value={m.position} onChange={(v) => updateMember(i, 'position', v)} />
          <TextEditor label="Досвід" value={m.experience} onChange={(v) => updateMember(i, 'experience', v)} />
          <TextEditor label="Instagram" value={m.instagram} onChange={(v) => updateMember(i, 'instagram', v)} />
          <div className="col-span-2">
            <TextEditor label="Фото URL" value={m.image} onChange={(v) => updateMember(i, 'image', v)} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ReviewsEditor() {
  const { data, updateReviews } = useData()
  const reviews = data.reviews

  const updateReview = (idx: number, field: string, value: string) => {
    const next = reviews.map((r, i) => {
      if (i !== idx) return r
      return { ...r, [field]: value }
    })
    updateReviews(next)
  }

  return (
    <div className="space-y-4">
      {reviews.map((r, i) => (
        <div key={r.id} className="bg-neutral-50 rounded-xl p-4 space-y-3">
          <TextEditor label="Автор" value={r.author} onChange={(v) => updateReview(i, 'author', v)} />
          <TextAreaEditor label="Текст" value={r.text} onChange={(v) => updateReview(i, 'text', v)} />
          <TextEditor label="Дата" value={r.date} onChange={(v) => updateReview(i, 'date', v)} />
        </div>
      ))}
    </div>
  )
}

function BlogEditor() {
  const { data, updateBlog } = useData()
  const posts = data.blog

  const updatePost = (idx: number, field: string, value: string) => {
    const next = posts.map((p, i) => {
      if (i !== idx) return p
      return { ...p, [field]: value }
    })
    updateBlog(next)
  }

  return (
    <div className="space-y-4">
      {posts.map((p, i) => (
        <div key={p.id} className="bg-neutral-50 rounded-xl p-4 space-y-3">
          <TextEditor label="Заголовок" value={p.title} onChange={(v) => updatePost(i, 'title', v)} />
          <TextAreaEditor label="Короткий опис" value={p.excerpt} onChange={(v) => updatePost(i, 'excerpt', v)} />
          <TextAreaEditor label="Повний текст" value={p.content} onChange={(v) => updatePost(i, 'content', v)} />
          <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePost(i, 'image', v)} />
        </div>
      ))}
    </div>
  )
}

function PromotionsEditor() {
  const { data, updatePromotions } = useData()
  const promotions = data.promotions

  const updatePromo = (idx: number, field: string, value: string) => {
    const next = promotions.map((p, i) => {
      if (i !== idx) return p
      return { ...p, [field]: value }
    })
    updatePromotions(next)
  }

  return (
    <div className="space-y-4">
      {promotions.map((p, i) => (
        <div key={p.id} className="bg-neutral-50 rounded-xl p-4 space-y-3">
          <TextEditor label="Назва" value={p.title} onChange={(v) => updatePromo(i, 'title', v)} />
          <TextAreaEditor label="Опис" value={p.description} onChange={(v) => updatePromo(i, 'description', v)} />
          <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePromo(i, 'image', v)} />
        </div>
      ))}
    </div>
  )
}

const EDITORS: Record<TabId, React.FC> = {
  services: ServicesEditor,
  gallery: GalleryEditor,
  team: TeamEditor,
  reviews: ReviewsEditor,
  blog: BlogEditor,
  promotions: PromotionsEditor,
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>('services')
  const { syncStatus, saveToSupabase } = useData()
  const Editor = EDITORS[activeTab]

  return (
    <div className="min-h-screen bg-cream pb-20">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-neutral-900">Адмін-панель</h1>
            <p className="text-xs text-neutral-500">{BUSINESS_INFO.name}</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            На сайт
          </a>
        </div>
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-champagne text-champagne'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Editor />
        </motion.div>
      </main>

      <SyncBar status={syncStatus} onSave={saveToSupabase} />
    </div>
  )
}
