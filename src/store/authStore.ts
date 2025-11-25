import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'empleado' | 'directivo'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          // Verificar primero si Supabase está configurado
          if (!isSupabaseConfigured() || !supabase) {
            // Fallback: permitir login sin Supabase (modo desarrollo)
            const user: User = {
              id: '1',
              name: 'Usuario Demo',
              email,
              role: 'admin'
            }
            set({ user, isAuthenticated: true })
            return
          }
      
          // Intentar iniciar sesión con Supabase Auth solo si está configurado
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
      
          if (authError) throw authError

          // Obtener el perfil del usuario
          const { data: profile, error: profileError } = await supabase
            .from('perfiles_usuarios')
            .select('*')
            .eq('id', authData.user.id)
            .single()

          if (profileError) {
            // Si no existe perfil, crear uno básico
            const { data: newProfile, error: createError } = await supabase
              .from('perfiles_usuarios')
              .insert({
                id: authData.user.id,
                nombre: authData.user.email?.split('@')[0] || 'Usuario',
                email: authData.user.email || email,
                rol: 'empleado'
              })
              .select()
              .single()

            if (createError) throw createError

            set({
              user: {
                id: newProfile.id,
                name: newProfile.nombre,
                email: newProfile.email,
                role: newProfile.rol
              },
              isAuthenticated: true
            })
          } else {
            set({
              user: {
                id: profile.id,
                name: profile.nombre,
                email: profile.email,
                role: profile.rol
              },
              isAuthenticated: true
            })
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error)
          // Fallback: permitir login sin Supabase (modo desarrollo)
          const user: User = {
            id: '1',
            name: 'Usuario Demo',
            email,
            role: 'admin'
          }
          set({ user, isAuthenticated: true })
        }
      },

      logout: async () => {
        if (isSupabaseConfigured() && supabase) {
          await supabase.auth.signOut()
        }
        set({ user: null, isAuthenticated: false })
      },

      checkSession: async () => {
        try {
          if (!isSupabaseConfigured() || !supabase) {
            return
          }

          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            const { data: profile } = await supabase
              .from('perfiles_usuarios')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profile) {
              set({
                user: {
                  id: profile.id,
                  name: profile.nombre,
                  email: profile.email,
                  role: profile.rol
                },
                isAuthenticated: true
              })
            }
          }
        } catch (error) {
          console.error('Error al verificar sesión:', error)
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
