/**
 * Utilidad para probar la conexión con Supabase
 * Ejecuta esto desde la consola del navegador o desde un componente de prueba
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function testSupabaseConnection() {
  console.log('🔍 Iniciando prueba de conexión con Supabase...\n')

  // 1. Verificar configuración
  if (!isSupabaseConfigured() || !supabase) {
    console.error('❌ ERROR: Supabase no está configurado')
    console.log('📝 Verifica que tengas las variables de entorno:')
    console.log('   - VITE_SUPABASE_URL')
    console.log('   - VITE_SUPABASE_ANON_KEY')
    return false
  }

  console.log('✅ Variables de entorno configuradas\n')

  // 2. Probar conexión básica
  try {
    const { error } = await supabase.from('aldeas').select('count').limit(1)
    
    if (error) {
      // Si el error es que la tabla no existe, eso está bien, significa que la conexión funciona
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        console.log('⚠️  ADVERTENCIA: Las tablas aún no están creadas')
        console.log('📋 Ejecuta el script database/schema.sql en Supabase\n')
        return true // La conexión funciona, solo faltan las tablas
      }
      
      console.error('❌ ERROR al conectar:', error.message)
      console.error('   Código:', error.code)
      return false
    }

    console.log('✅ Conexión exitosa con Supabase!')
    console.log('✅ Las tablas están creadas y accesibles\n')
    return true

  } catch (error: any) {
    console.error('❌ ERROR inesperado:', error.message)
    return false
  }
}

// Función para probar cada tabla individualmente
export async function testTables() {
  if (!isSupabaseConfigured() || !supabase) {
    console.error('❌ Supabase no está configurado')
    return
  }

  const tablas = [
    'aldeas',
    'barrios_colonias',
    'actividades_economicas',
    'categorias_rubros',
    'rubros_items',
    'permisos_operacion',
    'permisos_operacion_actividades',
    'permisos_construccion',
    'solvencias',
    'configuracion_municipal',
    'perfiles_usuarios'
  ]

  console.log('🔍 Verificando tablas...\n')

  for (const tabla of tablas) {
    try {
      const { error } = await supabase.from(tabla).select('*').limit(1)
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log(`❌ ${tabla}: NO EXISTE`)
        } else {
          console.log(`⚠️  ${tabla}: Error - ${error.message}`)
        }
      } else {
        console.log(`✅ ${tabla}: OK`)
      }
    } catch (error: any) {
      console.log(`❌ ${tabla}: Error - ${error.message}`)
    }
  }
}

// Función para obtener información del proyecto
export async function getProjectInfo() {
  if (!isSupabaseConfigured() || !supabase) {
    console.error('❌ Supabase no está configurado')
    return
  }

  const url = import.meta.env.VITE_SUPABASE_URL
  console.log('📊 Información del proyecto:')
  console.log('   URL:', url)
  console.log('   Key configurada:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Sí' : '❌ No')
  console.log('')
}

