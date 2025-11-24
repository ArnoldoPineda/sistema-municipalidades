import { supabase } from '@/lib/supabase'

export const catalogosService = {
  // Aldeas
  async getAldeas() {
    const { data, error } = await supabase
      .from('aldeas')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw error
    return data
  },

  // Barrios por aldea
  async getBarriosByAldea(aldeaId: string) {
    const { data, error } = await supabase
      .from('barrios_colonias')
      .select('*')
      .eq('aldea_id', aldeaId)
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw error
    return data
  },

  // Actividades económicas
  async getActividadesEconomicas() {
    const { data, error } = await supabase
      .from('actividades_economicas')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw error
    return data
  },

  // Categorías de rubros
  async getCategoriasRubros() {
    const { data, error } = await supabase
      .from('categorias_rubros')
      .select('*')
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw error
    return data
  },

  // Rubros por categoría
  async getRubrosByCategoria(categoriaId: string) {
    const { data, error } = await supabase
      .from('rubros_items')
      .select('*')
      .eq('categoria_id', categoriaId)
      .eq('activo', true)
      .order('nombre')
    
    if (error) throw error
    return data
  }
}