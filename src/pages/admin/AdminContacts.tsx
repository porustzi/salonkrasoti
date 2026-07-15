import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { TextEditor, SectionCard } from './AdminFormFields'
import { MapPin, Smartphone, Mail, Clock, Globe } from 'lucide-react'

export function AdminContacts() {
  const { data, updateContent } = useData()
  const c = data.content.businessInfo

  const setField = (field: string, value: string) => {
    updateContent({ ...data.content, businessInfo: { ...c, [field]: value } })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Контакти</h2>
          <p className="text-sm text-neutral-500">Контактна інформація салону</p>
        </div>
      </div>

      <SectionCard title="Телефон" index={1}>
        <TextEditor label="Номер телефону" value={c.phone} onChange={(v) => setField('phone', v)} icon={<Smartphone className="w-3.5 h-3.5" />} />
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
      </SectionCard>
    </motion.div>
  )
}
