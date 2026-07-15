import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor, SectionCard } from './AdminFormFields'
import { motion } from 'framer-motion'
import { FileText, Link as LinkIcon } from 'lucide-react'

export function AdminBlog() {
  const { data, updateBlog } = useData()
  const posts = data.blog

  const updatePost = (idx: number, field: string, value: string) => {
    const next = posts.map((p, i) => i !== idx ? p : { ...p, [field]: value })
    updateBlog(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Блог</h2>
          <p className="text-sm text-neutral-500">Статті та публікації салону</p>
        </div>
        <div className="text-xs text-neutral-400 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
          {posts.length} статей
        </div>
      </div>

      {posts.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <SectionCard title={p.title} subtitle={p.category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextEditor label="Заголовок" value={p.title} onChange={(v) => updatePost(i, 'title', v)} icon={<FileText className="w-3.5 h-3.5" />} />
              <TextEditor label="URL (slug)" value={p.slug} onChange={(v) => updatePost(i, 'slug', v)} icon={<LinkIcon className="w-3.5 h-3.5" />} />
            </div>
            <TextEditor label="Категорія" value={p.category} onChange={(v) => updatePost(i, 'category', v)} />
            <TextAreaEditor label="Короткий опис" value={p.excerpt} onChange={(v) => updatePost(i, 'excerpt', v)} rows={2} />
            <TextAreaEditor label="Повний текст" value={p.content} onChange={(v) => updatePost(i, 'content', v)} rows={6} />
            <div className="grid grid-cols-2 gap-3">
              <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePost(i, 'image', v)} />
              <TextEditor label="Дата" value={p.date} onChange={(v) => updatePost(i, 'date', v)} hint="YYYY-MM-DD" />
            </div>
          </SectionCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
