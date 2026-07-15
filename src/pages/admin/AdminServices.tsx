import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { Scissors, Clock, DollarSign, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

let nextId = Date.now()

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

  const addCategory = () => {
    updateServices([...cats, {
      id: String(nextId++),
      title: 'Нова категорія',
      icon: 'scissors',
      description: '',
      image: '',
      services: [],
    }])
  }

  const removeCategory = (idx: number) => {
    if (cats.length <= 1) return
    updateServices(cats.filter((_, i) => i !== idx))
  }

  const addService = (catIdx: number) => {
    const next = cats.map((cat, ci) => {
      if (ci !== catIdx) return cat
      return { ...cat, services: [...cat.services, { name: 'Нова послуга', duration: '', price: '', description: '' }] }
    })
    updateServices(next)
  }

  const removeService = (catIdx: number, svcIdx: number) => {
    const next = cats.map((cat, ci) => {
      if (ci !== catIdx) return cat
      if (cat.services.length <= 1) return cat
      return { ...cat, services: cat.services.filter((_, si) => si !== svcIdx) }
    })
    updateServices(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Послуги та ціни</h2>
          <p className="text-sm text-neutral-500">Редагуйте категорії послуг, ціни та описи</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addCategory}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Додати категорію
          </button>
          <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            {cats.reduce((sum, c) => sum + c.services.length, 0)} послуг · {cats.length} категорій
          </div>
        </div>
      </div>

      {cats.map((cat, ci) => (
        <SectionCard
          key={cat.id}
          title={cat.title}
          subtitle={`${cat.services.length} послуг`}
          index={ci + 1}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 items-start flex-1">
              <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                {cat.image ? (
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <TextEditor
                  label="Назва категорії"
                  value={cat.title}
                  onChange={(v) => updateCatField(ci, 'title', v)}
                  icon={<Scissors className="w-3.5 h-3.5" />}
                />
                <TextEditor
                  label="URL картинки"
                  value={cat.image}
                  onChange={(v) => updateCatField(ci, 'image', v)}
                  icon={<ImageIcon className="w-3 h-3" />}
                />
              </div>
            </div>
            <button
              onClick={() => removeCategory(ci)}
              disabled={cats.length <= 1}
              className="p-2 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors flex-shrink-0"
              title="Видалити категорію"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <TextAreaEditor
            label="Опис категорії"
            value={cat.description}
            onChange={(v) => updateCatField(ci, 'description', v)}
          />

          <div className="pt-2 space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              <span className="w-5 h-px bg-neutral-200" />
              Послуги
              <span className="w-5 h-px bg-neutral-200" />
            </div>
            {cat.services.map((svc, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: si * 0.03 }}
                className="bg-neutral-50 rounded-xl p-4 border border-neutral-100/50 relative group"
              >
                <button
                  onClick={() => removeService(ci, si)}
                  disabled={cat.services.length <= 1}
                  className="absolute top-2 right-2 p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors opacity-0 group-hover:opacity-100"
                  title="Видалити послугу"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <TextEditor label="Назва" value={svc.name} onChange={(v) => updateService(ci, si, 'name', v)} icon={<Scissors className="w-3 h-3" />} />
                  <TextEditor label="Тривалість" value={svc.duration} onChange={(v) => updateService(ci, si, 'duration', v)} icon={<Clock className="w-3 h-3" />} />
                  <TextEditor label="Ціна (грн)" value={svc.price} onChange={(v) => updateService(ci, si, 'price', v)} icon={<DollarSign className="w-3 h-3" />} />
                  <div className="md:col-span-3">
                    <TextAreaEditor label="Опис" value={svc.description} onChange={(v) => updateService(ci, si, 'description', v)} />
                  </div>
                </div>
              </motion.div>
            ))}
            <button
              onClick={() => addService(ci)}
              className="flex items-center gap-2 text-sm text-champagne hover:text-gold font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Додати послугу
            </button>
          </div>
        </SectionCard>
      ))}
    </motion.div>
  )
}
