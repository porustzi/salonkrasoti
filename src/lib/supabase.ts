import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cisirgtkbixhhbwqfbix.supabase.co'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseAnonKey) {
  console.warn(
    'Supabase anon key not set. Admin save will use localStorage only. ' +
    'Set VITE_SUPABASE_ANON_KEY in .env or directly in this file.'
  )
}

export const supabase = supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

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
