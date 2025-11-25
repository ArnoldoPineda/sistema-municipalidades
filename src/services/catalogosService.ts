import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const catalogosService = {
  async getAldeas() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('aldeas')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) {
      console.error('Error al obtener aldeas:', error)
      return []
    }
    return data || []
  },

  async getBarriosByAldea(aldeaId: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('barrios_colonias')
      .select('*')
      .eq('aldea_id', aldeaId)
      .eq('activo', true)
      .order('nombre')
    
    if (error) {
      console.error('Error al obtener barrios:', error)
      return []
    }
    return data || []
  },

  async getActividadesEconomicas() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('actividades_economicas')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) {
      console.error('Error al obtener actividades:', error)
      return []
    }
    return data || []
  },

  async getCategoriasRubros() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('categorias_rubros')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) {
      console.error('Error al obtener categorías:', error)
      return []
    }
    return data || []
  },

  async getRubrosByCategoria(categoriaId: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('rubros_items')
      .select('*')
      .eq('categoria_id', categoriaId)
      .eq('activo', true)
      .order('codigo')
    
    if (error) {
      console.error('Error al obtener rubros:', error)
      return []
    }
    return data || []
  },

  async getAllRubros() {
    if (!isSupabaseConfigured() || !supabase) {
      return []
    }

    const { data, error } = await supabase
      .from('rubros_items')
      .select('*')
      .eq('activo', true)
      .order('codigo')
    
    if (error) {
      console.error('Error al obtener rubros:', error)
      return []
    }
    return data || []
  },

  async createRubro(rubro: { codigo: string; nombre: string; categoria_id: string }) {
    if (!isSupabaseConfigured() || !supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('rubros_items')
      .insert({
        codigo: rubro.codigo,
        nombre: rubro.nombre,
        categoria_id: rubro.categoria_id,
        activo: true
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error al crear rubro:', error)
      throw error
    }
    return data
  },

  async updateRubro(id: string, rubro: { codigo: string; nombre: string; categoria_id: string }) {
    if (!isSupabaseConfigured() || !supabase) {
      return null
    }

    const { data, error } = await supabase
      .from('rubros_items')
      .update({
        codigo: rubro.codigo,
        nombre: rubro.nombre,
        categoria_id: rubro.categoria_id
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error al actualizar rubro:', error)
      throw error
    }
    return data
  },

  async deleteRubro(id: string) {
    if (!isSupabaseConfigured() || !supabase) {
      return false
    }

    const { error } = await supabase
      .from('rubros_items')
      .update({ activo: false })
      .eq('id', id)
    
    if (error) {
      console.error('Error al eliminar rubro:', error)
      throw error
    }
    return true
  }
}