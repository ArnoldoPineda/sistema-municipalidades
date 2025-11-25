import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Crear cliente - usar valores por defecto si no están configurados
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Función helper para verificar si Supabase está disponible
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null
}