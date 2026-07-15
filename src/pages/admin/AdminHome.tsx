import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { Image, Type, Plus, Trash2 } from 'lucide-react'

export function AdminHome() {
  const { data, updateContent } = useData()
  const c = data.content.home

  const setHero = (field: string, value: string) => {
    updateContent({ ...data.content, home: { ...data.content.home, hero: { ...c.hero, [field]: value } } })
  }

  const setAbout = (field: string, value: string | string[]) => {
    updateContent({ ...data.content, home: { ...data.content.home, aboutPreview: { ...c.aboutPreview, [field]: value } } })
  }

  const setCta = (field: string, value: string) => {
    updateContent({ ...data.content, home: { ...data.content.home, cta: { ...c.cta, [field]: value } } })
  }

  const updateFeature = (idx: number, value: string) => {
    const features = [...c.aboutPreview.features]
    features[idx] = value
    setAbout('features', features)
  }

  const addFeature = () => {
    setAbout('features', [...c.aboutPreview.features, ''])
  }

  const removeFeature = (idx: number) => {
    if (c.aboutPreview.features.length <= 1) return
    setAbout('features', c.aboutPreview.features.filter((_, i) => i !== idx))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Головна сторінка</h2>
          <p className="text-sm text-neutral-500">Редагуйте текст та зображення головної сторінки</p>
        </div>
      </div>

      {/* Hero Section */}
      <SectionCard title="Hero — шапка сайту" index={1}>
        <TextEditor label="Верхній напис (eyebrow)" value={c.hero.eyebrow} onChange={(v) => setHero('eyebrow', v)} icon={<Type className="w-3 h-3" />} />
        <TextEditor label="Заголовок (назва салону)" value={c.hero.title} onChange={(v) => setHero('title', v)} icon={<Type className="w-3 h-3" />} />
        <TextAreaEditor label="Текст під заголовком" value={c.hero.tagline} onChange={(v) => setHero('tagline', v)} rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Текст кнопки 1" value={c.hero.ctaText} onChange={(v) => setHero('ctaText', v)} />
          <TextEditor label="Текст кнопки 2" value={c.hero.secondaryCtaText} onChange={(v) => setHero('secondaryCtaText', v)} />
        </div>
        <TextEditor label="URL зображення фону" value={c.hero.backgroundImage} onChange={(v) => setHero('backgroundImage', v)} icon={<Image className="w-3 h-3" />} />
      </SectionCard>

      {/* About Preview */}
      <SectionCard title="Блок «Про нас»" index={2}>
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Мітка" value={c.aboutPreview.label} onChange={(v) => setAbout('label', v)} />
          <TextEditor label="Заголовок" value={c.aboutPreview.heading} onChange={(v) => setAbout('heading', v)} />
        </div>
        <TextAreaEditor label="Текст" value={c.aboutPreview.text} onChange={(v) => setAbout('text', v)} rows={3} />
        <div className="space-y-2">
          <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">Переваги (список)</label>
          {c.aboutPreview.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" value={f} onChange={(e) => updateFeature(i, e.target.value)} className="flex-1 px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:border-champagne/40 focus:ring-2 focus:ring-champagne/10 outline-none" />
              <button onClick={() => removeFeature(i)} disabled={c.aboutPreview.features.length <= 1} className="p-1.5 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button onClick={addFeature} className="flex items-center gap-2 text-sm text-champagne hover:text-gold font-medium transition-colors">
            <Plus className="w-4 h-4" /> Додати пункт
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Статистика: число" value={c.aboutPreview.statNumber} onChange={(v) => setAbout('statNumber', v)} />
          <TextEditor label="Статистика: підпис" value={c.aboutPreview.statLabel} onChange={(v) => setAbout('statLabel', v)} />
        </div>
        <TextEditor label="Фото" value={c.aboutPreview.image} onChange={(v) => setAbout('image', v)} icon={<Image className="w-3 h-3" />} />
      </SectionCard>

      {/* CTA */}
      <SectionCard title="Блок заклику до дії" index={3}>
        <TextEditor label="Заголовок" value={c.cta.heading} onChange={(v) => setCta('heading', v)} />
        <TextAreaEditor label="Текст" value={c.cta.text} onChange={(v) => setCta('text', v)} rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Текст кнопки" value={c.cta.ctaText} onChange={(v) => setCta('ctaText', v)} />
          <TextEditor label="Текст кнопки 2" value={c.cta.secondaryCtaText} onChange={(v) => setCta('secondaryCtaText', v)} />
        </div>
      </SectionCard>
    </motion.div>
  )
}
