import { motion } from 'framer-motion'
import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { BUSINESS_INFO } from '../../config/constants'
import { MapPin, Smartphone, Mail, Clock, Globe } from 'lucide-react'

export function AdminContacts() {
  const { data, updateContent } = useData()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-semibold text-neutral-900">Контакти</h2>
          <p className="text-sm text-neutral-500">Контактна інформація салону</p>
        </div>
      </div>

      <div className="bg-champagne/5 border border-champagne/20 rounded-2xl p-5 text-sm text-neutral-600">
        Дані зберігаються в <code className="text-champagne font-mono text-xs">src/config/constants.ts</code>.
        Для зміни телефону, email, Instagram або годин роботи — редагуйте файл constants.ts.
      </div>

      <SectionCard title="Телефон">
        <div className="flex items-center gap-3 text-neutral-700">
          <Smartphone className="w-4 h-4 text-champagne" />
          {BUSINESS_INFO.phone}
        </div>
      </SectionCard>

      <SectionCard title="Email">
        <div className="flex items-center gap-3 text-neutral-700">
          <Mail className="w-4 h-4 text-champagne" />
          {BUSINESS_INFO.email}
        </div>
      </SectionCard>

      <SectionCard title="Адреса">
        <div className="flex items-center gap-3 text-neutral-700">
          <MapPin className="w-4 h-4 text-champagne" />
          {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.location}
        </div>
      </SectionCard>

      <SectionCard title="Години роботи">
        <div className="flex items-center gap-3 text-neutral-700 mb-3">
          <Clock className="w-4 h-4 text-champagne" />
          Щодня 10:00 – 21:00
        </div>
        <div className="text-xs text-neutral-400 space-y-1">
          {BUSINESS_INFO.workingHours.map((wh) => (
            <div key={wh.day} className="flex gap-4">
              <span className="w-24">{wh.day}</span>
              <span>{wh.hours}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Instagram">
        <div className="flex items-center gap-3 text-neutral-700">
          <Globe className="w-4 h-4 text-champagne" />
          <a href={BUSINESS_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-champagne hover:underline">
            {BUSINESS_INFO.instagram}
          </a>
        </div>
      </SectionCard>
    </motion.div>
  )
}
