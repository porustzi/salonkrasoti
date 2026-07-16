import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard, ImageUpload } from './AdminFormFields'
import { motion } from 'framer-motion'
import { Star, Plus, Trash2 } from 'lucide-react'

const SOURCES = ['google', 'instagram', 'facebook'] as const

let nextId = Date.now()

export function AdminReviews() {
  const { data, updateReviews, updateContent } = useData()
  const reviews = data.reviews
  const rs = data.content.reviewsSection

  const setRs = (field: string, value: string) => {
    updateContent({ ...data.content, reviewsSection: { ...rs, [field]: value } })
  }
  const setPage = (field: string, value: string) => {
    updateContent({ ...data.content, pages: { ...data.content.pages, reviews: { ...data.content.pages.reviews, [field]: value } } })
  }

  const updateReview = (idx: number, field: string, value: string | number) => {
    const next = reviews.map((r, i) => i !== idx ? r : { ...r, [field]: value })
    updateReviews(next)
  }

  const addReview = () => {
    updateReviews([
      ...reviews,
      {
        id: String(nextId++),
        author: '',
        rating: 5,
        text: '',
        date: 'сьогодні',
        source: 'google',
      },
    ])
  }

  const removeReview = (idx: number) => {
    updateReviews(reviews.filter((_, i) => i !== idx))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Відгуки</h2>
          <p className="text-sm text-neutral-500">Відгуки клієнтів салону</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addReview}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Додати відгук
          </button>
          <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            {reviews.length} відгуків
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-neutral-100">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-base font-heading font-semibold text-neutral-700 mb-1">Немає відгуків</h3>
          <p className="text-sm text-neutral-400 max-w-xs">Додайте перший відгук про салон</p>
        </div>
      ) : (
        reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <SectionCard title={`Відгук #${i + 1}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: r.rating }, (_, k) => (
                    <Star key={k} className="w-4 h-4 fill-champagne text-champagne" />
                  ))}
                </div>
                <button
                  onClick={() => removeReview(i)}
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Видалити"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 w-full">
                  <TextEditor label="Автор" value={r.author} onChange={(v) => updateReview(i, 'author', v)} />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-24">
                    <TextEditor label="Рейтинг" value={String(r.rating)} onChange={(v) => updateReview(i, 'rating', Number(v) || 5)} />
                  </div>
                </div>
              </div>
              <TextAreaEditor label="Текст відгуку" value={r.text} onChange={(v) => updateReview(i, 'text', v)} />
              <div className="flex flex-col sm:flex-row gap-3">
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
        ))
      )}

      <SectionCard title="Секція відгуків (CTA)" index={99}>
        <TextEditor label="Заголовок" value={rs.heading} onChange={(v) => setRs('heading', v)} />
        <TextAreaEditor label="Підзаголовок" value={rs.subheading} onChange={(v) => setRs('subheading', v)} />
        <div className="flex flex-wrap gap-3">
          <TextEditor label="Google рейтинг текст" value={rs.googleRatingText} onChange={(v) => setRs('googleRatingText', v)} />
          <TextEditor label="Кнопка" value={rs.ctaText} onChange={(v) => setRs('ctaText', v)} />
        </div>
      </SectionCard>

      <SectionCard title="Сторінка «Відгуки»" index={100}>
        <TextEditor label="Hero: мітка" value={data.content.pages.reviews.eyebrow} onChange={(v) => setPage('eyebrow', v)} />
        <TextEditor label="Hero: заголовок" value={data.content.pages.reviews.title} onChange={(v) => setPage('title', v)} />
        <TextAreaEditor label="Hero: підзаголовок" value={data.content.pages.reviews.subtitle} onChange={(v) => setPage('subtitle', v)} rows={2} />
        <ImageUpload label="Hero: фонове зображення" value={data.content.pages.reviews.image} onChange={(v) => setPage('image', v)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <TextEditor label="Підпис: рейтинг" value={data.content.pages.reviews.statRatingLabel} onChange={(v) => setPage('statRatingLabel', v)} />
          <TextEditor label="Підпис: відгуки" value={data.content.pages.reviews.statReviewsLabel} onChange={(v) => setPage('statReviewsLabel', v)} />
          <TextEditor label="Підпис: рекомендують" value={data.content.pages.reviews.statRecommendLabel} onChange={(v) => setPage('statRecommendLabel', v)} />
        </div>
      </SectionCard>
    </motion.div>
  )
}
