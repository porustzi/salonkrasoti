import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { Tag, ToggleLeft, ToggleRight } from 'lucide-react'

export function AdminPromotions() {
  const { data, updatePromotions } = useData()
  const promotions = data.promotions

  const updatePromo = (idx: number, field: string, value: string | boolean) => {
    const next = promotions.map((p, i) => i !== idx ? p : { ...p, [field]: value })
    updatePromotions(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Акції</h2>
          <p className="text-sm text-neutral-500">Спеціальні пропозиції та знижки</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
          {promotions.filter(p => p.isActive).length} активних · {promotions.length} всього
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SectionCard title={p.title}>
              <div className={`p-3 rounded-xl ${p.isActive ? 'bg-green-50 border border-green-100' : 'bg-neutral-50 border border-neutral-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <TextEditor
                    label="Назва акції"
                    value={p.title}
                    onChange={(v) => updatePromo(i, 'title', v)}
                    icon={<Tag className="w-3.5 h-3.5" />}
                  />
                  <button
                    onClick={() => updatePromo(i, 'isActive', !p.isActive)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ml-3 mt-5 ${
                      p.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'
                    }`}
                  >
                    {p.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                    {p.isActive ? 'Активно' : 'Неактивно'}
                  </button>
                </div>
              </div>
              <TextAreaEditor label="Опис" value={p.description} onChange={(v) => updatePromo(i, 'description', v)} />
              <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePromo(i, 'image', v)} />
              {p.image && (
                <div className="mt-2">
                  <img src={p.image} alt={p.title} className="w-full h-28 object-cover rounded-xl" />
                </div>
              )}
            </SectionCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
