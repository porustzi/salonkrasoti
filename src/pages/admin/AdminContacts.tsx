import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard, ImageUpload } from './AdminFormFields'
import { MapPin, Smartphone, Mail, Clock, Globe } from 'lucide-react'

export function AdminContacts() {
  const { data, updateContent } = useData()
  const c = data.content.businessInfo

  const setField = (field: string, value: string) => {
    updateContent({ ...data.content, businessInfo: { ...c, [field]: value } })
  }
  const setPageFor = (page: string, field: string, value: string) => {
    updateContent({ ...data.content, pages: { ...data.content.pages, [page]: { ...(data.content.pages as any)[page], [field]: value } } })
  }
  const setPage = (field: string, value: string) => setPageFor('contacts', field, value)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Контакти</h2>
          <p className="text-sm text-neutral-500">Контактна інформація салону</p>
        </div>
      </div>

      <SectionCard title="Основне" index={1}>
        <TextEditor label="Назва салону" value={c.name} onChange={(v) => setField('name', v)} />
        <TextEditor label="Слоган (tagline)" value={c.tagline} onChange={(v) => setField('tagline', v)} />
        <TextEditor label="Номер телефону" value={c.phone} onChange={(v) => setField('phone', v)} icon={<Smartphone className="w-3.5 h-3.5" />} />
        <TextEditor label="Посилання для запису (booking)" value={c.bookingUrl} onChange={(v) => setField('bookingUrl', v)} hint="BeautyPro або інше" />
      </SectionCard>

      <SectionCard title="Email" index={2}>
        <TextEditor label="Електронна пошта" value={c.email} onChange={(v) => setField('email', v)} icon={<Mail className="w-3.5 h-3.5" />} />
      </SectionCard>

      <SectionCard title="Адреса" index={3}>
        <TextEditor label="Вулиця, будинок" value={c.address} onChange={(v) => setField('address', v)} icon={<MapPin className="w-3.5 h-3.5" />} />
        <div className="grid grid-cols-2 gap-3">
          <TextEditor label="Місто" value={c.city} onChange={(v) => setField('city', v)} />
          <TextEditor label="Локація (ТЦ, поверх)" value={c.location} onChange={(v) => setField('location', v)} />
        </div>
        <TextEditor label="Google Maps URL" value={c.googleMapsUrl} onChange={(v) => setField('googleMapsUrl', v)} hint="Посилання на карту" />
      </SectionCard>

      <SectionCard title="Години роботи" index={4}>
        <TextEditor label="Графік роботи" value={c.workingHours} onChange={(v) => setField('workingHours', v)} icon={<Clock className="w-3.5 h-3.5" />} hint="Наприклад: 10:00 – 21:00 щодня" />
      </SectionCard>

      <SectionCard title="Instagram" index={5}>
        <TextEditor label="Посилання на Instagram" value={c.instagram} onChange={(v) => setField('instagram', v)} icon={<Globe className="w-3.5 h-3.5" />} />
        <TextEditor label="Нік (наприклад @maysternya_krasy1)" value={c.instagramUsername} onChange={(v) => setField('instagramUsername', v)} />
      </SectionCard>

      <SectionCard title="Рейтинг Google" index={6}>
        <div className="grid grid-cols-3 gap-3">
          <TextEditor label="Рейтинг (напр. 4.4)" value={c.googleRating} onChange={(v) => setField('googleRating', v)} />
          <TextEditor label="Кількість відгуків" value={c.reviewCount} onChange={(v) => setField('reviewCount', v)} />
          <TextEditor label="% рекомендують" value={c.recommendPercent} onChange={(v) => setField('recommendPercent', v)} />
        </div>
      </SectionCard>

      <SectionCard title="Часті питання (FAQ)" index={7}>
        {data.content.faq.map((item, i) => (
          <div key={i} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 mb-3 space-y-2">
            <TextEditor label="Питання" value={item.question} onChange={(v) => {
              const next = data.content.faq.map((f, j) => j !== i ? f : { ...f, question: v })
              updateContent({ ...data.content, faq: next })
            }} />
            <TextEditor label="Відповідь" value={item.answer} onChange={(v) => {
              const next = data.content.faq.map((f, j) => j !== i ? f : { ...f, answer: v })
              updateContent({ ...data.content, faq: next })
            }} />
            <button
              onClick={() => updateContent({ ...data.content, faq: data.content.faq.filter((_, j) => j !== i) })}
              className="text-xs text-red-400 hover:text-red-500"
            >Видалити питання</button>
          </div>
        ))}
        <button
          onClick={() => updateContent({ ...data.content, faq: [...data.content.faq, { question: '', answer: '' }] })}
          className="w-full px-4 py-2.5 border border-dashed border-neutral-300 rounded-xl text-sm text-neutral-600 hover:border-neutral-400 transition-colors"
        >+ Додати питання</button>
      </SectionCard>

      <SectionCard title="Сторінка «Контакти»" index={8}>
        <TextEditor label="Hero: мітка" value={data.content.pages.contacts.eyebrow} onChange={(v) => setPage('eyebrow', v)} />
        <TextEditor label="Hero: заголовок" value={data.content.pages.contacts.title} onChange={(v) => setPage('title', v)} />
        <TextAreaEditor label="Hero: підзаголовок" value={data.content.pages.contacts.subtitle} onChange={(v) => setPage('subtitle', v)} rows={2} />
        <TextEditor label="Заголовок FAQ-секції" value={data.content.pages.contacts.faqHeading} onChange={(v) => setPage('faqHeading', v)} />
        <ImageUpload label="Hero: фонове зображення" value={data.content.pages.contacts.image} onChange={(v) => setPage('image', v)} />
      </SectionCard>

      <SectionCard title="Сторінка «Онлайн запис»" index={9}>
        <TextEditor label="Hero: мітка" value={data.content.pages.book.eyebrow} onChange={(v) => setPageFor('book', 'eyebrow', v)} />
        <TextEditor label="Hero: заголовок" value={data.content.pages.book.title} onChange={(v) => setPageFor('book', 'title', v)} />
        <TextAreaEditor label="Hero: підзаголовок" value={data.content.pages.book.subtitle} onChange={(v) => setPageFor('book', 'subtitle', v)} rows={2} />
        <ImageUpload label="Hero: фонове зображення" value={data.content.pages.book.image} onChange={(v) => setPageFor('book', 'image', v)} />
      </SectionCard>
    </motion.div>
  )
}
