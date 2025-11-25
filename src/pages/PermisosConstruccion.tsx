import { useState } from 'react'
import type { MouseEvent } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import PermisoConstruccionPrint from '@/components/PermisoConstruccionPrint'
import SancionesDisposicionesConstruccionPrint from '@/components/SancionesDisposicionesConstruccionPrint'
import { Plus, Save, X, List, Printer, Edit, Trash2, ArrowRight } from 'lucide-react'

interface PermisoConstruccion {
  id: string
  concedePermisoA: string
  numeroIdentidad: string
  claveCatastral: string
  paraConstruir: string
  fechaCreacion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
  ubicacion?: string
  presupuesto?: string
  nombreConstructor?: string
  numeroRecibo?: string
  valorRecibo?: string
}

export default function PermisosConstruccion() {
  const [vistaLista, setVistaLista] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPermiso, setSelectedPermiso] = useState<PermisoConstruccion | null>(null)

  // Datos del formulario
  const [concedePermisoA, setConcedePermisoA] = useState('')
  const [numeroIdentidad, setNumeroIdentidad] = useState('')
  const [claveCatastral, setClaveCatastral] = useState('')
  const [paraConstruir, setParaConstruir] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [nombreConstructor, setNombreConstructor] = useState('')
  const [numeroRecibo, setNumeroRecibo] = useState('')
  const [valorRecibo, setValorRecibo] = useState('')

  // Errores de validación
  const [errores, setErrores] = useState<Record<string, string>>({})

  // Datos de ejemplo
  const [permisos, setPermisos] = useState<PermisoConstruccion[]>([
    {
      id: '1',
      concedePermisoA: 'JOSE ANTONIO VILLELA ORDOÑEZ',
      numeroIdentidad: '0901-1976-05691',
      claveCatastral: 'AZJ-0901128927002',
      paraConstruir: 'UNA CASA DE DOS PLANTAS DE 100 MTS2, X 90 MTS2, CON UN MURO PERIMETRAL DE 400 MTS2',
      ubicacion: 'ALDEA MONJARAS, BARRIO EL EMPERADOR, FRENTE A SUPERMERCADO LA COLONIA',
      presupuesto: '4500000.00',
      nombreConstructor: 'INGENIERO JOSE MANUEL FIGUEROA HERNANDEZ',
      numeroRecibo: '754320',
      valorRecibo: '45000.00',
      fechaCreacion: '18/11/2025',
      estado: 'Pendiente'
    },
    {
      id: '2',
      concedePermisoA: 'MARIA ELENA GONZALEZ',
      numeroIdentidad: '0801-1985-12345',
      claveCatastral: 'AZJ-0801123456789',
      paraConstruir: 'UNA CASA RESIDENCIAL DE 150 MTS2',
      fechaCreacion: '15/11/2025',
      estado: 'Aprobado'
    },
  ])

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {}

    if (!concedePermisoA.trim()) {
      nuevosErrores.concedePermisoA = 'El nombre del solicitante es requerido'
    }

    if (!numeroIdentidad.trim()) {
      nuevosErrores.numeroIdentidad = 'El número de identidad es requerido'
    } else if (!/^\d{4}-\d{4}-\d{5}$/.test(numeroIdentidad)) {
      nuevosErrores.numeroIdentidad = 'El formato de la identidad debe ser: ____-____-_____'
    }

    if (!claveCatastral.trim()) {
      nuevosErrores.claveCatastral = 'La clave catastral es requerida'
    }

    if (!paraConstruir.trim()) {
      nuevosErrores.paraConstruir = 'La descripción de construcción es requerida'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const [permisoAImprimir, setPermisoAImprimir] = useState<PermisoConstruccion | null>(null)
  const [mostrarModalImpresion, setMostrarModalImpresion] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState<'permiso' | 'sanciones' | null>(null)

  const handleNuevo = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsEditing(false)
    setSelectedPermiso(null)
    limpiarFormulario()
    setVistaLista(false)
    setErrores({})
  }

  const handleGuardar = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!validarFormulario()) {
      return
    }

    const nuevoPermiso: PermisoConstruccion = {
      id: isEditing && selectedPermiso ? selectedPermiso.id : Date.now().toString(),
      concedePermisoA: concedePermisoA.trim(),
      numeroIdentidad: numeroIdentidad.trim(),
      claveCatastral: claveCatastral.trim(),
      paraConstruir: paraConstruir.trim(),
      ubicacion: ubicacion.trim(),
      presupuesto: presupuesto.trim(),
      nombreConstructor: nombreConstructor.trim(),
      numeroRecibo: numeroRecibo.trim(),
      valorRecibo: valorRecibo.trim(),
      fechaCreacion: isEditing && selectedPermiso 
        ? selectedPermiso.fechaCreacion 
        : new Date().toLocaleDateString('es-ES'),
      estado: isEditing && selectedPermiso 
        ? selectedPermiso.estado 
        : 'Pendiente'
    }

    if (isEditing && selectedPermiso) {
      setPermisos(permisos.map(p => p.id === selectedPermiso.id ? nuevoPermiso : p))
    } else {
      setPermisos([...permisos, nuevoPermiso])
    }

    limpiarFormulario()
    setIsEditing(false)
    setSelectedPermiso(null)
    setErrores({})
  }

  const handleCancelar = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    limpiarFormulario()
    setIsEditing(false)
    setSelectedPermiso(null)
    setErrores({})
  }

  const limpiarFormulario = () => {
    setConcedePermisoA('')
    setNumeroIdentidad('')
    setClaveCatastral('')
    setParaConstruir('')
    setUbicacion('')
    setPresupuesto('')
    setNombreConstructor('')
    setNumeroRecibo('')
    setValorRecibo('')
  }

  const handleEditar = (permiso: PermisoConstruccion) => {
    setSelectedPermiso(permiso)
    setIsEditing(true)
    setConcedePermisoA(permiso.concedePermisoA)
    setNumeroIdentidad(permiso.numeroIdentidad)
    setClaveCatastral(permiso.claveCatastral)
    setParaConstruir(permiso.paraConstruir)
    setUbicacion(permiso.ubicacion || '')
    setPresupuesto(permiso.presupuesto || '')
    setNombreConstructor(permiso.nombreConstructor || '')
    setNumeroRecibo(permiso.numeroRecibo || '')
    setValorRecibo(permiso.valorRecibo || '')
    setVistaLista(false)
    setErrores({})
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este permiso?')) {
      setPermisos(permisos.filter(p => p.id !== id))
    }
  }

  const handleImprimir = (permiso?: PermisoConstruccion) => {
    const permisoParaImprimir = permiso || (isEditing && selectedPermiso ? selectedPermiso : null)
    if (permisoParaImprimir) {
      setPermisoAImprimir(permisoParaImprimir)
      setMostrarModalImpresion(true)
      setTipoDocumento(null)
    } else {
      alert('No hay permiso seleccionado para imprimir.')
    }
  }

  const handleSeleccionarTipoDocumento = (tipo: 'permiso' | 'sanciones') => {
    setTipoDocumento(tipo)
  }

  const handleImprimirDocumento = () => {
    if (!tipoDocumento) {
      alert('Por favor selecciona un tipo de documento para imprimir')
      return
    }

    setTimeout(() => {
      try {
        window.print()
        
        const handleAfterPrint = () => {
          setTimeout(() => {
            setPermisoAImprimir(null)
            setMostrarModalImpresion(false)
            setTipoDocumento(null)
          }, 100)
        }
        
        if (typeof window !== 'undefined') {
          window.addEventListener('afterprint', handleAfterPrint, { once: true })
        } else {
          setTimeout(handleAfterPrint, 1000)
        }
      } catch (error) {
        console.error('Error al imprimir:', error)
        alert('Error al abrir el diálogo de impresión. Por favor, intenta de nuevo.')
      }
    }, 300)
  }

  const handleCerrarModal = () => {
    setMostrarModalImpresion(false)
    setTipoDocumento(null)
    setPermisoAImprimir(null)
  }

  const formatIdentidad = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 4) return cleaned
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 13)}`
  }

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'Aprobado': return 'success'
      case 'Pendiente': return 'warning'
      case 'Rechazado': return 'danger'
      default: return 'info'
    }
  }

  if (vistaLista) {
    return (
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold mb-xs">Registros de Permisos de Construcción</h1>
          </div>
          <div className="flex items-center gap-md">
            <span className="text-base text-neutral-text">Registros: {permisos.length}</span>
            <Button onClick={() => setVistaLista(false)} className="flex items-center gap-xs">
              <Plus className="w-4 h-4" />
              Nuevo Permiso
            </Button>
          </div>
        </div>

        <Table headers={['#', 'Solicitante', 'No. Identidad', 'Clave Catastral', 'Fecha', 'Estado', 'Acciones']}>
          {permisos.map((permiso, index) => (
            <TableRow key={permiso.id} stripe={index % 2 === 1}>
              <TableCell>{permiso.id.padStart(5, '0')}</TableCell>
              <TableCell>{permiso.concedePermisoA}</TableCell>
              <TableCell>{permiso.numeroIdentidad}</TableCell>
              <TableCell>{permiso.claveCatastral}</TableCell>
              <TableCell>{permiso.fechaCreacion}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(permiso.estado)}>
                  {permiso.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-xs">
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleImprimir(permiso)}
                  >
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleEditar(permiso)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="p-xs"
                    onClick={() => handleEliminar(permiso.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Permiso de Construcción</h1>
          <p className="text-base text-neutral-text">Registra y gestiona permisos de construcción</p>
        </div>
      </div>

      <Card>
        <div className="space-y-lg p-lg">
          {/* Título de sección */}
          <div className="text-center mb-xl">
            <h2 className="text-h3 font-semibold mb-lg">Solicitante</h2>
          </div>

          {/* Campos del formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="md:col-span-2">
              <Input
                label="Concede permiso a *"
                placeholder="Ej: JOSE ANTONIO VILLELA ORDOÑEZ"
                value={concedePermisoA}
                onChange={(e) => {
                  setConcedePermisoA(e.target.value)
                  if (errores.concedePermisoA) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.concedePermisoA
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.concedePermisoA}
              />
            </div>

            <div>
              <Input
                label="No. de identidad *"
                placeholder="____-____-_____"
                value={numeroIdentidad}
                onChange={(e) => {
                  setNumeroIdentidad(formatIdentidad(e.target.value))
                  if (errores.numeroIdentidad) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.numeroIdentidad
                    setErrores(nuevosErrores)
                  }
                }}
                maxLength={16}
                error={errores.numeroIdentidad}
              />
            </div>

            <div>
              <Input
                label="Clave catastral *"
                placeholder="Ej: AZJ-0901128927002"
                value={claveCatastral}
                onChange={(e) => {
                  setClaveCatastral(e.target.value)
                  if (errores.claveCatastral) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.claveCatastral
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.claveCatastral}
              />
            </div>

            <div className="md:col-span-2 mt-md">
              <Textarea
                label="Para construir *"
                placeholder="Ej: UNA CASA DE DOS PLANTAS DE 100 MTS2, X 90 MTS2, CON UN MURO PERIMETRAL DE 400 MTS2"
                value={paraConstruir}
                onChange={(e) => {
                  setParaConstruir(e.target.value)
                  if (errores.paraConstruir) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.paraConstruir
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.paraConstruir}
                rows={4}
              />
            </div>

            <div className="md:col-span-2 pt-xl mt-xl border-t border-neutral-border">
              <h3 className="text-h4 font-semibold mb-lg">Descripción de la Obra</h3>
            </div>

            <div className="md:col-span-2">
              <Input
                label="Ubicación"
                placeholder="Ej: ALDEA MONJARAS, BARRIO EL EMPERADOR, FRENTE A SUPERMERCADO LA COLONIA"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Presupuesto en Lps."
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 4500000.00"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Nombre del constructor"
                placeholder="Ej: INGENIERO JOSE MANUEL FIGUEROA HERNANDEZ"
                value={nombreConstructor}
                onChange={(e) => setNombreConstructor(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 pt-xl mt-xl border-t border-neutral-border">
              <h3 className="text-h4 font-semibold mb-lg">Información del Recibo</h3>
            </div>

            <div>
              <Input
                label="Número de recibo"
                placeholder="Ej: 754320"
                value={numeroRecibo}
                onChange={(e) => setNumeroRecibo(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Valor de recibo"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 45000.00"
                value={valorRecibo}
                onChange={(e) => setValorRecibo(e.target.value)}
              />
            </div>
          </div>

          {/* Botón Siguiente (para futuras expansiones) */}
          <div className="flex justify-end pt-lg mt-lg">
            <Button
              variant="secondary"
              className="flex items-center gap-xs"
              onClick={() => {
                // TODO: Implementar siguiente paso del formulario
                alert('Funcionalidad de siguiente paso en desarrollo')
              }}
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-lg pt-xl mt-xl border-t border-neutral-border">
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleNuevo(e)}
              className="flex items-center gap-xs"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </Button>
            <Button
              type="button"
              onClick={(e) => handleGuardar(e)}
              className="flex items-center gap-xs"
            >
              <Save className="w-4 h-4" />
              Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleCancelar(e)}
              className="flex items-center gap-xs"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setVistaLista(true)}
              className="flex items-center gap-xs"
            >
              <List className="w-4 h-4" />
              Ver lista
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleImprimir()}
              className="flex items-center gap-xs"
              disabled={!isEditing && !selectedPermiso}
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de impresión */}
      <Modal
        isOpen={mostrarModalImpresion}
        onClose={handleCerrarModal}
        title="Imprimir Documento"
        size="xl"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={handleCerrarModal}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImprimirDocumento}
              disabled={!tipoDocumento}
              className="flex items-center gap-xs"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </>
        }
      >
        <div className="space-y-md">
          <div>
            <p className="text-base text-neutral-text mb-md">
              Selecciona el tipo de documento que deseas imprimir:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-md">
              <button
                onClick={() => handleSeleccionarTipoDocumento('permiso')}
                className={`p-md border-2 rounded-sm transition-colors text-left ${
                  tipoDocumento === 'permiso'
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-border hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-base mb-xs">Permiso de Construcción</div>
                <div className="text-sm text-neutral-text">
                  Documento completo con información del solicitante y datos del permiso
                </div>
              </button>
              <button
                onClick={() => handleSeleccionarTipoDocumento('sanciones')}
                className={`p-md border-2 rounded-sm transition-colors text-left ${
                  tipoDocumento === 'sanciones'
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-border hover:border-primary/50'
                }`}
              >
                <div className="font-semibold text-base mb-xs">Sanciones y Disposiciones</div>
                <div className="text-sm text-neutral-text">
                  Documento con sanciones y disposiciones para permisos de construcción
                </div>
              </button>
            </div>
          </div>

          {/* Vista previa del documento seleccionado */}
          {tipoDocumento && permisoAImprimir && (
            <div className="border border-neutral-border rounded-sm p-md bg-neutral-background max-h-[600px] overflow-y-auto">
              <div className="text-sm font-semibold mb-md text-neutral-text">
                Vista previa:
              </div>
              {tipoDocumento === 'permiso' ? (
                <PermisoConstruccionPrint permiso={permisoAImprimir} soloPermiso={true} />
              ) : (
                <SancionesDisposicionesConstruccionPrint 
                  permiso={{
                    numeroRecibo: permisoAImprimir.numeroRecibo,
                    valorRecibo: permisoAImprimir.valorRecibo
                  }} 
                />
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Componente de impresión (oculto en pantalla, visible al imprimir) */}
      {permisoAImprimir && tipoDocumento && (
        <div className="print-only" style={{ 
          position: 'fixed', 
          left: '-9999px', 
          top: '-9999px',
          visibility: 'hidden'
        }}>
          <style>{`
            @media print {
              .print-only {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                visibility: visible !important;
              }
            }
          `}</style>
          {tipoDocumento === 'permiso' ? (
            <PermisoConstruccionPrint permiso={permisoAImprimir} soloPermiso={true} />
          ) : (
            <SancionesDisposicionesConstruccionPrint 
              permiso={{
                numeroRecibo: permisoAImprimir.numeroRecibo,
                valorRecibo: permisoAImprimir.valorRecibo
              }} 
            />
          )}
        </div>
      )}
    </div>
  )
}
