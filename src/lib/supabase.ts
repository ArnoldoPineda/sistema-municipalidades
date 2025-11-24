import { createClient } from '@supabase/supabase-js'

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validar que las variables estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables de Supabase no configuradas. Usando modo desarrollo sin base de datos.')
}

// Crear cliente solo si las variables están configuradas
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Función helper para verificar si Supabase está disponible
export const isSupabaseConfigured = () => {
  return supabase !== null
}