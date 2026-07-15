import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react'
import { loadSiteData, saveSiteData } from '../lib/supabase'
import {
  serviceCategories as defaultServices,
  galleryImages as defaultGallery,
  teamMembers as defaultTeam,
  reviews as defaultReviews,
} from '../data/services'
import { SiteContent, defaultSiteContent } from '../data/siteContent'

type SyncStatus = 'idle' | 'saving' | 'saved' | 'error'

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
  updateServices: (services: SiteData['services']) => void
  updateGallery: (gallery: SiteData['gallery']) => void
  updateTeam: (team: SiteData['team']) => void
  updateReviews: (reviews: SiteData['reviews']) => void
  updateContent: (content: SiteContent) => void
  saveToSupabase: () => Promise<void>
}

const STORAGE_KEY = 'salonkrasoti_data'

function loadFromStorage(): SiteData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(data: SiteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

const defaultData: SiteData = {
  services: defaultServices,
  gallery: defaultGallery,
  team: defaultTeam,
  reviews: defaultReviews,
  content: defaultSiteContent,
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    return loadFromStorage() ?? defaultData
  })
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    loadSiteData().then((remote) => {
      if (remote) {
        const merged = { ...defaultData, ...remote }
        if (remote.content) {
          merged.content = { ...defaultSiteContent, ...remote.content }
        }
        setData(merged)
        saveToStorage(merged)
      }
    })
  }, [])

  useEffect(() => {
    saveToStorage(data)
  }, [data])

  const debouncedSave = useCallback((newData: SiteData) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      saveToStorage(newData)
    }, 2000)
  }, [])

  const updateServices = useCallback((services: SiteData['services']) => {
    setData((prev) => { const next = { ...prev, services }; debouncedSave(next); return next })
  }, [debouncedSave])

  const updateGallery = useCallback((gallery: SiteData['gallery']) => {
    setData((prev) => { const next = { ...prev, gallery }; debouncedSave(next); return next })
  }, [debouncedSave])

  const updateTeam = useCallback((team: SiteData['team']) => {
    setData((prev) => { const next = { ...prev, team }; debouncedSave(next); return next })
  }, [debouncedSave])

  const updateReviews = useCallback((reviews: SiteData['reviews']) => {
    setData((prev) => { const next = { ...prev, reviews }; debouncedSave(next); return next })
  }, [debouncedSave])

  const updateContent = useCallback((content: SiteContent) => {
    setData((prev) => { const next = { ...prev, content }; debouncedSave(next); return next })
  }, [debouncedSave])

  const saveToSupabase = useCallback(async () => {
    setSyncStatus('saving')
    const ok = await saveSiteData(data as unknown as Record<string, unknown>)
    setSyncStatus(ok ? 'saved' : 'error')
    setTimeout(() => setSyncStatus('idle'), 3000)
  }, [data])

  return (
    <DataContext.Provider
      value={{
        data,
        syncStatus,
        updateServices,
        updateGallery,
        updateTeam,
        updateReviews,
        updateContent,
        saveToSupabase,
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
