import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save } from 'lucide-react'

const REPO = 'porustzi/salonkrasoti'
const RAW = 'https://raw.githubusercontent.com'

const TABS = [
  { id: 'general', label: 'Загальна інформація' },
  { id: 'services', label: 'Послуги' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'team', label: 'Команда' },
  { id: 'reviews', label: 'Відгуки' },
]

export function AdminEditor() {
  const [tab, setTab] = useState('general')
  const [data, setData] = useState(null)
  const [edit, setEdit] = useState(null)
  const [mode, setMode] = useState('view')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(RAW + '/' + REPO + '/main/content/' + tab + '.json')
      .then(r => r.json())
      .then(d => { setData(d); setEdit(d) })
      .catch(() => { setData({}); setEdit({}) })
  }, [tab])

  const save = async () => {
    setSaving(true)
    try {
      const content = JSON.stringify(edit, null, 2)
      const encoded = btoa(unescape(encodeURIComponent(content)))
      const shaRes = await fetch('https://api.github.com/repos/' + REPO + '/contents/content/' + tab + '.json', {
        headers: { Authorization: 'token ' + sessionStorage.getItem('github_token'), Accept: 'application/vnd.github.v3+json' }
      })
      const shaData = await shaRes.json()
      const payload = { message: 'Update ' + tab, content: encoded, branch: 'main' }
      if (shaData.sha) payload.sha = shaData.sha
      await fetch('https://api.github.com/repos/' + REPO + '/contents/content/' + tab + '.json', {
        method: 'PUT',
        headers: { Authorization: 'token ' + sessionStorage.getItem('github_token'), Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      setData(edit)
      setMode('view')
      alert('Saved!')
    } catch { alert('Error') }
    setSaving(false)
  }

  if (!data) return null

  const views = {
    general: () => {
      const b = data.business || {}
      return <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h2 className="text-2xl font-bold">{b.name}</h2>
        <p className="text-neutral-600">{b.tagline}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Address:</strong> {b.address}</div>
          <div><strong>Phone:</strong> {b.phone}</div>
          <div><strong>Email:</strong> {b.email}</div>
          <div><strong>Instagram:</strong> {b.instagram}</div>
        </div>
      </div>
    },
    services: () => (data.categories || []).map((cat, i) => <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
      <h3 className="font-bold text-lg mb-3">{cat.name}</h3>
      {cat.services.map((svc, j) => <div key={j} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
        <div className="font-medium">{svc.name}</div>
        <div className="text-right"><div className="font-bold">{svc.price} uah</div><div className="text-xs text-neutral-400">{svc.duration} min</div></div>
      </div>)}
    </div>),
    gallery: () => <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {(data.images || []).map((img, i) => <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <img src={img.url} alt={img.caption} className="w-full h-48 object-cover" />
        <div className="p-3 text-sm text-neutral-600">{img.caption}</div>
      </div>)}
    </div>,
    team: () => (data.members || []).map((m, i) => <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-2xl">{m.name ? m.name[0] : '?'}</div>
      <div><div className="font-bold">{m.name}</div><div className="text-sm text-neutral-500">{m.position} - {m.experience} years</div></div>
    </div>),
    reviews: () => (data.reviews || []).map((r, i) => <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">{r.name}</span>
        <div className="text-amber-400">{Array(r.rating).fill('★').join('')}{Array(5 - r.rating).fill('☆').join('')}</div>
      </div>
      <p className="text-neutral-600">{r.text}</p>
      <div className="text-xs text-neutral-400 mt-2">{r.date}</div>
    </div>)
  }

  const edits = {
    general: () => {
      const b = edit.business || {}
      const up = (k, v) => setEdit({ ...edit, business: { ...b, [k]: v } })
      return <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        {['name', 'tagline', 'address', 'phone', 'email', 'instagram'].map(k =>
          <input key={k} value={b[k] || ''} onChange={e => up(k, e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-xl" placeholder={k} />
        )}
      </div>
    },
    services: () => {
      const cats = edit.categories || []
      return cats.map((cat, ci) => <div key={ci} className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
        <input value={cat.name} onChange={e => { const c = [...cats]; c[ci].name = e.target.value; setEdit({ ...edit, categories: c }) }} className="font-bold text-lg px-3 py-2 border border-neutral-200 rounded-lg mb-3 w-full" />
        {cat.services.map((svc, si) => <div key={si} className="bg-neutral-50 rounded-xl p-4 mb-3 space-y-2">
          <input value={svc.name} onChange={e => { const c = [...cats]; c[ci].services[si].name = e.target.value; setEdit({ ...edit, categories: c }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Name" />
          <div className="grid grid-cols-2 gap-2">
            <input type="number" value={svc.price} onChange={e => { const c = [...cats]; c[ci].services[si].price = Number(e.target.value); setEdit({ ...edit, categories: c }) }} className="px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Price" />
            <input type="number" value={svc.duration} onChange={e => { const c = [...cats]; c[ci].services[si].duration = Number(e.target.value); setEdit({ ...edit, categories: c }) }} className="px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Duration" />
          </div>
          <button onClick={() => { const c = [...cats]; c[ci].services.splice(si, 1); setEdit({ ...edit, categories: c }) }} className="text-red-400 text-xs">X Delete</button>
        </div>)}
        <button onClick={() => { const c = [...cats]; c[ci].services.push({ id: Date.now().toString(), name: '', price: 0, duration: 0 }); setEdit({ ...edit, categories: c }) }} className="text-rose-500 text-sm">+ Add service</button>
      </div>)
    },
    gallery: () => {
      const imgs = edit.images || []
      return <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((img, i) => <div key={i} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <img src={img.url || 'https://via.placeholder.com/300'} alt="" className="w-full h-48 object-cover" />
            <div className="p-3 space-y-2">
              <input value={img.url || ''} onChange={e => { const l = [...imgs]; l[i].url = e.target.value; setEdit({ ...edit, images: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm" placeholder="URL" />
              <input value={img.caption || ''} onChange={e => { const l = [...imgs]; l[i].caption = e.target.value; setEdit({ ...edit, images: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm" placeholder="Caption" />
              <button onClick={() => { const l = [...imgs]; l.splice(i, 1); setEdit({ ...edit, images: l }) }} className="text-red-400 text-xs">X Delete</button>
            </div>
          </div>)}
        </div>
        <button onClick={() => { const l = [...imgs]; l.push({ id: Date.now().toString(), url: '', caption: '', order: l.length + 1 }); setEdit({ ...edit, images: l }) }} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm">+ Add</button>
      </div>
    },
    team: () => {
      const mem = edit.members || []
      return <div className="space-y-4">
        {mem.map((m, i) => <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-2xl">{m.name ? m.name[0] : '?'}</div>
          <div className="flex-1 space-y-2">
            <input value={m.name || ''} onChange={e => { const l = [...mem]; l[i].name = e.target.value; setEdit({ ...edit, members: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Name" />
            <input value={m.position || ''} onChange={e => { const l = [...mem]; l[i].position = e.target.value; setEdit({ ...edit, members: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Position" />
            <input type="number" value={m.experience || 0} onChange={e => { const l = [...mem]; l[i].experience = Number(e.target.value); setEdit({ ...edit, members: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Experience" />
            <button onClick={() => { const l = [...mem]; l.splice(i, 1); setEdit({ ...edit, members: l }) }} className="text-red-400 text-xs">X Delete</button>
          </div>
        </div>)}
        <button onClick={() => { const l = [...mem]; l.push({ id: Date.now().toString(), name: '', position: '', experience: 0 }); setEdit({ ...edit, members: l }) }} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm">+ Add</button>
      </div>
    },
    reviews: () => {
      const rev = edit.reviews || []
      return <div className="space-y-4">
        {rev.map((r, i) => <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-3">
          <input value={r.name || ''} onChange={e => { const l = [...rev]; l[i].name = e.target.value; setEdit({ ...edit, reviews: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" placeholder="Name" />
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map(s => <button key={s} onClick={() => { const l = [...rev]; l[i].rating = s; setEdit({ ...edit, reviews: l }) }} className="text-2xl" style={{ color: s <= (r.rating || 5) ? '#f59e0b' : '#e5e5e5' }}>{s <= (r.rating || 5) ? '★' : '☆'}</button>)}</div>
          <textarea value={r.text || ''} onChange={e => { const l = [...rev]; l[i].text = e.target.value; setEdit({ ...edit, reviews: l }) }} className="w-full px-3 py-2 border border-neutral-200 rounded-lg" rows={3} placeholder="Review" />
          <input type="date" value={r.date || ''} onChange={e => { const l = [...rev]; l[i].date = e.target.value; setEdit({ ...edit, reviews: l }) }} className="px-3 py-2 border border-neutral-200 rounded-lg" />
          <button onClick={() => { const l = [...rev]; l.splice(i, 1); setEdit({ ...edit, reviews: l }) }} className="text-red-400 text-xs">X Delete</button>
        </div>)}
        <button onClick={() => { const l = [...rev]; l.push({ id: Date.now().toString(), name: '', rating: 5, text: '', date: new Date().toISOString().split('T')[0] }); setEdit({ ...edit, reviews: l }) }} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm">+ Add</button>
      </div>
    }
  }

  return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
    <div className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-neutral-100 rounded-lg">&larr; Back</button>
          <div className="flex gap-1">
            {TABS.map(t => <button key={t.id} onClick={() => { setTab(t.id); setMode('view') }} className={tab === t.id ? 'px-4 py-2 rounded-lg text-sm bg-neutral-900 text-white' : 'px-4 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100'}>{t.label}</button>)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {mode === 'edit' ? <>
            <button onClick={() => { setEdit(data); setMode('view') }} className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
            <button onClick={save} className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm flex items-center gap-2">{saving ? '...' : <><Save className="w-4 h-4" />Save</>}</button>
          </> : <button onClick={() => setMode('edit')} className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm">Edit</button>}
        </div>
      </div>
    </div>
    <div className="p-6 max-w-6xl mx-auto">
      {data ? (mode === 'edit' ? edits[tab]() : views[tab]()) : <div className="text-center text-neutral-400 py-20">Loading...</div>}
    </div>
  </div>
}
