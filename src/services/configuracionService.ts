import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ConfiguracionFirmas {
  alcalde: string | null // URL o base64 de la imagen
  juez: string | null
  jefeCatastro: string | null
}

export interface ConfiguracionLogos {
  logoAlcaldia: string | null
  logoSegundo: string | null
}

export interface ConfiguracionNumeracion {
  permisosOperacion: {
    numeroInicio: string
    formato: string
  }
  permisosConstruccion: {
    numeroInicio: string
    formato: string
  }
  solvencias: {
    numeroInicio: string
    formato: string
  }
}

export interface ConfiguracionEstilo {
  permisosOperacion: {
    estilo: 'vertical' | 'horizontal' | 'media-pagina'
    tamañoFirma: 'pequeño' | 'mediano' | 'grande'
  }
  permisosConstruccion: {
    estilo: 'vertical' | 'horizontal' | 'media-pagina'
    tamañoFirma: 'pequeño' | 'mediano' | 'grande'
  }
  solvencias: {
    estilo: 'vertical' | 'horizontal' | 'media-pagina'
    tamañoFirma: 'pequeño' | 'mediano' | 'grande'
  }
}

export interface ConfiguracionCompleta {
  firmas: ConfiguracionFirmas
  logos: ConfiguracionLogos
  numeracion: ConfiguracionNumeracion
  estilo: ConfiguracionEstilo
  año: number
}

// Convertir imagen a base64
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Error al convertir imagen'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Guardar configuración
export const guardarConfiguracion = async (configuracion: ConfiguracionCompleta): Promise<void> => {
  try {
    // Guardar en localStorage como fallback
    localStorage.setItem('configuracion-municipal', JSON.stringify(configuracion))

    // Si Supabase está configurado, guardar también allí
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('configuracion_municipal')
        .upsert({
          id: 1,
          ...configuracion,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error al guardar en Supabase:', error)
        // Continuar aunque falle Supabase, ya que tenemos localStorage
      }
    }
  } catch (error) {
    console.error('Error al guardar configuración:', error)
    throw error
  }
}

// Cargar configuración
export const cargarConfiguracion = async (): Promise<ConfiguracionCompleta | null> => {
  try {
    // Intentar cargar desde Supabase primero
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('configuracion_municipal')
        .select('*')
        .eq('id', 1)
        .single()

      if (!error && data) {
        // Guardar en localStorage como backup
        localStorage.setItem('configuracion-municipal', JSON.stringify(data))
        return data as ConfiguracionCompleta
      }
    }

    // Fallback a localStorage
    const stored = localStorage.getItem('configuracion-municipal')
    if (stored) {
      return JSON.parse(stored) as ConfiguracionCompleta
    }

    // Retornar configuración por defecto
    return obtenerConfiguracionPorDefecto()
  } catch (error) {
    console.error('Error al cargar configuración:', error)
    return obtenerConfiguracionPorDefecto()
  }
}

// Obtener configuración por defecto
export const obtenerConfiguracionPorDefecto = (): ConfiguracionCompleta => {
  const añoActual = new Date().getFullYear()
  
  return {
    firmas: {
      alcalde: null,
      juez: null,
      jefeCatastro: null
    },
    logos: {
      logoAlcaldia: null,
      logoSegundo: null
    },
    numeracion: {
      permisosOperacion: {
        numeroInicio: '00001',
        formato: '00001'
      },
      permisosConstruccion: {
        numeroInicio: '00001',
        formato: '00001'
      },
      solvencias: {
        numeroInicio: '0000001',
        formato: '0000001'
      }
    },
    estilo: {
      permisosOperacion: {
        estilo: 'vertical',
        tamañoFirma: 'mediano'
      },
      permisosConstruccion: {
        estilo: 'vertical',
        tamañoFirma: 'mediano'
      },
      solvencias: {
        estilo: 'vertical',
        tamañoFirma: 'mediano'
      }
    },
    año: añoActual
  }
}





