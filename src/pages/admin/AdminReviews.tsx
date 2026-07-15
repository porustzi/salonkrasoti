import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const SOURCES = ['google', 'instagram', 'facebook'] as const

export function AdminReviews() {
  const { data, updateReviews } = useData()
  const reviews = data.reviews

  const updateReview = (idx: number, field: string, value: string | number) => {
    const next = reviews.map((r, i) => i !== idx ? r : { ...r, [field]: value })
    updateReviews(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Відгуки</h2>
          <p className="text-sm text-neutral-500">Відгуки клієнтів салону</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
          {reviews.length} відгуків
        </div>
      </div>

      {reviews.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <SectionCard title={`Відгук #${i + 1}`}>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <TextEditor label="Автор" value={r.author} onChange={(v) => updateReview(i, 'author', v)} />
              </div>
              <div className="w-24">
                <TextEditor label="Рейтинг" value={String(r.rating)} onChange={(v) => updateReview(i, 'rating', Number(v) || 5)} />
              </div>
              <div className="flex items-center gap-0.5 mt-5">
                {Array.from({ length: r.rating }, (_, k) => (
                  <Star key={k} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                ))}
              </div>
            </div>
            <TextAreaEditor label="Текст відгуку" value={r.text} onChange={(v) => updateReview(i, 'text', v)} />
            <div className="flex gap-3">
              <TextEditor label="Дата" value={r.date} onChange={(v) => updateReview(i, 'date', v)} hint="Напр: 2 тижні тому" />
              <div className="flex-1 space-y-1.5">
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">Джерело</label>
                <select
                  value={r.source}
                  onChange={(e) => updateReview(i, 'source', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-champagne/40 focus:ring-2 focus:ring-champagne/10 outline-none transition-all"
                >
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </SectionCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
