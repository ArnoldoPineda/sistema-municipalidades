import { useState } from 'react'
import type { MouseEvent } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Modal from '@/components/ui/Modal'
import ConstanciaPagoSolvenciaPrint from '@/components/ConstanciaPagoSolvenciaPrint'
import SolvenciaQRPrint from '@/components/SolvenciaQRPrint'
import { Plus, Save, X, List, Printer, Edit, Trash2 } from 'lucide-react'

interface SolvenciaPersonal {
  id: string
  numeroSolvencia: string
  nombreContribuyente: string
  numeroIdentidad: string
  aldea: string
  barrioColonia: string
  numeroRecibo: string
  valorRecibo: string
  fechaCreacion: string
  estado: 'Vigente' | 'Vencida'
}

export default function Solvencias() {
  const [vistaLista, setVistaLista] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSolvencia, setSelectedSolvencia] = useState<SolvenciaPersonal | null>(null)
  const [solvenciaAImprimir, setSolvenciaAImprimir] = useState<SolvenciaPersonal | null>(null)
  const [mostrarModalImpresion, setMostrarModalImpresion] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState<'constancia' | 'qr' | null>(null)

  // Datos del formulario
  const [numeroSolvencia, setNumeroSolvencia] = useState('')
  const [nombreContribuyente, setNombreContribuyente] = useState('')
  const [numeroIdentidad, setNumeroIdentidad] = useState('')
  const [aldea, setAldea] = useState('')
  const [barrioColonia, setBarrioColonia] = useState('')
  const [numeroRecibo, setNumeroRecibo] = useState('')
  const [valorRecibo, setValorRecibo] = useState('')

  // Errores de validación
  const [errores, setErrores] = useState<Record<string, string>>({})

  // Datos de ejemplo
  const [solvencias, setSolvencias] = useState<SolvenciaPersonal[]>([
    {
      id: '34',
      numeroSolvencia: '0000034',
      nombreContribuyente: 'CARLOS ALBERTO ANDINO FLORES',
      numeroIdentidad: '0309-1974-00378',
      aldea: 'Marcovia',
      barrioColonia: 'Bo. El Centro De Marcovia',
      numeroRecibo: '86496',
      valorRecibo: '1700.00',
      fechaCreacion: '18/11/2025',
      estado: 'Vigente'
    },
  ])

  const aldeas = [
    { value: 'marcovia', label: 'Marcovia' },
    { value: 'cedeño', label: 'Cedeño' },
    { value: 'monjaras', label: 'Monjaras' },
    { value: 'guapinolito', label: 'Guapinolito' },
  ]

  const barrios = [
    { value: 'centro', label: 'Bo. El Centro De Marcovia', aldea: 'marcovia' },
    { value: 'buena-vista', label: 'Buena Vista', aldea: 'marcovia' },
    { value: 'cededo', label: 'Cededo', aldea: 'cedeño' },
    { value: 'familias-unidas', label: 'Col. Familias Unidas', aldea: 'cedeño' },
  ]

  const barriosFiltrados = aldea
    ? barrios.filter(b => b.aldea === aldea)
    : barrios

  // Generar número de solvencia automáticamente
  const generarNumeroSolvencia = () => {
    if (solvencias.length === 0) return '0000001'
    const siguienteNumero = Math.max(...solvencias.map(s => parseInt(s.numeroSolvencia))) + 1
    return siguienteNumero.toString().padStart(7, '0')
  }

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {}

    if (!nombreContribuyente.trim()) {
      nuevosErrores.nombreContribuyente = 'El nombre del contribuyente es requerido'
    }

    if (!numeroIdentidad.trim()) {
      nuevosErrores.numeroIdentidad = 'El número de identidad es requerido'
    } else if (!/^\d{4}-\d{4}-\d{5}$/.test(numeroIdentidad)) {
      nuevosErrores.numeroIdentidad = 'El formato de la identidad debe ser: ____-____-_____'
    }

    if (!aldea) {
      nuevosErrores.aldea = 'La aldea es requerida'
    }

    if (!barrioColonia) {
      nuevosErrores.barrioColonia = 'El barrio/colonia es requerido'
    }

    if (!numeroRecibo.trim()) {
      nuevosErrores.numeroRecibo = 'El número de recibo es requerido'
    }

    if (!valorRecibo.trim() || parseFloat(valorRecibo) <= 0) {
      nuevosErrores.valorRecibo = 'El valor del recibo es requerido y debe ser mayor a 0'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleNuevo = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsEditing(false)
    setSelectedSolvencia(null)
    const nuevoNumero = generarNumeroSolvencia()
    setNumeroSolvencia(nuevoNumero)
    setNombreContribuyente('')
    setNumeroIdentidad('')
    setAldea('')
    setBarrioColonia('')
    setNumeroRecibo('')
    setValorRecibo('')
    setVistaLista(false)
    setErrores({})
  }

  const handleGuardar = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!validarFormulario()) {
      return
    }

    const nuevaSolvencia: SolvenciaPersonal = {
      id: isEditing && selectedSolvencia ? selectedSolvencia.id : Date.now().toString(),
      numeroSolvencia: numeroSolvencia || generarNumeroSolvencia(),
      nombreContribuyente: nombreContribuyente.trim(),
      numeroIdentidad: numeroIdentidad.trim(),
      aldea,
      barrioColonia,
      numeroRecibo: numeroRecibo.trim(),
      valorRecibo: valorRecibo.trim(),
      fechaCreacion: isEditing && selectedSolvencia 
        ? selectedSolvencia.fechaCreacion 
        : new Date().toLocaleDateString('es-ES'),
      estado: 'Vigente'
    }

    if (isEditing && selectedSolvencia) {
      setSolvencias(solvencias.map(s => s.id === selectedSolvencia.id ? nuevaSolvencia : s))
    } else {
      setSolvencias([...solvencias, nuevaSolvencia])
    }

    limpiarFormulario()
    setIsEditing(false)
    setSelectedSolvencia(null)
    setErrores({})
  }

  const handleCancelar = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    limpiarFormulario()
    setIsEditing(false)
    setSelectedSolvencia(null)
    setErrores({})
  }

  const limpiarFormulario = () => {
    setNumeroSolvencia('')
    setNombreContribuyente('')
    setNumeroIdentidad('')
    setAldea('')
    setBarrioColonia('')
    setNumeroRecibo('')
    setValorRecibo('')
  }

  const handleEditar = (solvencia: SolvenciaPersonal) => {
    setSelectedSolvencia(solvencia)
    setIsEditing(true)
    setNumeroSolvencia(solvencia.numeroSolvencia)
    setNombreContribuyente(solvencia.nombreContribuyente)
    setNumeroIdentidad(solvencia.numeroIdentidad)
    setAldea(solvencia.aldea)
    setBarrioColonia(solvencia.barrioColonia)
    setNumeroRecibo(solvencia.numeroRecibo)
    setValorRecibo(solvencia.valorRecibo)
    setVistaLista(false)
    setErrores({})
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta solvencia?')) {
      setSolvencias(solvencias.filter(s => s.id !== id))
    }
  }

  const handleImprimir = (solvencia?: SolvenciaPersonal) => {
    const solvenciaParaImprimir = solvencia || (isEditing && selectedSolvencia ? selectedSolvencia : null)
    
    if (solvenciaParaImprimir) {
      setSolvenciaAImprimir(solvenciaParaImprimir)
      setMostrarModalImpresion(true)
      setTipoDocumento(null)
    } else {
      alert('No hay solvencia seleccionada para imprimir. Completa el formulario y guarda primero.')
    }
  }

  const handleCerrarModal = () => {
    setMostrarModalImpresion(false)
    setTipoDocumento(null)
    setSolvenciaAImprimir(null)
  }

  const handleImprimirDocumento = () => {
    if (!tipoDocumento) {
      alert('Por favor selecciona un tipo de documento para imprimir')
      return
    }

    setMostrarModalImpresion(false)
    setTimeout(() => {
      try {
        window.print()
        window.addEventListener('afterprint', () => {
          setTimeout(() => {
            setSolvenciaAImprimir(null)
            setTipoDocumento(null)
          }, 100)
        }, { once: true })
      } catch (error) {
        console.error('Error al imprimir:', error)
        setSolvenciaAImprimir(null)
        setTipoDocumento(null)
      }
    }, 100)
  }

  const formatIdentidad = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 4) return cleaned
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 13)}`
  }

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'Vigente': return 'success'
      case 'Vencida': return 'danger'
      default: return 'info'
    }
  }

  if (vistaLista) {
    return (
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold mb-xs">Registros de Solvencias</h1>
          </div>
          <div className="flex items-center gap-md">
            <span className="text-base text-neutral-text">Registros: {solvencias.length}</span>
            <Button onClick={() => setVistaLista(false)} className="flex items-center gap-xs">
              <Plus className="w-4 h-4" />
              Nueva Solvencia
            </Button>
          </div>
        </div>

        <Table headers={['#', 'N° Solvencia', 'Contribuyente', 'Identidad', 'Aldea', 'Barrio/Colonia', 'Fecha', 'Estado', 'Acciones']}>
          {solvencias.map((solvencia, index) => (
            <TableRow key={solvencia.id} stripe={index % 2 === 1}>
              <TableCell>{solvencia.id}</TableCell>
              <TableCell>{solvencia.numeroSolvencia}</TableCell>
              <TableCell>{solvencia.nombreContribuyente}</TableCell>
              <TableCell>{solvencia.numeroIdentidad}</TableCell>
              <TableCell>{solvencia.aldea}</TableCell>
              <TableCell>{solvencia.barrioColonia}</TableCell>
              <TableCell>{solvencia.fechaCreacion}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(solvencia.estado)}>
                  {solvencia.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-xs">
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleImprimir(solvencia)}
                    title="Imprimir"
                  >
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleEditar(solvencia)}
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="p-xs"
                    onClick={() => handleEliminar(solvencia.id)}
                    title="Eliminar"
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
          <h1 className="text-h1 font-bold mb-xs">Solvencias de Impuestos Personales Municipales</h1>
          <p className="text-base text-neutral-text">Registra y gestiona solvencias de impuestos personales</p>
        </div>
      </div>

      <Card>
        <div className="space-y-lg p-lg">
          {/* Título de sección */}
          <div className="text-center mb-xl">
            <h2 className="text-h3 font-semibold mb-lg">Contribuyente</h2>
          </div>

          {/* Campos del formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <Input
              label="N° de solvencia"
              placeholder="0000034"
              value={numeroSolvencia}
              onChange={(e) => setNumeroSolvencia(e.target.value)}
              disabled={!isEditing}
            />

            <Input
              label="Nombre del contribuyente *"
              placeholder="Ej: CARLOS ALBERTO ANDINO FLORES"
              value={nombreContribuyente}
              onChange={(e) => {
                setNombreContribuyente(e.target.value)
                if (errores.nombreContribuyente) {
                  const nuevosErrores = { ...errores }
                  delete nuevosErrores.nombreContribuyente
                  setErrores(nuevosErrores)
                }
              }}
              error={errores.nombreContribuyente}
            />

            <Input
              label="Número de identidad *"
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

            <div>
              <label className="block text-sm text-gray-700 mb-xs">Aldea *</label>
              <Select
                options={[
                  { value: '', label: 'Seleccionar aldea' },
                  ...aldeas
                ]}
                value={aldea}
                onChange={(e) => {
                  setAldea(e.target.value)
                  setBarrioColonia('')
                  if (errores.aldea) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.aldea
                    setErrores(nuevosErrores)
                  }
                }}
              />
              {errores.aldea && (
                <p className="text-xs text-danger mt-xs">{errores.aldea}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-xs">Barrio / Colonia *</label>
              <Select
                options={[
                  { value: '', label: 'Seleccionar barrio/colonia' },
                  ...barriosFiltrados.map(b => ({ value: b.value, label: b.label }))
                ]}
                value={barrioColonia}
                onChange={(e) => {
                  setBarrioColonia(e.target.value)
                  if (errores.barrioColonia) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.barrioColonia
                    setErrores(nuevosErrores)
                  }
                }}
                disabled={!aldea}
              />
              {errores.barrioColonia && (
                <p className="text-xs text-danger mt-xs">{errores.barrioColonia}</p>
              )}
              {barrioColonia && (
                <div className="mt-xs">
                  <Tag
                    onRemove={() => {
                      setBarrioColonia('')
                    }}
                  >
                    {barrios.find(b => b.value === barrioColonia)?.label}
                  </Tag>
                </div>
              )}
            </div>

            <Input
              label="Número de recibo *"
              placeholder="Ej: 86496"
              value={numeroRecibo}
              onChange={(e) => {
                setNumeroRecibo(e.target.value)
                if (errores.numeroRecibo) {
                  const nuevosErrores = { ...errores }
                  delete nuevosErrores.numeroRecibo
                  setErrores(nuevosErrores)
                }
              }}
              error={errores.numeroRecibo}
            />

            <Input
              label="Valor de recibo *"
              placeholder="Ej: 1700"
              type="number"
              step="0.01"
              min="0"
              value={valorRecibo}
              onChange={(e) => {
                setValorRecibo(e.target.value)
                if (errores.valorRecibo) {
                  const nuevosErrores = { ...errores }
                  delete nuevosErrores.valorRecibo
                  setErrores(nuevosErrores)
                }
              }}
              error={errores.valorRecibo}
            />
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
              disabled={!isEditing && !selectedSolvencia && !nombreContribuyente}
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de selección de impresión */}
      <Modal
        isOpen={mostrarModalImpresion}
        onClose={handleCerrarModal}
        title="Seleccionar tipo de documento para imprimir"
      >
        <div className="space-y-lg">
          {/* Opciones de selección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <button
              type="button"
              onClick={() => setTipoDocumento('constancia')}
              className={`p-lg border-2 rounded-sm text-left transition-colors ${
                tipoDocumento === 'constancia'
                  ? 'border-primary bg-primary-background'
                  : 'border-neutral-border hover:border-primary hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold mb-xs">Constancia de Pago</div>
              <div className="text-sm text-neutral-text">
                Documento oficial de constancia de pago de impuestos personales municipales
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTipoDocumento('qr')}
              className={`p-lg border-2 rounded-sm text-left transition-colors ${
                tipoDocumento === 'qr'
                  ? 'border-primary bg-primary-background'
                  : 'border-neutral-border hover:border-primary hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold mb-xs">Solvencia con QR</div>
              <div className="text-sm text-neutral-text">
                Documento con código QR y firma del alcalde municipal
              </div>
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-md pt-md border-t border-neutral-border">
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
          </div>

          {/* Vista previa del documento seleccionado */}
          {tipoDocumento && solvenciaAImprimir && (
            <div className="border border-neutral-border rounded-sm p-md bg-neutral-background max-h-[600px] overflow-y-auto">
              <div className="text-sm font-semibold mb-md text-neutral-text">
                Vista previa:
              </div>
              {tipoDocumento === 'constancia' ? (
                <ConstanciaPagoSolvenciaPrint solvencia={solvenciaAImprimir} />
              ) : (
                <SolvenciaQRPrint solvencia={solvenciaAImprimir} />
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Componente de impresión (oculto en pantalla, visible al imprimir) */}
      {solvenciaAImprimir && tipoDocumento && (
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
          {tipoDocumento === 'constancia' ? (
            <ConstanciaPagoSolvenciaPrint solvencia={solvenciaAImprimir} />
          ) : (
            <SolvenciaQRPrint solvencia={solvenciaAImprimir} />
          )}
        </div>
      )}
    </div>
  )
}