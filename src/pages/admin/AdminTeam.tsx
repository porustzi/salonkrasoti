import { useData } from '../../context/DataContext'
import { TextEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

export function AdminTeam() {
  const { data, updateTeam } = useData()
  const members = data.team

  const updateMember = (idx: number, field: string, value: string) => {
    const next = members.map((m, i) => i !== idx ? m : { ...m, [field]: value })
    updateTeam(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Команда</h2>
          <p className="text-sm text-neutral-500">Майстри та співробітники салону</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
          {members.length} майстрів
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SectionCard title={m.name} subtitle={m.position}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2.5">
                  <TextEditor label="Ім'я" value={m.name} onChange={(v) => updateMember(i, 'name', v)} />
                  <TextEditor label="Посада" value={m.position} onChange={(v) => updateMember(i, 'position', v)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TextEditor label="Досвід" value={m.experience} onChange={(v) => updateMember(i, 'experience', v)} />
                <TextEditor label="Instagram" value={m.instagram} onChange={(v) => updateMember(i, 'instagram', v)} />
              </div>
              <TextEditor label="Фото URL" value={m.image} onChange={(v) => updateMember(i, 'image', v)} />
            </SectionCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
