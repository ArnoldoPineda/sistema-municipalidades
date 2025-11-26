import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import Modal from '@/components/ui/Modal'
import PermisoOperacionPrint from '@/components/PermisoOperacionPrint'
import SancionesDisposicionesPrint from '@/components/SancionesDisposicionesPrint'
import { permisosService } from '@/services/permisosService'
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
    if (rtnEmpresa && !/^\d{4}-\d{4}-\d{5}-\d{1}$/.test(rtnEmpresa)) {
      nuevosErrores.rtnEmpresa = 'El formato del RTN debe ser: ____-____-_____-_'
    }

    // Validar formato de Identidad
    if (identidad && !/^\d{4}-\d{4}-\d{5}$/.test(identidad)) {
      nuevosErrores.identidad = 'El formato de la identidad debe ser: ____-____-_____'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleNuevo = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsEditing(false)
    setSelectedPermiso(null)
    limpiarFormulario()
    setVistaLista(false)
    setErrores({})
  }

  const handleGuardar = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!validarFormulario()) {
      return
    }

    try {
      // Convertir fecha al formato ISO para Supabase
      let fechaEmision: string | undefined
      if (isEditing && selectedPermiso) {
        // Si estamos editando, convertir la fecha del formato local al ISO
        if (selectedPermiso.fechaCreacion.includes('/')) {
          // Formato DD/MM/YYYY a YYYY-MM-DD
          const [dia, mes, año] = selectedPermiso.fechaCreacion.split('/')
          fechaEmision = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
        } else {
          fechaEmision = selectedPermiso.fechaCreacion
        }
      } else {
        fechaEmision = new Date().toISOString().split('T')[0]
      }

      // Validar que los campos requeridos no estén vacíos
      if (!nombreNegocio || !nombreNegocio.trim()) {
        alert('El nombre del negocio es requerido')
        return
      }
      if (!propietario || !propietario.trim()) {
        alert('El propietario es requerido')
        return
      }
      if (!identidad || !identidad.trim()) {
        alert('La identidad es requerida')
        return
      }

      // Preparar datos para Supabase
      const permisoData: any = {
        nombre_empresa: nombreNegocio.trim(),
        nombre_propietario: propietario.trim(),
        rtn_empresa: rtnEmpresa.trim() || null,
        numero_identidad: identidad.trim(), // Asegurar que no sea null
        direccion: direccion.trim() || null,
        aldea_id: aldea || null, // Por ahora guardamos como string, luego se puede mapear a UUID
        barrio_colonia_id: barrioColonia || null, // Por ahora guardamos como string, luego se puede mapear a UUID
        numero_recibo: numeroRecibo.trim() || null,
        valor_recibo: valorRecibo.trim() ? parseFloat(valorRecibo.trim()) : null,
        estado: isEditing && selectedPermiso 
          ? selectedPermiso.estado 
          : 'Pendiente',
        observaciones: actividadesEconomicas.length > 0 
          ? `Actividades: ${actividadesEconomicas.join(', ')}` 
          : null
      }

      // Solo agregar fecha_emision si existe la columna (manejar error si no existe)
      if (fechaEmision) {
        permisoData.fecha_emision = fechaEmision
      }

      let permisoGuardado

      if (isEditing && selectedPermiso) {
        // Actualizar permiso existente
        permisoGuardado = await permisosService.updatePermisoOperacion(selectedPermiso.id, permisoData)
        
        // Actualizar actividades
        // Primero eliminar actividades existentes y luego agregar las nuevas
        // Por simplicidad, guardamos las actividades en observaciones por ahora
        // TODO: Implementar gestión completa de actividades en tabla de relación
        
        // Actualizar estado local
        const permisoActualizado: PermisoOperacion = {
          id: permisoGuardado.id,
          nombreNegocio: permisoGuardado.nombre_empresa,
          propietario: permisoGuardado.nombre_propietario,
          aldea: permisoGuardado.aldea_id || '',
          barrioColonia: permisoGuardado.barrio_colonia_id || '',
          direccion: permisoGuardado.direccion || '',
          rtnEmpresa: permisoGuardado.rtn_empresa || '',
          identidad: permisoGuardado.numero_identidad,
          actividadesEconomicas,
          numeroRecibo: permisoGuardado.numero_recibo || '',
          valorRecibo: permisoGuardado.valor_recibo?.toString() || '',
          fechaCreacion: permisoGuardado.fecha_emision || fechaEmision,
          estado: permisoGuardado.estado as 'Pendiente' | 'Aprobado' | 'Rechazado'
        }
        setPermisos(permisos.map(p => p.id === selectedPermiso.id ? permisoActualizado : p))
      } else {
        // Crear nuevo permiso
        permisoGuardado = await permisosService.createPermisoOperacion(permisoData)
        
        // Agregar actividades (por ahora en observaciones)
        // TODO: Implementar gestión completa de actividades
        
        // Actualizar estado local
        const nuevoPermiso: PermisoOperacion = {
          id: permisoGuardado.id,
          nombreNegocio: permisoGuardado.nombre_empresa,
          propietario: permisoGuardado.nombre_propietario,
          aldea: permisoGuardado.aldea_id || '',
          barrioColonia: permisoGuardado.barrio_colonia_id || '',
          direccion: permisoGuardado.direccion || '',
          rtnEmpresa: permisoGuardado.rtn_empresa || '',
          identidad: permisoGuardado.numero_identidad,
          actividadesEconomicas,
          numeroRecibo: permisoGuardado.numero_recibo || '',
          valorRecibo: permisoGuardado.valor_recibo?.toString() || '',
          fechaCreacion: permisoGuardado.fecha_emision || fechaEmision,
          estado: permisoGuardado.estado as 'Pendiente' | 'Aprobado' | 'Rechazado'
        }
        setPermisos([...permisos, nuevoPermiso])
      }

      limpiarFormulario()
      setIsEditing(false)
      setSelectedPermiso(null)
      setErrores({})
      
      alert('Permiso guardado exitosamente')
    } catch (error: any) {
      console.error('Error al guardar permiso:', error)
      alert(`Error al guardar permiso: ${error.message || 'Error desconocido'}`)
    }
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

  const handleEliminar = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este permiso?')) {
      try {
        await permisosService.deletePermisoOperacion(id)
        setPermisos(permisos.filter(p => p.id !== id))
        alert('Permiso eliminado exitosamente')
      } catch (error: any) {
        console.error('Error al eliminar permiso:', error)
        alert(`Error al eliminar permiso: ${error.message || 'Error desconocido'}`)
      }
    }
  }

  // Cargar permisos desde Supabase al montar el componente
  useEffect(() => {
    const cargarPermisos = async () => {
      try {
        const datos = await permisosService.getPermisosOperacion()
        if (datos && datos.length > 0) {
          // Mapear datos de Supabase al formato local
          const permisosMapeados: PermisoOperacion[] = datos.map((p: any) => ({
            id: p.id,
            nombreNegocio: p.nombre_empresa || '',
            propietario: p.nombre_propietario || '',
            aldea: p.aldea_id || '',
            barrioColonia: p.barrio_colonia_id || '',
            direccion: p.direccion || '',
            rtnEmpresa: p.rtn_empresa || '',
            identidad: p.numero_identidad || '',
            actividadesEconomicas: [], // TODO: Cargar desde tabla de relación
            numeroRecibo: p.numero_recibo || '',
            valorRecibo: p.valor_recibo?.toString() || '',
            fechaCreacion: p.fecha_emision || new Date().toLocaleDateString('es-ES'),
            estado: p.estado || 'Pendiente'
          }))
          setPermisos(permisosMapeados)
        }
      } catch (error) {
        console.error('Error al cargar permisos:', error)
        // Mantener datos de ejemplo si falla la carga
      }
    }
    cargarPermisos()
  }, [])

  const [permisoAImprimir, setPermisoAImprimir] = useState<PermisoOperacion | null>(null)
  const [mostrarModalImpresion, setMostrarModalImpresion] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState<'permiso' | 'sanciones' | null>(null)

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
      setPermisoAImprimir(permisoParaImprimir)
      setMostrarModalImpresion(true)
      setTipoDocumento(null)
    } else {
      alert('No hay permiso seleccionado para imprimir. Completa al menos el nombre del negocio y propietario.')
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

    // Esperar a que el componente se renderice completamente
    setTimeout(() => {
      try {
        window.print()
        
        // Limpiar después de imprimir
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
    if (cleaned.length <= 4) return cleaned
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    if (cleaned.length <= 13) return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 13)}-${cleaned.slice(13, 14)}`
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
        <div className="space-y-lg p-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
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
              {!aldea ? (
                <div className="w-full px-md py-sm border border-neutral-border rounded-sm bg-gray-100 text-gray-500">
                  Seleccione una aldea primero
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="md:col-span-2 mt-md">
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

            <div className="md:col-span-2">
              <Input
                label="RTN de la empresa"
                placeholder="____-____-_____-_"
                value={rtnEmpresa}
                onChange={(e) => {
                  setRtnEmpresa(formatRTN(e.target.value))
                  if (errores.rtnEmpresa) {
                    const nuevosErrores = { ...errores }
                    delete nuevosErrores.rtnEmpresa
                    setErrores(nuevosErrores)
                  }
                }}
                maxLength={17}
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

            <div className="md:col-span-2 mt-md">
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
                  onChange={(e) => {
                    const actividadSeleccionada = e.target.value
                    setNuevaActividad(actividadSeleccionada)
                    // Agregar automáticamente cuando se selecciona una actividad
                    if (actividadSeleccionada && actividadSeleccionada !== '' && !actividadesEconomicas.includes(actividadSeleccionada)) {
                      setActividadesEconomicas([...actividadesEconomicas, actividadSeleccionada])
                      setNuevaActividad('') // Limpiar el selector
                      if (errores.actividadesEconomicas) {
                        const nuevosErrores = { ...errores }
                        delete nuevosErrores.actividadesEconomicas
                        setErrores(nuevosErrores)
                      }
                    }
                  }}
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
              disabled={!isEditing && !selectedPermiso && !nombreNegocio}
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
                <div className="font-semibold text-base mb-xs">Permiso de Operación</div>
                <div className="text-sm text-neutral-text">
                  Documento completo con información del negocio, propietario y datos del permiso
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
                  Documento con sanciones, disposiciones e información del recibo
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
                <PermisoOperacionPrint permiso={permisoAImprimir} soloPermiso={true} />
              ) : (
                <SancionesDisposicionesPrint 
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
            <PermisoOperacionPrint permiso={permisoAImprimir} soloPermiso={true} />
          ) : (
            <SancionesDisposicionesPrint 
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
