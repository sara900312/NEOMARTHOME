import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ykyzviqwscrjjkucorlp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreXp2aXF3c2NyamprdWNvcmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzA1NjcsImV4cCI6MjA3OTI0NjU2N30.sXpyumNFfZ_bqqZt28LOQQjDM040y7R-9-jIXy_KIps'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
