import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cisirgtkbixhhbwqfbix.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc2lyZ3RrYml4aGhid3FmYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTY1NzYsImV4cCI6MjA5OTY5MjU3Nn0.qvRj3f55N1ha_EAlmx4xRL0KcYiGuCjtukvkNT26qSo'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log('Loading site_data...')
  const { data, error } = await supabase.from('site_data').select('*').single()
  console.log('Row:', JSON.stringify(data, null, 2))
  
  if (data?.data) {
    console.log('Content structure:', JSON.stringify(data.data.content, null, 2))
  }
}

test()