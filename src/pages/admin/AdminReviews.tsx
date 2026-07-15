import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminReviews() {
  const { data, updateReviews } = useData()
  const reviews = data.reviews

  const updateReview = (idx: number, field: string, value: string | number) => {
    const next = reviews.map((r, i) => i !== idx ? r : { ...r, [field]: value })
    updateReviews(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Відгуки</h2>
      {reviews.map((r, i) => (
        <div key={r.id} className="bg-white rounded-xl p-5 space-y-3 shadow-sm border border-neutral-100">
          <TextEditor label="Автор" value={r.author} onChange={(v) => updateReview(i, 'author', v)} />
          <TextAreaEditor label="Текст" value={r.text} onChange={(v) => updateReview(i, 'text', v)} />
          <TextEditor label="Дата" value={r.date} onChange={(v) => updateReview(i, 'date', v)} />
        </div>
      ))}
    </motion.div>
  )
}
