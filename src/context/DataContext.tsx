import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { writeContent, readContent } from '../lib/github'
import { setBusinessInfo, setBookingUrl } from '../lib/businessStore'
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

    if (Object.keys(parsed).length > 0) return parsed
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
        if (merged.content?.businessInfo) setBusinessInfo(merged.content.businessInfo)
        if (merged.content?.businessInfo?.bookingUrl) setBookingUrl(merged.content.businessInfo.bookingUrl)
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
    setData((prev) => {
      const next = { ...prev, content }
      if (content?.businessInfo) setBusinessInfo(content.businessInfo)
      return next
    })
  }, [])

  const dirty = syncStatus !== 'loading' && JSON.stringify(data) !== savedSnapshot

  const saveToGithub = useCallback(async () => {
    setSyncStatus('saving')
    try {
      const { services, gallery, team, reviews, content } = data

      const prev: Partial<SiteData> = savedSnapshot ? JSON.parse(savedSnapshot) : {}
      const fileDefs: { path: string; data: unknown; msg: string }[] = [
        { path: 'content/services.json', data: services, msg: 'Оновлення послуг' },
        { path: 'content/gallery.json', data: gallery, msg: 'Оновлення галереї' },
        { path: 'content/team.json', data: team, msg: 'Оновлення команди' },
        { path: 'content/reviews.json', data: reviews, msg: 'Оновлення відгуків' },
        { path: 'content/site-content.json', data: content, msg: 'Оновлення контенту' },
      ]

      const results = []
      for (const f of fileDefs) {
        const serialized = JSON.stringify(f.data, null, 2)
        const prevSerialized = prev[f.path as keyof SiteData]
          ? JSON.stringify(prev[f.path as keyof SiteData], null, 2)
          : null
        if (serialized === prevSerialized) continue
        results.push(await writeContent(f.path, serialized, f.msg))
      }

      if (results.length === 0) {
        setSavedSnapshot(JSON.stringify(data))
        setSyncStatus('saved')
        setTimeout(() => setSyncStatus('idle'), 3000)
        return
      }

      const failed = results.filter((r) => !r.ok)
      if (failed.length > 0) {
        setSyncStatus('error')
      } else {
        const remote = await loadFromGithub()
        if (remote) {
          const merged = { ...defaultData, ...remote }
          setData(merged)
          setSavedSnapshot(JSON.stringify(merged))
          if (merged.content?.businessInfo) setBusinessInfo(merged.content.businessInfo)
          if (merged.content?.businessInfo?.bookingUrl) setBookingUrl(merged.content.businessInfo.bookingUrl)
        } else {
          setSavedSnapshot(JSON.stringify(data))
          if (data.content?.businessInfo) setBusinessInfo(data.content.businessInfo)
          if (data.content?.businessInfo?.bookingUrl) setBookingUrl(data.content.businessInfo.bookingUrl)
        }
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
