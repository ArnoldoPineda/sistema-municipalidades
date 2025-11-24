import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { Plus, Save, X, List, Printer, Edit, Trash2, ArrowRight } from 'lucide-react'

interface PermisoConstruccion {
  id: string
  concedePermisoA: string
  numeroIdentidad: string
  claveCatastral: string
  paraConstruir: string
  fechaCreacion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
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

  const handleNuevo = () => {
    setIsEditing(false)
    setSelectedPermiso(null)
    limpiarFormulario()
    setVistaLista(false)
  }

  const handleGuardar = () => {
    if (!validarFormulario()) {
      return
    }

    const nuevoPermiso: PermisoConstruccion = {
      id: isEditing && selectedPermiso ? selectedPermiso.id : Date.now().toString(),
      concedePermisoA: concedePermisoA.trim(),
      numeroIdentidad: numeroIdentidad.trim(),
      claveCatastral: claveCatastral.trim(),
      paraConstruir: paraConstruir.trim(),
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

  const handleCancelar = () => {
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
  }

  const handleEditar = (permiso: PermisoConstruccion) => {
    setSelectedPermiso(permiso)
    setIsEditing(true)
    setConcedePermisoA(permiso.concedePermisoA)
    setNumeroIdentidad(permiso.numeroIdentidad)
    setClaveCatastral(permiso.claveCatastral)
    setParaConstruir(permiso.paraConstruir)
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
      // TODO: Implementar impresión de permiso de construcción
      console.log('Imprimir permiso de construcción:', permisoParaImprimir)
      alert('Funcionalidad de impresión de permiso de construcción en desarrollo')
    } else {
      alert('No hay permiso seleccionado para imprimir.')
    }
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
        <div className="space-y-md">
          {/* Título de sección */}
          <div className="text-center mb-lg">
            <h2 className="text-h3 font-semibold mb-md">Solicitante</h2>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-md">
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

          {/* Botón Siguiente (para futuras expansiones) */}
          <div className="flex justify-end pt-md">
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
          <div className="flex flex-wrap gap-md pt-md border-t border-neutral-border">
            <Button
              variant="secondary"
              onClick={handleNuevo}
              className="flex items-center gap-xs"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </Button>
            <Button
              onClick={handleGuardar}
              className="flex items-center gap-xs"
            >
              <Save className="w-4 h-4" />
              Guardar
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelar}
              className="flex items-center gap-xs"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setVistaLista(true)}
              className="flex items-center gap-xs"
            >
              <List className="w-4 h-4" />
              Ver lista
            </Button>
            <Button
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
    </div>
  )
}
