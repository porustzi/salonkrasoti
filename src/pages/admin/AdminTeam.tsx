import { useData } from '../../context/DataContext'
import { TextEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminTeam() {
  const { data, updateTeam } = useData()
  const members = data.team

  const updateMember = (idx: number, field: string, value: string) => {
    const next = members.map((m, i) => i !== idx ? m : { ...m, [field]: value })
    updateTeam(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Команда</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((m, i) => (
          <div key={m.id} className="bg-white rounded-xl p-5 space-y-3 shadow-sm border border-neutral-100">
            <TextEditor label="Ім'я" value={m.name} onChange={(v) => updateMember(i, 'name', v)} />
            <TextEditor label="Посада" value={m.position} onChange={(v) => updateMember(i, 'position', v)} />
            <TextEditor label="Досвід" value={m.experience} onChange={(v) => updateMember(i, 'experience', v)} />
            <TextEditor label="Instagram" value={m.instagram} onChange={(v) => updateMember(i, 'instagram', v)} />
            <TextEditor label="Фото URL" value={m.image} onChange={(v) => updateMember(i, 'image', v)} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
