import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

const REPO = 'porustzi/salonkrasoti'
const RAW = 'https://raw.githubusercontent.com'

const DataContext = createContext(null)

function getToken() { return sessionStorage.getItem('github_token') }
function ghHeaders() { return { Authorization: 'token ' + getToken(), Accept: 'application/vnd.github.v3+json' } }

export function DataProvider({ children }) {
  const [data, setData] = useState({ services: [], gallery: [], team: [], reviews: [], content: {} })

  const load = useCallback(async () => {
    try {
      const files = ['general', 'services', 'gallery', 'team', 'reviews']
      const results = await Promise.all(files.map(f =>
        fetch(RAW + '/' + REPO + '/main/content/' + f + '.json').then(r => r.json()).catch(() => ({}))
      ))
      setData({
        content: results[0] || {},
        services: (results[1] && results[1].categories) ? results[1].categories : [],
        gallery: (results[2] && results[2].images) ? results[2].images : [],
        team: (results[3] && results[3].members) ? results[3].members : [],
        reviews: (results[4] && results[4].reviews) ? results[4].reviews : [],
      })
    } catch (err) { console.error(err) }
  }, [])

  const ghWrite = useCallback(async (path, content, msg) => {
    const token = getToken()
    if (!token) return
    try {
      const text = typeof content === 'string' ? content : JSON.stringify(content)
      const encoded = btoa(unescape(encodeURIComponent(text)))
      const shaRes = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + path, { headers: ghHeaders() })
      const shaData = await shaRes.json()
      const payload = { message: msg || 'Update ' + path, content: encoded, branch: 'main' }
      if (shaData.sha) payload.sha = shaData.sha
      await fetch('https://api.github.com/repos/' + REPO + '/contents/' + path, { method: 'PUT', headers: { ...ghHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } catch (err) { console.error(err) }
  }, [])

  const updateServices = useCallback((v) => { setData(p => ({ ...p, services: v })); ghWrite('content/services.json', { categories: v }, 'Update services') }, [ghWrite])
  const updateGallery  = useCallback((v) => { setData(p => ({ ...p, gallery: v })); ghWrite('content/gallery.json', { images: v }, 'Update gallery') }, [ghWrite])
  const updateTeam     = useCallback((v) => { setData(p => ({ ...p, team: v })); ghWrite('content/team.json', { members: v }, 'Update team') }, [ghWrite])
  const updateReviews  = useCallback((v) => { setData(p => ({ ...p, reviews: v })); ghWrite('content/reviews.json', { reviews: v }, 'Update reviews') }, [ghWrite])
  const updateContent  = useCallback((v) => { setData(p => ({ ...p, content: v })); ghWrite('content/general.json', v, 'Update general') }, [ghWrite])

  useEffect(() => { load() }, [load])

  return React.createElement(DataContext.Provider, { value: { data, load, updateServices, updateGallery, updateTeam, updateReviews, updateContent } }, children)
}

export function useData() { const ctx = useContext(DataContext); if (!ctx) throw new Error('useData'); return ctx }
