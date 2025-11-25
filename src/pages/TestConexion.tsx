/**
 * Página de prueba para verificar la conexión con Supabase
 * Accede a esta página desde: /test-conexion
 * Solo para desarrollo - eliminar en producción
 */

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { testSupabaseConnection, testTables, getProjectInfo } from '@/utils/testSupabaseConnection'
import { CheckCircle, XCircle, Loader, AlertCircle } from 'lucide-react'

export default function TestConexion() {
  const [resultado, setResultado] = useState<{
    estado: 'idle' | 'loading' | 'success' | 'error'
    mensaje: string
    detalles?: string
  }>({ estado: 'idle', mensaje: '' })

  const [tablasResultado, setTablasResultado] = useState<string[]>([])

  const probarConexion = async () => {
    setResultado({ estado: 'loading', mensaje: 'Probando conexión...' })
    
    try {
      const exito = await testSupabaseConnection()
      
      if (exito) {
        setResultado({
          estado: 'success',
          mensaje: '✅ Conexión exitosa con Supabase!',
          detalles: 'La conexión funciona correctamente. Revisa la consola para más detalles.'
        })
      } else {
        setResultado({
          estado: 'error',
          mensaje: '❌ Error en la conexión',
          detalles: 'Revisa la consola del navegador para ver los detalles del error.'
        })
      }
    } catch (error: any) {
      setResultado({
        estado: 'error',
        mensaje: '❌ Error inesperado',
        detalles: error.message
      })
    }
  }

  const probarTablas = async () => {
    setTablasResultado([])
    setResultado({ estado: 'loading', mensaje: 'Verificando tablas...' })
    
    // Capturar los logs de la consola
    const logs: string[] = []
    const originalLog = console.log
    console.log = (...args: any[]) => {
      logs.push(args.join(' '))
      originalLog(...args)
    }

    try {
      await testTables()
      setTablasResultado(logs)
      setResultado({
        estado: 'success',
        mensaje: 'Verificación de tablas completada',
        detalles: 'Revisa los resultados abajo y la consola para más detalles.'
      })
    } catch (error: any) {
      setResultado({
        estado: 'error',
        mensaje: 'Error al verificar tablas',
        detalles: error.message
      })
    } finally {
      console.log = originalLog
    }
  }

  const mostrarInfo = async () => {
    await getProjectInfo()
    setResultado({
      estado: 'success',
      mensaje: 'Información mostrada en consola',
      detalles: 'Abre la consola del navegador (F12) para ver la información del proyecto.'
    })
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prueba de Conexión con Supabase</h1>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Acciones</h2>
          <div className="flex gap-4 flex-wrap">
            <Button onClick={probarConexion} disabled={resultado.estado === 'loading'}>
              Probar Conexión
            </Button>
            <Button onClick={probarTablas} disabled={resultado.estado === 'loading'} variant="secondary">
              Verificar Tablas
            </Button>
            <Button onClick={mostrarInfo} variant="secondary">
              Mostrar Info
            </Button>
          </div>
        </Card>

        {resultado.estado !== 'idle' && (
          <Card className="p-6">
            <div className="flex items-start gap-4">
              {resultado.estado === 'loading' && <Loader className="w-6 h-6 animate-spin text-blue-600" />}
              {resultado.estado === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
              {resultado.estado === 'error' && <XCircle className="w-6 h-6 text-red-600" />}
              
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{resultado.mensaje}</h3>
                {resultado.detalles && (
                  <p className="text-gray-600 text-sm">{resultado.detalles}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {tablasResultado.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resultado de Verificación de Tablas</h2>
            <div className="space-y-2 font-mono text-sm">
              {tablasResultado.map((log, index) => (
                <div key={index} className={log.includes('✅') ? 'text-green-600' : log.includes('❌') ? 'text-red-600' : 'text-yellow-600'}>
                  {log}
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6 bg-blue-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Nota Importante</h3>
              <p className="text-blue-800 text-sm">
                Si el panel de Supabase te da error, puedes:
              </p>
              <ul className="list-disc list-inside text-blue-800 text-sm mt-2 space-y-1">
                <li>Usar el SQL Editor directamente (debería funcionar aunque el panel de Auth falle)</li>
                <li>Desactivar extensiones del navegador (especialmente traductores)</li>
                <li>Usar otro navegador o modo incógnito</li>
                <li>Usar esta página de prueba para verificar la conexión desde la aplicación</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

