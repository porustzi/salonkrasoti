import { useData } from '../../context/DataContext'
import { TextEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminGallery() {
  const { data, updateGallery } = useData()
  const images = data.gallery

  const updateImage = (idx: number, field: string, value: string) => {
    const next = images.map((img, i) => i !== idx ? img : { ...img, [field]: value })
    updateGallery(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Галерея</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={img.id} className="bg-white rounded-xl p-4 space-y-3 shadow-sm border border-neutral-100">
            <img src={img.src} alt={img.alt} className="w-full h-36 object-cover rounded-lg" />
            <TextEditor label="Alt текст" value={img.alt} onChange={(v) => updateImage(i, 'alt', v)} />
            <TextEditor label="Категорія" value={img.category} onChange={(v) => updateImage(i, 'category', v)} />
            <TextEditor label="URL зображення" value={img.src} onChange={(v) => updateImage(i, 'src', v)} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
