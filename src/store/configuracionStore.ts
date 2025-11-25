import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ConfiguracionCompleta } from '@/services/configuracionService'
import { cargarConfiguracion, guardarConfiguracion, obtenerConfiguracionPorDefecto } from '@/services/configuracionService'

interface ConfiguracionState {
  configuracion: ConfiguracionCompleta | null
  isLoading: boolean
  error: string | null
  
  // Acciones
  cargar: () => Promise<void>
  guardar: (configuracion: ConfiguracionCompleta) => Promise<void>
  actualizarFirmas: (firmas: Partial<ConfiguracionCompleta['firmas']>) => Promise<void>
  actualizarLogos: (logos: Partial<ConfiguracionCompleta['logos']>) => Promise<void>
  actualizarNumeracion: (numeracion: Partial<ConfiguracionCompleta['numeracion']>) => Promise<void>
  actualizarEstilo: (estilo: Partial<ConfiguracionCompleta['estilo']>) => Promise<void>
  resetear: () => Promise<void>
}

export const useConfiguracionStore = create<ConfiguracionState>()(
  persist(
    (set, get) => ({
      configuracion: null,
      isLoading: false,
      error: null,

      cargar: async () => {
        set({ isLoading: true, error: null })
        try {
          const config = await cargarConfiguracion()
          set({ configuracion: config, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al cargar configuración',
            isLoading: false 
          })
        }
      },

      guardar: async (configuracion: ConfiguracionCompleta) => {
        set({ isLoading: true, error: null })
        try {
          await guardarConfiguracion(configuracion)
          set({ configuracion, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error al guardar configuración',
            isLoading: false 
          })
          throw error
        }
      },

      actualizarFirmas: async (firmas: Partial<ConfiguracionCompleta['firmas']>) => {
        const { configuracion } = get()
        if (!configuracion) return

        const nuevaConfiguracion: ConfiguracionCompleta = {
          ...configuracion,
          firmas: {
            ...configuracion.firmas,
            ...firmas
          }
        }

        await get().guardar(nuevaConfiguracion)
      },

      actualizarLogos: async (logos: Partial<ConfiguracionCompleta['logos']>) => {
        const { configuracion } = get()
        if (!configuracion) return

        const nuevaConfiguracion: ConfiguracionCompleta = {
          ...configuracion,
          logos: {
            ...configuracion.logos,
            ...logos
          }
        }

        await get().guardar(nuevaConfiguracion)
      },

      actualizarNumeracion: async (numeracion: Partial<ConfiguracionCompleta['numeracion']>) => {
        const { configuracion } = get()
        if (!configuracion) return

        const nuevaConfiguracion: ConfiguracionCompleta = {
          ...configuracion,
          numeracion: {
            ...configuracion.numeracion,
            ...numeracion
          }
        }

        await get().guardar(nuevaConfiguracion)
      },

      actualizarEstilo: async (estilo: Partial<ConfiguracionCompleta['estilo']>) => {
        const { configuracion } = get()
        if (!configuracion) return

        const nuevaConfiguracion: ConfiguracionCompleta = {
          ...configuracion,
          estilo: {
            ...configuracion.estilo,
            ...estilo
          }
        }

        await get().guardar(nuevaConfiguracion)
      },

      resetear: async () => {
        const configPorDefecto = obtenerConfiguracionPorDefecto()
        await get().guardar(configPorDefecto)
      }
    }),
    {
      name: 'configuracion-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ configuracion: state.configuracion })
    }
  )
)





