import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import ImageUpload from '@/components/ui/ImageUpload'
import { useConfiguracionStore } from '@/store/configuracionStore'
import { Save } from 'lucide-react'
import type { ConfiguracionCompleta } from '@/services/configuracionService'

export default function Configuracion() {
  const { 
    configuracion, 
    isLoading, 
    cargar, 
    guardar, 
    actualizarFirmas, 
    actualizarLogos
  } = useConfiguracionStore()

  const [localConfig, setLocalConfig] = useState<ConfiguracionCompleta | null>(null)
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null)

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    if (configuracion) {
      setLocalConfig(configuracion)
    }
  }, [configuracion])

  const mostrarMensaje = (tipo: 'success' | 'error', texto: string) => {
    setMensaje({ tipo, texto })
    setTimeout(() => setMensaje(null), 3000)
  }

  const handleGuardar = async () => {
    if (!localConfig) return

    try {
      await guardar(localConfig)
      mostrarMensaje('success', 'Configuración guardada exitosamente')
    } catch (error) {
      mostrarMensaje('error', 'Error al guardar la configuración')
    }
  }

  const handleActualizarFirmas = async (firmas: Partial<ConfiguracionCompleta['firmas']>) => {
    if (!localConfig) return

    const nuevasFirmas = { ...localConfig.firmas, ...firmas }
    setLocalConfig({ ...localConfig, firmas: nuevasFirmas })
    await actualizarFirmas(firmas)
    mostrarMensaje('success', 'Firmas actualizadas')
  }

  const handleActualizarLogos = async (logos: Partial<ConfiguracionCompleta['logos']>) => {
    if (!localConfig) return

    const nuevosLogos = { ...localConfig.logos, ...logos }
    setLocalConfig({ ...localConfig, logos: nuevosLogos })
    await actualizarLogos(logos)
    mostrarMensaje('success', 'Logos actualizados')
  }

  const handleActualizarNumeracion = (tipo: 'permisosOperacion' | 'permisosConstruccion' | 'solvencias', campo: string, valor: string) => {
    if (!localConfig) return

    const nuevaNumeracion = {
      ...localConfig.numeracion,
      [tipo]: {
        ...localConfig.numeracion[tipo],
        [campo]: valor
      }
    }
    setLocalConfig({ ...localConfig, numeracion: nuevaNumeracion })
  }

  const handleActualizarEstilo = (tipo: 'permisosOperacion' | 'permisosConstruccion' | 'solvencias', campo: string, valor: string) => {
    if (!localConfig) return

    const nuevoEstilo = {
      ...localConfig.estilo,
      [tipo]: {
        ...localConfig.estilo[tipo],
        [campo]: valor
      }
    }
    setLocalConfig({ ...localConfig, estilo: nuevoEstilo })
  }

  if (isLoading || !localConfig) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-base text-neutral-text">Cargando configuración...</p>
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Configuración del Sistema</h1>
          <p className="text-base text-neutral-text">Personaliza firmas, logos, numeración y estilos para tu municipalidad</p>
        </div>
        <div className="flex items-center gap-md">
          <Button
            variant="secondary"
            onClick={handleGuardar}
            className="flex items-center gap-xs"
          >
            <Save className="w-4 h-4" />
            Guardar Todo
          </Button>
        </div>
      </div>

      {mensaje && (
        <div className={`p-md rounded-sm ${
          mensaje.tipo === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {mensaje.texto}
        </div>
      )}

      {/* Sección: LOGOS */}
      <Card>
        <h2 className="text-h2 font-bold mb-lg text-center">LOGOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          <div>
            <ImageUpload
              label="Logo de la alcaldía"
              value={localConfig.logos.logoAlcaldia}
              onChange={(base64) => handleActualizarLogos({ logoAlcaldia: base64 })}
              previewWidth={300}
              previewHeight={200}
            />
          </div>
          <div>
            <ImageUpload
              label="Segundo logo (escudo, bandera)"
              value={localConfig.logos.logoSegundo}
              onChange={(base64) => handleActualizarLogos({ logoSegundo: base64 })}
              previewWidth={300}
              previewHeight={200}
            />
          </div>
        </div>
      </Card>

      {/* Sección: FIRMAS */}
      <Card>
        <h2 className="text-h2 font-bold mb-lg text-center">FIRMAS ELECTRÓNICAS</h2>
        <div className="space-y-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div>
              <ImageUpload
                label="Alcalde Municipal"
                value={localConfig.firmas.alcalde}
                onChange={(base64) => handleActualizarFirmas({ alcalde: base64 })}
                previewWidth={250}
                previewHeight={100}
              />
            </div>
            <div>
              <ImageUpload
                label="Juez de Justicia Municipal"
                value={localConfig.firmas.juez}
                onChange={(base64) => handleActualizarFirmas({ juez: base64 })}
                previewWidth={250}
                previewHeight={100}
              />
            </div>
            <div>
              <ImageUpload
                label="Jefe de Catastro"
                value={localConfig.firmas.jefeCatastro}
                onChange={(base64) => handleActualizarFirmas({ jefeCatastro: base64 })}
                previewWidth={250}
                previewHeight={100}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Sección: PERMISOS DE OPERACIÓN */}
      <Card>
        <h2 className="text-h2 font-bold mb-lg text-center">PERMISOS DE OPERACIÓN</h2>
        <div className="space-y-lg">
          {/* Numeración */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Numeración</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="N° de inicio"
                value={localConfig.numeracion.permisosOperacion.numeroInicio}
                onChange={(e) => handleActualizarNumeracion('permisosOperacion', 'numeroInicio', e.target.value)}
                placeholder="Ej: 00001"
              />
              <Input
                label="Formato"
                value={localConfig.numeracion.permisosOperacion.formato}
                onChange={(e) => handleActualizarNumeracion('permisosOperacion', 'formato', e.target.value)}
                placeholder="Ej: 00001"
              />
            </div>
          </div>

          {/* Estilo */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Estilo</h3>
            <div className="space-y-md">
              <div>
                <label className="block text-sm text-gray-700 mb-sm">Estilo de página</label>
                <div className="grid grid-cols-3 gap-md">
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosOperacion', 'estilo', 'vertical')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosOperacion.estilo === 'vertical'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa vertical</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosOperacion', 'estilo', 'media-pagina')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosOperacion.estilo === 'media-pagina'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="space-y-xs mb-xs">
                      <div className="w-full h-10 bg-orange-500 rounded-sm"></div>
                      <div className="w-full h-10 bg-white border border-gray-300 rounded-sm"></div>
                    </div>
                    <span className="text-xs">Media pág.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosOperacion', 'estilo', 'horizontal')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosOperacion.estilo === 'horizontal'
                        ? 'border-primary bg-primary-background border-blue-500'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 border-2 border-blue-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa horizontal</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-sm">Tamaño de firma</label>
                <select
                  value={localConfig.estilo.permisosOperacion.tamañoFirma}
                  onChange={(e) => handleActualizarEstilo('permisosOperacion', 'tamañoFirma', e.target.value)}
                  className="w-full px-md py-sm border border-neutral-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Sección: PERMISOS DE CONSTRUCCIÓN */}
      <Card>
        <h2 className="text-h2 font-bold mb-lg text-center">PERMISOS DE CONSTRUCCIÓN</h2>
        <div className="space-y-lg">
          {/* Numeración */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Numeración</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="N° de inicio"
                value={localConfig.numeracion.permisosConstruccion.numeroInicio}
                onChange={(e) => handleActualizarNumeracion('permisosConstruccion', 'numeroInicio', e.target.value)}
                placeholder="Ej: 00001"
              />
              <Input
                label="Formato"
                value={localConfig.numeracion.permisosConstruccion.formato}
                onChange={(e) => handleActualizarNumeracion('permisosConstruccion', 'formato', e.target.value)}
                placeholder="Ej: 00001"
              />
            </div>
          </div>

          {/* Estilo */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Estilo</h3>
            <div className="space-y-md">
              <div>
                <label className="block text-sm text-gray-700 mb-sm">Estilo de página</label>
                <div className="grid grid-cols-3 gap-md">
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosConstruccion', 'estilo', 'vertical')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosConstruccion.estilo === 'vertical'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa vertical</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosConstruccion', 'estilo', 'media-pagina')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosConstruccion.estilo === 'media-pagina'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="space-y-xs mb-xs">
                      <div className="w-full h-10 bg-orange-500 rounded-sm"></div>
                      <div className="w-full h-10 bg-white border border-gray-300 rounded-sm"></div>
                    </div>
                    <span className="text-xs">Media pág.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('permisosConstruccion', 'estilo', 'horizontal')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.permisosConstruccion.estilo === 'horizontal'
                        ? 'border-primary bg-primary-background border-blue-500'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 border-2 border-blue-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa horizontal</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-sm">Tamaño de firma</label>
                <select
                  value={localConfig.estilo.permisosConstruccion.tamañoFirma}
                  onChange={(e) => handleActualizarEstilo('permisosConstruccion', 'tamañoFirma', e.target.value)}
                  className="w-full px-md py-sm border border-neutral-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Sección: SOLVENCIAS */}
      <Card>
        <h2 className="text-h2 font-bold mb-lg text-center">SOLVENCIAS</h2>
        <div className="space-y-lg">
          {/* Numeración */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Numeración</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="N° de inicio"
                value={localConfig.numeracion.solvencias.numeroInicio}
                onChange={(e) => handleActualizarNumeracion('solvencias', 'numeroInicio', e.target.value)}
                placeholder="Ej: 0000001"
              />
              <Input
                label="Formato"
                value={localConfig.numeracion.solvencias.formato}
                onChange={(e) => handleActualizarNumeracion('solvencias', 'formato', e.target.value)}
                placeholder="Ej: 0000001"
              />
            </div>
          </div>

          {/* Estilo */}
          <div>
            <h3 className="text-h3 font-semibold mb-md">Estilo</h3>
            <div className="space-y-md">
              <div>
                <label className="block text-sm text-gray-700 mb-sm">Estilo de página</label>
                <div className="grid grid-cols-3 gap-md">
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('solvencias', 'estilo', 'vertical')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.solvencias.estilo === 'vertical'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa vertical</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('solvencias', 'estilo', 'media-pagina')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.solvencias.estilo === 'media-pagina'
                        ? 'border-primary bg-primary-background'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="space-y-xs mb-xs">
                      <div className="w-full h-10 bg-orange-500 rounded-sm"></div>
                      <div className="w-full h-10 bg-white border border-gray-300 rounded-sm"></div>
                    </div>
                    <span className="text-xs">Media pág.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActualizarEstilo('solvencias', 'estilo', 'horizontal')}
                    className={`p-md border-2 rounded-sm text-center transition-colors ${
                      localConfig.estilo.solvencias.estilo === 'horizontal'
                        ? 'border-primary bg-primary-background border-blue-500'
                        : 'border-neutral-border hover:border-primary'
                    }`}
                  >
                    <div className="w-full h-20 bg-orange-500 border-2 border-blue-500 rounded-sm mb-xs"></div>
                    <span className="text-xs">Pág. completa horizontal</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-sm">Tamaño de firma</label>
                <select
                  value={localConfig.estilo.solvencias.tamañoFirma}
                  onChange={(e) => handleActualizarEstilo('solvencias', 'tamañoFirma', e.target.value)}
                  className="w-full px-md py-sm border border-neutral-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
