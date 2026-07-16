import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard, ImageUpload } from './AdminFormFields'
import { Plus, Trash2 } from 'lucide-react'

export function AdminAbout() {
  const { data, updateContent } = useData()
  const c = data.content.about

  const setStory = (field: string, value: string | string[]) => {
    updateContent({ ...data.content, about: { ...c, story: { ...c.story, [field]: value } } })
  }

  const setCta = (field: string, value: string) => {
    updateContent({ ...data.content, about: { ...c, cta: { ...c.cta, [field]: value } } })
  }

  const setPage = (field: string, value: string) => {
    updateContent({ ...data.content, pages: { ...data.content.pages, about: { ...data.content.pages.about, [field]: value } } })
  }

  const updateValue = (idx: number, field: string, value: string) => {
    const values = c.values.map((v, i) => i !== idx ? v : { ...v, [field]: value })
    updateContent({ ...data.content, about: { ...c, values } })
  }

  const addValue = () => {
    updateContent({ ...data.content, about: { ...c, values: [...c.values, { title: '', description: '' }] } })
  }

  const removeValue = (idx: number) => {
    if (c.values.length <= 1) return
    updateContent({ ...data.content, about: { ...c, values: c.values.filter((_, i) => i !== idx) } })
  }

  const updateTimeline = (idx: number, field: string, value: string) => {
    const timeline = c.timeline.map((t, i) => i !== idx ? t : { ...t, [field]: value })
    updateContent({ ...data.content, about: { ...c, timeline } })
  }

  const addTimeline = () => {
    updateContent({ ...data.content, about: { ...c, timeline: [...c.timeline, { year: '', title: '', description: '' }] } })
  }

  const removeTimeline = (idx: number) => {
    if (c.timeline.length <= 1) return
    updateContent({ ...data.content, about: { ...c, timeline: c.timeline.filter((_, i) => i !== idx) } })
  }

  const updateFeature = (idx: number, field: string, value: string) => {
    const features = c.features.map((f, i) => i !== idx ? f : { ...f, [field]: value })
    updateContent({ ...data.content, about: { ...c, features } })
  }

  const addFeature = () => {
    updateContent({ ...data.content, about: { ...c, features: [...c.features, { title: '', description: '', image: '' }] } })
  }

  const removeFeature = (idx: number) => {
    if (c.features.length <= 1) return
    updateContent({ ...data.content, about: { ...c, features: c.features.filter((_, i) => i !== idx) } })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Про салон</h2>
          <p className="text-sm text-neutral-500">Редагуйте сторінку "Про нас"</p>
        </div>
      </div>

      {/* Story */}
      <SectionCard title="Історія салону" index={1}>
        <TextEditor label="Мітка" value={c.story.label} onChange={(v) => setStory('label', v)} />
        <TextEditor label="Заголовок" value={c.story.heading} onChange={(v) => setStory('heading', v)} />
        <TextAreaEditor label="Абзац 1" value={c.story.paragraphs[0] || ''} onChange={(v) => { const p = [...c.story.paragraphs]; p[0] = v; setStory('paragraphs', p) }} rows={3} />
        <TextAreaEditor label="Абзац 2" value={c.story.paragraphs[1] || ''} onChange={(v) => { const p = [...c.story.paragraphs]; p[1] = v; setStory('paragraphs', p) }} rows={3} />
        <TextAreaEditor label="Абзац 3" value={c.story.paragraphs[2] || ''} onChange={(v) => { const p = [...c.story.paragraphs]; p[2] = v; setStory('paragraphs', p) }} rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Статистика: число" value={c.story.statNumber} onChange={(v) => setStory('statNumber', v)} />
          <TextEditor label="Статистика: підпис" value={c.story.statLabel} onChange={(v) => setStory('statLabel', v)} />
        </div>
        <ImageUpload label="Фото" value={c.story.image} onChange={(v) => setStory('image', v)} />
      </SectionCard>

      {/* Values */}
      <SectionCard title="Цінності" index={2}>
        {c.values.map((v, i) => (
          <div key={i} className="bg-neutral-50 rounded-xl p-4 space-y-2.5 border border-neutral-100/50 relative group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">#{i + 1}</span>
              <button onClick={() => removeValue(i)} disabled={c.values.length <= 1} className="p-1 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <TextEditor label="Заголовок" value={v.title} onChange={(val) => updateValue(i, 'title', val)} />
            <TextAreaEditor label="Опис" value={v.description} onChange={(val) => updateValue(i, 'description', val)} rows={2} />
          </div>
        ))}
        <button onClick={addValue} className="flex items-center gap-2 text-sm text-champagne hover:text-gold font-medium transition-colors">
          <Plus className="w-4 h-4" /> Додати цінність
        </button>
      </SectionCard>

      {/* Timeline */}
      <SectionCard title="Етапи розвитку" index={3}>
        {c.timeline.map((t, i) => (
          <div key={i} className="bg-neutral-50 rounded-xl p-4 border border-neutral-100/50 relative group">
            <button onClick={() => removeTimeline(i)} disabled={c.timeline.length <= 1} className="absolute top-2 right-2 p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TextEditor label="Рік" value={t.year} onChange={(v) => updateTimeline(i, 'year', v)} />
              <TextEditor label="Назва" value={t.title} onChange={(v) => updateTimeline(i, 'title', v)} />
              <TextEditor label="Опис" value={t.description} onChange={(v) => updateTimeline(i, 'description', v)} />
            </div>
          </div>
        ))}
        <button onClick={addTimeline} className="flex items-center gap-2 text-sm text-champagne hover:text-gold font-medium transition-colors">
          <Plus className="w-4 h-4" /> Додати етап
        </button>
      </SectionCard>

      {/* Features */}
      <SectionCard title="Переваги (картки з фото)" index={4}>
        {c.features.map((f, i) => (
          <div key={i} className="bg-neutral-50 rounded-xl p-4 space-y-2.5 border border-neutral-100/50 relative group">
            <button onClick={() => removeFeature(i)} disabled={c.features.length <= 1} className="absolute top-2 right-2 p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-medium text-neutral-400">Картка #{i + 1}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextEditor label="Заголовок" value={f.title} onChange={(v) => updateFeature(i, 'title', v)} />
              <ImageUpload label="Фото" value={f.image} onChange={(v) => updateFeature(i, 'image', v)} />
            </div>
            <TextAreaEditor label="Опис" value={f.description} onChange={(v) => updateFeature(i, 'description', v)} rows={2} />
          </div>
        ))}
        <button onClick={addFeature} className="flex items-center gap-2 text-sm text-champagne hover:text-gold font-medium transition-colors">
          <Plus className="w-4 h-4" /> Додати картку переваги
        </button>
      </SectionCard>

      {/* CTA */}
      <SectionCard title="Блок заклику" index={5}>
        <TextEditor label="Заголовок" value={c.cta.heading} onChange={(v) => setCta('heading', v)} />
        <TextAreaEditor label="Текст" value={c.cta.text} onChange={(v) => setCta('text', v)} rows={2} />
        <TextEditor label="Текст кнопки" value={c.cta.ctaText} onChange={(v) => setCta('ctaText', v)} />
      </SectionCard>

      {/* Page hero & section headings */}
      <SectionCard title="Hero та заголовки сторінки" index={6}>
        <TextEditor label="Hero: мітка" value={data.content.pages.about.eyebrow} onChange={(v) => setPage('eyebrow', v)} />
        <TextEditor label="Hero: заголовок" value={data.content.pages.about.title} onChange={(v) => setPage('title', v)} />
        <TextAreaEditor label="Hero: підзаголовок" value={data.content.pages.about.subtitle} onChange={(v) => setPage('subtitle', v)} rows={2} />
        <TextEditor label="Hero: фон" value={data.content.pages.about.image} onChange={(v) => setPage('image', v)} />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <TextEditor label="Заголовок секції «Історія»" value={data.content.pages.about.storyHeading} onChange={(v) => setPage('storyHeading', v)} />
          <TextEditor label="Заголовок секції «Цінності»" value={data.content.pages.about.valuesHeading} onChange={(v) => setPage('valuesHeading', v)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Заголовок секції «Етапи»" value={data.content.pages.about.timelineHeading} onChange={(v) => setPage('timelineHeading', v)} />
          <TextEditor label="Заголовок секції «Переваги»" value={data.content.pages.about.featuresHeading} onChange={(v) => setPage('featuresHeading', v)} />
        </div>
      </SectionCard>
    </motion.div>
  )
}
