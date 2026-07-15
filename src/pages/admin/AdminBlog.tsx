import { useData } from '../../context/DataContext'
import { TextEditor, TextAreaEditor } from './AdminFormFields'
import { motion } from 'framer-motion'

export function AdminBlog() {
  const { data, updateBlog } = useData()
  const posts = data.blog

  const updatePost = (idx: number, field: string, value: string) => {
    const next = posts.map((p, i) => i !== idx ? p : { ...p, [field]: value })
    updateBlog(next)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">Блог</h2>
      {posts.map((p, i) => (
        <div key={p.id} className="bg-white rounded-xl p-5 space-y-3 shadow-sm border border-neutral-100">
          <TextEditor label="Заголовок" value={p.title} onChange={(v) => updatePost(i, 'title', v)} />
          <TextEditor label="URL (slug)" value={p.slug} onChange={(v) => updatePost(i, 'slug', v)} />
          <TextEditor label="Категорія" value={p.category} onChange={(v) => updatePost(i, 'category', v)} />
          <TextAreaEditor label="Короткий опис" value={p.excerpt} onChange={(v) => updatePost(i, 'excerpt', v)} />
          <TextAreaEditor label="Повний текст" value={p.content} onChange={(v) => updatePost(i, 'content', v)} />
          <TextEditor label="Зображення URL" value={p.image} onChange={(v) => updatePost(i, 'image', v)} />
        </div>
      ))}
    </motion.div>
  )
}
