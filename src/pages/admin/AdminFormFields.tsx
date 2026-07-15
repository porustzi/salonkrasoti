import { motion } from 'framer-motion'

export function TextEditor({
  label,
  value,
  onChange,
  placeholder,
  hint,
  icon,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-champagne">{icon}</span>}
        <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</label>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:border-champagne/40 focus:ring-2 focus:ring-champagne/10 outline-none transition-all hover:border-neutral-300"
      />
      {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  )
}

export function TextAreaEditor({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:border-champagne/40 focus:ring-2 focus:ring-champagne/10 outline-none transition-all hover:border-neutral-300 resize-y"
      />
    </div>
  )
}

export function SectionCard({
  title,
  subtitle,
  children,
  index,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-neutral-50 flex items-center gap-3">
        {index !== undefined && (
          <span className="w-7 h-7 rounded-lg bg-champagne/10 text-champagne text-xs font-semibold flex items-center justify-center flex-shrink-0">
            {index}
          </span>
        )}
        <div>
          <h3 className="text-sm font-heading font-semibold text-neutral-900">{title}</h3>
          {subtitle && <p className="text-[11px] text-neutral-400">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {children}
      </div>
    </motion.div>
  )
}

export function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
        {icon}
      </div>
      <h3 className="text-sm font-heading font-semibold text-neutral-700 mb-1">{title}</h3>
      <p className="text-xs text-neutral-400 max-w-xs">{description}</p>
    </div>
  )
}
