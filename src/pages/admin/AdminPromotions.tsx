import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminPromotions() {
  const { data, updatePromotions } = useData()
  const promotions = data.promotions

  const updatePromo = (idx: number, field: string, value: string | boolean) => {
    const next = promotions.map((p, i) => i !== idx ? p : { ...p, [field]: value })
    updatePromotions(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Акції</h2>
      {promotions.map((p, i) => (
        <div key={p.id} className="bg-white rounded-xl p-5 space-y-3 shadow-sm border border-neutral-100">
          <TextEditor label="Назва акції" value={p.title} onChange={(v) => updatePromo(i, 'title', v)} />
          <TextAreaEditor label="Опис" value={p.description} onChange={(v) => updatePromo(i, 'description', v)} />
          <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePromo(i, 'image', v)} />
        </div>
      ))}
    </motion.div>
  )
}
