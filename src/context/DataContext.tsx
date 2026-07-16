import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { writeContent, readContent } from '../lib/github'
import {
  serviceCategories as defaultServices,
  galleryImages as defaultGallery,
  teamMembers as defaultTeam,
} from '../data/services'
import { reviews as defaultReviews } from '../data/services'
import { SiteContent, defaultSiteContent } from '../data/siteContent'

export type SyncStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error'

interface SiteData {
  services: typeof defaultServices
  gallery: typeof defaultGallery
  team: typeof defaultTeam
  reviews: typeof defaultReviews
  content: SiteContent
}

interface DataContextType {
  data: SiteData
  syncStatus: SyncStatus
  dirty: boolean
  updateServices: (services: SiteData['services']) => void
  updateGallery: (gallery: SiteData['gallery']) => void
  updateTeam: (team: SiteData['team']) => void
  updateReviews: (reviews: SiteData['reviews']) => void
  updateContent: (content: SiteContent) => void
  saveToGithub: () => Promise<void>
}

const defaultData: SiteData = {
  services: defaultServices,
  gallery: defaultGallery,
  team: defaultTeam,
  reviews: defaultReviews,
  content: defaultSiteContent,
}

const DataContext = createContext<DataContextType | null>(null)

async function loadFromGithub(): Promise<Partial<SiteData> | null> {
  try {
    const [services, gallery, team, reviews, content] = await Promise.all([
      readContent('content/services.json'),
      readContent('content/gallery.json'),
      readContent('content/team.json'),
      readContent('content/reviews.json'),
      readContent('content/site-content.json'),
    ])

    const parsed: Partial<SiteData> = {}
    if (services) parsed.services = JSON.parse(services)
    if (gallery) parsed.gallery = JSON.parse(gallery)
    if (team) parsed.team = JSON.parse(team)
    if (reviews) parsed.reviews = JSON.parse(reviews)
    if (content) parsed.content = JSON.parse(content)

    if (parsed.services || parsed.team) return parsed
    return null
  } catch {
    return null
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('loading')
  const [savedSnapshot, setSavedSnapshot] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const remote = await loadFromGithub()
      if (cancelled) return
      if (remote) {
        const merged = { ...defaultData, ...remote }
        setData(merged)
        setSavedSnapshot(JSON.stringify(merged))
      }
      setSyncStatus('idle')
    })()
    return () => { cancelled = true }
  }, [])

  const updateServices = useCallback((services: SiteData['services']) => {
    setData((prev) => ({ ...prev, services }))
  }, [])

  const updateGallery = useCallback((gallery: SiteData['gallery']) => {
    setData((prev) => ({ ...prev, gallery }))
  }, [])

  const updateTeam = useCallback((team: SiteData['team']) => {
    setData((prev) => ({ ...prev, team }))
  }, [])

  const updateReviews = useCallback((reviews: SiteData['reviews']) => {
    setData((prev) => ({ ...prev, reviews }))
  }, [])

  const updateContent = useCallback((content: SiteContent) => {
    setData((prev) => ({ ...prev, content }))
  }, [])

  const dirty = syncStatus !== 'loading' && JSON.stringify(data) !== savedSnapshot

  const saveToGithub = useCallback(async () => {
    setSyncStatus('saving')
    try {
      const { services, gallery, team, reviews, content } = data

      const results = await Promise.all([
        writeContent('content/services.json', JSON.stringify(services, null, 2), 'Оновлення послуг'),
        writeContent('content/gallery.json', JSON.stringify(gallery, null, 2), 'Оновлення галереї'),
        writeContent('content/team.json', JSON.stringify(team, null, 2), 'Оновлення команди'),
        writeContent('content/reviews.json', JSON.stringify(reviews, null, 2), 'Оновлення відгуків'),
        writeContent('content/site-content.json', JSON.stringify(content, null, 2), 'Оновлення контенту'),
      ])

      const failed = results.filter((r) => !r.ok)
      if (failed.length > 0) {
        setSyncStatus('error')
      } else {
        setSavedSnapshot(JSON.stringify(data))
        setSyncStatus('saved')
      }
    } catch {
      setSyncStatus('error')
    }
    setTimeout(() => setSyncStatus('idle'), 3000)
  }, [data])

  return (
    <DataContext.Provider
      value={{
        data,
        syncStatus,
        dirty,
        updateServices,
        updateGallery,
        updateTeam,
        updateReviews,
        updateContent,
        saveToGithub,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
