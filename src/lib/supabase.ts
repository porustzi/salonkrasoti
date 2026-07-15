import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cisirgtkbixhhbwqfbix.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc2lyZ3RrYml4aGhid3FmYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTY1NzYsImV4cCI6MjA5OTY5MjU3Nn0.qvRj3f55N1ha_EAlmx4xRL0KcYiGuCjtukvkNT26qSo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function loadSiteData() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('site_data')
    .select('*')
    .single()
  if (error) {
    console.error('Error loading site data:', error)
    return null
  }
  return data
}

export async function saveSiteData(payload: Record<string, unknown>) {
  if (!supabase) return false
  const { error } = await supabase.rpc('update_site_data', payload)
  if (error) {
    console.error('Error saving site data:', error)
    return false
  }
  return true
}
