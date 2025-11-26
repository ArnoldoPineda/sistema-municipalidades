import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const solvenciasService = {
  async getSolvencias() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    // No hacer JOIN porque aldea_id y barrio_colonia_id son VARCHAR, no UUID
    const { data, error } = await supabase
      .from('solvencias')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error al obtener solvencias:', error)
      return []
    }
    return data || []
  },

  async createSolvencia(solvencia: any) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { data, error } = await supabase
      .from('solvencias')
      .insert(solvencia)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateSolvencia(id: string, solvencia: any) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { data, error } = await supabase
      .from('solvencias')
      .update(solvencia)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteSolvencia(id: string) {
    if (!isSupabaseConfigured() || !supabase) {
      throw new Error('Supabase no está configurado')
    }

    const { error } = await supabase
      .from('solvencias')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

