import { useRef, useState } from 'react'
import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Upload, Trash2, GripVertical } from 'lucide-react'
import { uploadImage } from '../../lib/github'

let nextId = Date.now()

export function AdminGallery() {
  const { data, updateGallery, updateContent } = useData()
  const images = data.gallery

  const setPage = (field: string, value: string) => {
    updateContent({ ...data.content, pages: { ...data.content.pages, gallery: { ...data.content.pages.gallery, [field]: value } } })
  }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const updateImage = (idx: number, field: string, value: string) => {
    const next = images.map((img, i) => i !== idx ? img : { ...img, [field]: value })
    updateGallery(next)
  }

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx)
    updateGallery(next)
  }

  const moveImage = (idx: number, dir: -1 | 1) => {
    const target = idx + dir
    if (target < 0 || target >= images.length) return
    const next = [...images]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    updateGallery(next)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    setError('')
    const newImages: typeof images = []
    let failed = 0

    for (const file of files) {
      if (file.size > 25 * 1024 * 1024) {
        failed++
        continue
      }
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(',')[1])
        }
        reader.readAsDataURL(file)
      })

      try {
        const result = await uploadImage(file.name, base64)
        if (result?.ok && result.data?.url) {
          const name = file.name.replace(/\.[^/.]+$/, '')
          newImages.push({
            id: String(nextId++),
            src: result.data.url,
            alt: name,
            category: 'uploaded',
          })
        } else {
          failed++
        }
      } catch (err) {
        failed++
        console.error('Upload failed:', err)
      }
    }

    if (newImages.length > 0) {
      updateGallery([...images, ...newImages])
    }
    if (failed > 0) {
      setError(`Не вдалося завантажити ${failed} файл(ів). Перевірте розмір (до 25 МБ) та формат.`)
    }
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Галерея</h2>
          <p className="text-sm text-neutral-500">Керуйте фотографіями робіт салону</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
          >
            {uploading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Завантажити
          </button>
          <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            {images.length} фото
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-neutral-100">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-base font-heading font-semibold text-neutral-700 mb-1">Галерея порожня</h3>
          <p className="text-sm text-neutral-400 max-w-xs">Завантажте фотографії робіт салону з вашого пристрою або додайте URL</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              layout
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

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 transition-all"
                    title="Вліво"
                  >
                    <GripVertical className="w-3.5 h-3.5 rotate-90" />
                  </button>
                  <button
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 transition-all"
                    title="Вправо"
                  >
                    <GripVertical className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => removeImage(i)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Видалити"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
      )}

      <SectionCard title="Сторінка «Галерея»" index={99}>
        <TextEditor label="Hero: мітка" value={data.content.pages.gallery.eyebrow} onChange={(v) => setPage('eyebrow', v)} />
        <TextEditor label="Hero: заголовок" value={data.content.pages.gallery.title} onChange={(v) => setPage('title', v)} />
        <TextAreaEditor label="Hero: підзаголовок" value={data.content.pages.gallery.subtitle} onChange={(v) => setPage('subtitle', v)} rows={2} />
        <TextEditor label="Instagram CTA: заголовок" value={data.content.pages.gallery.instagramHeading} onChange={(v) => setPage('instagramHeading', v)} />
        <TextEditor label="Instagram CTA: нік" value={data.content.pages.gallery.instagramHandle} onChange={(v) => setPage('instagramHandle', v)} />
        <TextEditor label="Instagram CTA: кнопка" value={data.content.pages.gallery.instagramCtaText} onChange={(v) => setPage('instagramCtaText', v)} />
        <ImageUpload label="Hero: фонове зображення" value={data.content.pages.gallery.image} onChange={(v) => setPage('image', v)} />
      </SectionCard>
    </motion.div>
  )
}
