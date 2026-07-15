import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminServices() {
  const { data, updateServices } = useData()
  const cats = data.services

  const updateService = (catIdx: number, svcIdx: number, field: string, value: string) => {
    const next = cats.map((cat, ci) => {
      if (ci !== catIdx) return cat
      return { ...cat, services: cat.services.map((svc, si) => si !== svcIdx ? svc : { ...svc, [field]: value }) }
    })
    updateServices(next)
  }

  const updateCatField = (catIdx: number, field: string, value: string) => {
    const next = cats.map((cat, ci) => ci !== catIdx ? cat : { ...cat, [field]: value })
    updateServices(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Послуги та ціни</h2>
      {cats.map((cat, ci) => (
        <div key={cat.id} className="bg-white rounded-xl p-5 space-y-3 shadow-sm border border-neutral-100">
          <TextEditor label="Назва категорії" value={cat.title} onChange={(v) => updateCatField(ci, 'title', v)} />
          <TextAreaEditor label="Опис категорії" value={cat.description} onChange={(v) => updateCatField(ci, 'description', v)} />
          <div className="space-y-3 pt-2">
            {cat.services.map((svc, si) => (
              <div key={si} className="bg-neutral-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TextEditor label="Назва" value={svc.name} onChange={(v) => updateService(ci, si, 'name', v)} />
                <TextEditor label="Тривалість" value={svc.duration} onChange={(v) => updateService(ci, si, 'duration', v)} />
                <TextEditor label="Ціна" value={svc.price} onChange={(v) => updateService(ci, si, 'price', v)} />
                <div className="sm:col-span-3">
                  <TextAreaEditor label="Опис" value={svc.description} onChange={(v) => updateService(ci, si, 'description', v)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
