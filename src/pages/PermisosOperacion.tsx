import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import PermisoOperacionPrint from '@/components/PermisoOperacionPrint'
import { Plus, Save, X, List, Printer, Edit, Trash2 } from 'lucide-react'

interface PermisoOperacion {
  id: string
  nombreNegocio: string
  propietario: string
  aldea: string
  barrioColonia: string
  direccion: string
  rtnEmpresa: string
  identidad: string
  actividadesEconomicas: string[]
  numeroRecibo: string
  valorRecibo: string
  fechaCreacion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
}

export default function PermisosOperacion() {
  const [vistaLista, setVistaLista] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPermiso, setSelectedPermiso] = useState<PermisoOperacion | null>(null)
  const [fechaInicial, setFechaInicial] = useState('')
  const [fechaFinal, setFechaFinal] = useState('')
  const [busquedaLista, setBusquedaLista] = useState('')

  // Datos del formulario
  const [nombreNegocio, setNombreNegocio] = useState('')
  const [propietario, setPropietario] = useState('')
  const [aldea, setAldea] = useState('')
  const [barrioColonia, setBarrioColonia] = useState('')
  const [direccion, setDireccion] = useState('')
  const [rtnEmpresa, setRtnEmpresa] = useState('')
  const [identidad, setIdentidad] = useState('')
  const [actividadesEconomicas, setActividadesEconomicas] = useState<string[]>([])
  const [nuevaActividad, setNuevaActividad] = useState('')
  const [numeroRecibo, setNumeroRecibo] = useState('')
  const [valorRecibo, setValorRecibo] = useState('')

  // Errores de validación
  const [errores, setErrores] = useState<Record<string, string>>({})

  // Datos de ejemplo
  const [permisos, setPermisos] = useState<PermisoOperacion[]>([
    {
      id: '18',
      nombreNegocio: 'BENDITO CAFE',
      propietario: 'JULIO ERNESTO MARTINEZ',
      aldea: 'Cedeño',
      barrioColonia: 'Cededo',
      direccion: 'Calle Principal',
      rtnEmpresa: '3255-6757-67890',
      identidad: '4564-6566-78901',
      actividadesEconomicas: ['Cafeterías'],
      numeroRecibo: '69865',
      valorRecibo: '1000.00',
      fechaCreacion: '12/11/2025',
      estado: 'Aprobado'
    },
    {
      id: '19',
      nombreNegocio: 'GASOLINERA CONTRERAS',
      propietario: 'JORGE CONTRERAS LOPEZ',
      aldea: 'Cedeño',
      barrioColonia: 'Cededo',
      direccion: 'Carretera Principal',
      rtnEmpresa: '9832-9829-01234',
      identidad: '8239-8943-21098',
      actividadesEconomicas: ['Gasolineras'],
      numeroRecibo: '8794',
      valorRecibo: '2000.00',
      fechaCreacion: '17/11/2025',
      estado: 'Aprobado'
    },
    {
      id: '20',
      nombreNegocio: 'FERRETERIA EL MAESTRO',
      propietario: 'JOSE ANTONIO MARTINEZ SUAZO',
      aldea: 'Monjaras',
      barrioColonia: 'Buena Vista',
      direccion: 'FRENTE AL BANCO DE OCCIDENTE',
      rtnEmpresa: '9990-8976-456345',
      identidad: '0309-1970-12389',
      actividadesEconomicas: ['Ferreterías'],
      numeroRecibo: '5439',
      valorRecibo: '6000.00',
      fechaCreacion: '18/11/2025',
      estado: 'Aprobado'
    },
  ])

  const aldeas = [
    { value: 'cedeño', label: 'Cedeño' },
    { value: 'marcovia', label: 'Marcovia' },
    { value: 'guapinolito', label: 'Guapinolito' },
    { value: 'monjaras', label: 'Monjaras' },
    { value: 'buena-vista', label: 'Buena Vista' },
  ]

  const barrios = [
    { value: 'cededo', label: 'Cededo', aldea: 'cedeño' },
    { value: 'familias-unidas', label: 'Col. Familias Unidas', aldea: 'cedeño' },
    { value: 'francesa', label: 'Col. Francesa O El Venado', aldea: 'cedeño' },
    { value: 'matapalo', label: 'El Matapalo', aldea: 'cedeño' },
    { value: 'guipo', label: 'Guipo', aldea: 'cedeño' },
    { value: 'buena-vista', label: 'Buena Vista', aldea: 'monjaras' },
    { value: 'centro', label: 'Centro', aldea: 'monjaras' },
  ]

  const actividadesDisponibles = [
    'Ferreterías',
    'Venta de productos de consumo básico',
    'Reparación de vehículos',
    'Restaurantes',
    'Farmacias',
    'Tiendas de ropa',
    'Servicios de belleza',
    'Talleres mecánicos',
    'Comercio en general',
    'Servicios profesionales',
  ]

  const barriosFiltrados = aldea
    ? barrios.filter(b => b.aldea === aldea)
    : barrios

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {}

    if (!nombreNegocio.trim()) {
      nuevosErrores.nombreNegocio = 'El nombre del negocio es requerido'
    }

    if (!propietario.trim()) {
      nuevosErrores.propietario = 'El propietario es requerido'
    }

    if (!aldea) {
      nuevosErrores.aldea = 'La aldea es requerida'
    }

    if (!barrioColonia) {
      nuevosErrores.barrioColonia = 'El barrio/colonia es requerido'
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida'
    }

    if (!identidad.trim()) {
      nuevosErrores.identidad = 'La identidad es requerida'
    }

    if (actividadesEconomicas.length === 0) {
      nuevosErrores.actividadesEconomicas = 'Debe agregar al menos una actividad económica'
    }

    if (!numeroRecibo.trim()) {
      nuevosErrores.numeroRecibo = 'El número de recibo es requerido'
    }

    if (!valorRecibo.trim() || parseFloat(valorRecibo) <= 0) {
      nuevosErrores.valorRecibo = 'El valor del recibo es requerido y debe ser mayor a 0'
    }

    // Validar formato de RTN si se proporciona
    if (rtnEmpresa && !/^\d{3}-\d{6}-\d{4}$/.test(rtnEmpresa)) {
      nuevosErrores.rtnEmpresa = 'El formato del RTN debe ser: ___-______-____'
    }

    // Validar formato de Identidad
    if (identidad && !/^\d{4}-\d{4}-\d{5}$/.test(identidad)) {
      nuevosErrores.identidad = 'El formato de la identidad debe ser: ____-____-_____'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleNuevo = () => {
    setIsEditing(false)
    setSelectedPermiso(null)
    limpiarFormulario()
    setVistaLista(false)
    setErrores({})
  }

  const handleGuardar = () => {
    if (!validarFormulario()) {
      return
    }

    const nuevoPermiso: PermisoOperacion = {
      id: isEditing && selectedPermiso ? selectedPermiso.id : Date.now().toString(),
      nombreNegocio: nombreNegocio.trim(),
      propietario: propietario.trim(),
      aldea,
      barrioColonia,
      direccion: direccion.trim(),
      rtnEmpresa: rtnEmpresa.trim(),
      identidad: identidad.trim(),
      actividadesEconomicas,
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

  const handleCancelar = () => {
    limpiarFormulario()
    setIsEditing(false)
    setSelectedPermiso(null)
    setErrores({})
  }

  const limpiarFormulario = () => {
    setNombreNegocio('')
    setPropietario('')
    setAldea('')
    setBarrioColonia('')
    setDireccion('')
    setRtnEmpresa('')
    setIdentidad('')
    setActividadesEconomicas([])
    setNuevaActividad('')
    setNumeroRecibo('')
    setValorRecibo('')
  }

  const handleEditar = (permiso: PermisoOperacion) => {
    setSelectedPermiso(permiso)
    setIsEditing(true)
    setNombreNegocio(permiso.nombreNegocio)
    setPropietario(permiso.propietario)
    setAldea(permiso.aldea)
    setBarrioColonia(permiso.barrioColonia)
    setDireccion(permiso.direccion)
    setRtnEmpresa(permiso.rtnEmpresa)
    setIdentidad(permiso.identidad)
    setActividadesEconomicas(permiso.actividadesEconomicas)
    setNumeroRecibo(permiso.numeroRecibo)
    setValorRecibo(permiso.valorRecibo)
    setVistaLista(false)
    setErrores({})
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este permiso?')) {
      setPermisos(permisos.filter(p => p.id !== id))
    }
  }

  const [permisoAImprimir, setPermisoAImprimir] = useState<PermisoOperacion | null>(null)

  const handleImprimir = (permiso?: PermisoOperacion) => {
    let permisoParaImprimir: PermisoOperacion | null = null

    if (permiso) {
      permisoParaImprimir = permiso
    } else if (isEditing && selectedPermiso) {
      permisoParaImprimir = selectedPermiso
    } else if (nombreNegocio && propietario) {
      // Crear permiso temporal desde el formulario actual
      permisoParaImprimir = {
        id: Date.now().toString(),
        nombreNegocio,
        propietario,
        aldea,
        barrioColonia,
        direccion,
        rtnEmpresa,
        identidad,
        actividadesEconomicas,
        numeroRecibo,
        valorRecibo,
        fechaCreacion: new Date().toLocaleDateString('es-ES'),
        estado: 'Pendiente'
      }
    }

    if (permisoParaImprimir) {
      console.log('Preparando impresión de permiso:', permisoParaImprimir)
      setPermisoAImprimir(permisoParaImprimir)
      
      // Esperar a que el componente se renderice completamente
      setTimeout(() => {
        try {
          console.log('Abriendo diálogo de impresión...')
          window.print()
          
          // Limpiar después de imprimir (cuando se cierre el diálogo)
          const handleAfterPrint = () => {
            console.log('Impresión completada, limpiando...')
            setTimeout(() => {
              setPermisoAImprimir(null)
            }, 100)
          }
          
          // Intentar usar afterprint, si no está disponible, limpiar después de un tiempo
          if (window.matchMedia) {
            window.addEventListener('afterprint', handleAfterPrint, { once: true })
          } else {
            // Fallback para navegadores que no soportan afterprint
            setTimeout(handleAfterPrint, 1000)
          }
        } catch (error) {
          console.error('Error al imprimir:', error)
          alert('Error al abrir el diálogo de impresión. Por favor, intenta de nuevo.')
          setPermisoAImprimir(null)
        }
      }, 800)
    } else {
      alert('No hay permiso seleccionado para imprimir. Completa al menos el nombre del negocio y propietario.')
    }
  }

  const handleAgregarActividad = () => {
    if (nuevaActividad.trim() && !actividadesEconomicas.includes(nuevaActividad.trim())) {
      setActividadesEconomicas([...actividadesEconomicas, nuevaActividad.trim()])
      setNuevaActividad('')
      if (errores.actividadesEconomicas) {
        const nuevosErrores = { ...errores }
        delete nuevosErrores.actividadesEconomicas
        setErrores(nuevosErrores)
      }
    }
  }

  const handleRemoverActividad = (actividad: string) => {
    setActividadesEconomicas(actividadesEconomicas.filter(a => a !== actividad))
  }

  const formatRTN = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 9)}-${cleaned.slice(9, 13)}`
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

  // Filtrar permisos para la lista
  const permisosFiltrados = permisos.filter(permiso => {
    const matchBusqueda = !busquedaLista || 
      permiso.nombreNegocio.toLowerCase().includes(busquedaLista.toLowerCase()) ||
      permiso.propietario.toLowerCase().includes(busquedaLista.toLowerCase()) ||
      permiso.numeroRecibo.toLowerCase().includes(busquedaLista.toLowerCase())
    
    const matchFechaInicial = !fechaInicial || 
      new Date(permiso.fechaCreacion.split('/').reverse().join('-')) >= new Date(fechaInicial)
    
    const matchFechaFinal = !fechaFinal || 
      new Date(permiso.fechaCreacion.split('/').reverse().join('-')) <= new Date(fechaFinal)
    
    return matchBusqueda && matchFechaInicial && matchFechaFinal
  })

  // Formatear número de permiso
  const formatNumeroPermiso = (id: string) => {
    return id.padStart(5, '0')
  }

  if (vistaLista) {
    return (
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-h1 font-bold mb-xs">Registros de permisos de operación</h1>
          </div>
          <div className="flex items-center gap-md">
            <span className="text-base text-neutral-text">Registros: {permisosFiltrados.length}</span>
            <Button onClick={() => setVistaLista(false)} className="flex items-center gap-xs">
              <Plus className="w-4 h-4" />
              Nuevo Permiso
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <div className="space-y-md">
            <Input
              placeholder="Buscar"
              value={busquedaLista}
              onChange={(e) => setBusquedaLista(e.target.value)}
              className="w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="Fecha inicial"
                type="date"
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
              />
              <Input
                label="Final"
                type="date"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Tabla completa */}
        <div className="overflow-x-auto">
          <Table headers={[
            'No. permiso', 
            'Fecha del registro', 
            'Negocio', 
            'Propietario', 
            'RTN', 
            'Identidad', 
            'Actividades', 
            'No. Recibo', 
            'Valor', 
            'Aldea', 
            'Sector',
            'Estado',
            'Acciones'
          ]}>
            {permisosFiltrados.map((permiso, index) => (
              <TableRow key={permiso.id} stripe={index % 2 === 1}>
                <TableCell>{formatNumeroPermiso(permiso.id)}</TableCell>
                <TableCell>{permiso.fechaCreacion}</TableCell>
                <TableCell>{permiso.nombreNegocio}</TableCell>
                <TableCell>{permiso.propietario}</TableCell>
                <TableCell>{permiso.rtnEmpresa || '-'}</TableCell>
                <TableCell>{permiso.identidad}</TableCell>
                <TableCell>{permiso.actividadesEconomicas.join(', ')}</TableCell>
                <TableCell>{permiso.numeroRecibo}</TableCell>
                <TableCell>
                  {parseFloat(permiso.valorRecibo || '0').toLocaleString('es-HN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell>{permiso.aldea}</TableCell>
                <TableCell>{permiso.barrioColonia}</TableCell>
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
                      title="Imprimir"
                    >
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      className="p-xs"
                      onClick={() => handleEditar(permiso)}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="danger"
                      className="p-xs"
                      onClick={() => handleEliminar(permiso.id)}
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

        {/* Botón de imprimir destacado */}
        {selectedPermiso && (
          <div className="flex justify-end">
            <Button
              onClick={() => handleImprimir(selectedPermiso)}
              className="flex items-center gap-xs"
            >
              <Printer className="w-5 h-5" />
              Imprimir
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Permiso de Operación</h1>
          <p className="text-base text-neutral-text">Registra y gestiona permisos de operación</p>
        </div>
      </div>

      <Card>
        <div className="space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <Input
                label="Nombre del negocio *"
                placeholder="Ej: FERRETERIA EL MAESTRO"
                value={nombreNegocio}
                onChange={(e) => {
                  setNombreNegocio(e.target.value)
                  if (errores.nombreNegocio) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.nombreNegocio
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.nombreNegocio}
              />
            </div>

            <div>
              <Input
                label="Propietario *"
                placeholder="Ej: JOSE ANTONIO MARTINEZ SUAZO"
                value={propietario}
                onChange={(e) => {
                  setPropietario(e.target.value)
                  if (errores.propietario) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.propietario
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.propietario}
              />
            </div>

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

            <div className="md:col-span-2">
              <Input
                label="Dirección actual *"
                placeholder="Ej: FRENTE AL BANCO DE OCCIDENTE"
                value={direccion}
                onChange={(e) => {
                  setDireccion(e.target.value)
                  if (errores.direccion) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.direccion
                    setErrores(nuevosErrores)
                  }
                }}
                error={errores.direccion}
              />
            </div>

            <div>
              <Input
                label="RTN de la empresa"
                placeholder="___-______-____"
                value={rtnEmpresa}
                onChange={(e) => {
                  setRtnEmpresa(formatRTN(e.target.value))
                  if (errores.rtnEmpresa) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.rtnEmpresa
                    setErrores(nuevosErrores)
                  }
                }}
                maxLength={15}
                error={errores.rtnEmpresa}
              />
            </div>

            <div>
              <Input
                label="Identidad *"
                placeholder="____-____-_____"
                value={identidad}
                onChange={(e) => {
                  setIdentidad(formatIdentidad(e.target.value))
                  if (errores.identidad) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.identidad
                    setErrores(nuevosErrores)
                  }
                }}
                maxLength={16}
                error={errores.identidad}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-xs">
                Actividades económicas *
              </label>
              <div className="flex gap-md mb-xs">
                <Select
                  options={[
                    { value: '', label: 'Seleccionar actividad' },
                    ...actividadesDisponibles
                      .filter(a => !actividadesEconomicas.includes(a))
                      .map(a => ({ value: a, label: a }))
                  ]}
                  value={nuevaActividad}
                  onChange={(e) => setNuevaActividad(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAgregarActividad}
                  disabled={!nuevaActividad}
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </Button>
              </div>
              {actividadesEconomicas.length > 0 && (
                <div className="flex flex-wrap gap-xs">
                  {actividadesEconomicas.map((actividad, index) => (
                    <Tag key={index} onRemove={() => handleRemoverActividad(actividad)}>
                      {actividad}
                    </Tag>
                  ))}
                </div>
              )}
              {errores.actividadesEconomicas && (
                <p className="text-xs text-danger mt-xs">{errores.actividadesEconomicas}</p>
              )}
            </div>

            <div>
              <Input
                label="Número de recibo *"
                placeholder="Ej: 5439"
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
            </div>

            <div>
              <Input
                label="Valor de recibo *"
                placeholder="Ej: 6000"
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
              disabled={!isEditing && !selectedPermiso && !nombreNegocio}
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </Card>

      {/* Componente de impresión */}
      {permisoAImprimir && (
        <PermisoOperacionPrint permiso={permisoAImprimir} />
      )}
    </div>
  )
}
