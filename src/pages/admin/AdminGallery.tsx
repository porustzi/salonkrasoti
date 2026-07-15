import { useData } from '../../context/DataContext'
import { TextEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'

export function AdminGallery() {
  const { data, updateGallery } = useData()
  const images = data.gallery

  const updateImage = (idx: number, field: string, value: string) => {
    const next = images.map((img, i) => i !== idx ? img : { ...img, [field]: value })
    updateGallery(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Галерея</h2>
          <p className="text-sm text-neutral-500">Керуйте фотографіями робіт салону</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
          {images.length} фото
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <SectionCard title={`Фото ${i + 1}`}>
              <div className="relative group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-40 object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = ''
                    ;(e.target as HTMLImageElement).classList.add('hidden')
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      parent.querySelector('.fallback')?.classList.remove('hidden')
                    }
                  }}
                />
                <div className="hidden fallback absolute inset-0 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              </div>
              <TextEditor
                label="Alt текст"
                value={img.alt}
                onChange={(v) => updateImage(i, 'alt', v)}
                hint="Для SEO та доступності"
              />
              <TextEditor
                label="Категорія"
                value={img.category}
                onChange={(v) => updateImage(i, 'category', v)}
                hint="coloring, blonde, haircuts, styling..."
              />
              <TextEditor
                label="URL зображення"
                value={img.src}
                onChange={(v) => updateImage(i, 'src', v)}
              />
            </SectionCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
