import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const permisosService = {
  async getPermisosOperacion() {
    if (!isSupabaseConfigured()) {
      // Retornar datos vacíos si Supabase no está configurado
      return []
    }

    const { data, error } = await supabase!
      .from('permisos_operacion')
      .select(`
        *,
        aldeas:aldea_id(nombre),
        barrios_colonias:barrio_colonia_id(nombre)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error al obtener permisos:', error)
      return []
    }
    return data || []
  },

  // ... resto de métodos similares
}