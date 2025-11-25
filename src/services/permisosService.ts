import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const permisosService = {
  async getPermisosOperacion() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
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

  async createPermisoOperacion(permiso: any) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { data, error } = await supabase
      .from('permisos_operacion')
      .insert(permiso)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updatePermisoOperacion(id: string, permiso: any) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { data, error } = await supabase
      .from('permisos_operacion')
      .update(permiso)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deletePermisoOperacion(id: string) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { error } = await supabase
      .from('permisos_operacion')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async addActividadToPermiso(permisoId: string, actividadId: string) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { data, error } = await supabase
      .from('permisos_operacion_actividades')
      .insert({
        permiso_operacion_id: permisoId,
        actividad_economica_id: actividadId
      })
    
    if (error) throw error
    return data
  },

  async getActividadesByPermiso(permisoId: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('permisos_operacion_actividades')
      .select(`
        *,
        actividades_economicas:actividad_economica_id(*)
      `)
      .eq('permiso_operacion_id', permisoId)
    
    if (error) {
      console.error('Error al obtener actividades:', error)
      return []
    }
    return data || []
  }
}