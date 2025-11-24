import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import { FileText, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PermisoOperacion {
  id: string
  nombreNegocio: string
  propietario: string
  aldea: string
  barrioColonia: string
  direccion: string
  actividadesEconomicas: string[]
  numeroRecibo: string
  valorRecibo: string
  fechaCreacion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
}

export default function LibroControlPermisosOperacion() {
  // Filtros
  const [fechaInicial, setFechaInicial] = useState('01/11/2025')
  const [fechaFinal, setFechaFinal] = useState('31/12/2025')
  const [actividadEconomica, setActividadEconomica] = useState('')
  const [aldea, setAldea] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 10

  // Datos de ejemplo (en producción vendrían de una API)
  const permisos: PermisoOperacion[] = [
    {
      id: '00018',
      nombreNegocio: 'BENDITO CAFE',
      propietario: 'JULIO ERNESTO PEREZ',
      aldea: 'Cedeño',
      barrioColonia: 'Cededo',
      direccion: 'FRENTE A LA PLAYA LAS GAVIOTAS',
      actividadesEconomicas: ['Cafeterías'],
      numeroRecibo: '00005',
      valorRecibo: '1000.00',
      fechaCreacion: '12/11/2025',
      estado: 'Aprobado'
    },
    {
      id: '00019',
      nombreNegocio: 'GASOLINERA CONTRERAS',
      propietario: 'JORGE CONTRERAS',
      aldea: 'Cedeño',
      barrioColonia: 'Cededo',
      direccion: 'FRENTE AL PARQUE',
      actividadesEconomicas: ['Gasolineras'],
      numeroRecibo: '8794',
      valorRecibo: '2000.00',
      fechaCreacion: '17/11/2025',
      estado: 'Aprobado'
    },
    {
      id: '00020',
      nombreNegocio: 'FERRETERIA EL MAESTRO',
      propietario: 'JOSE ANTONIO MARTINEZ SUAZO',
      aldea: 'Monjaras',
      barrioColonia: 'Buena Vista',
      direccion: 'FRENTE AL BANCO DE OCCIDENTE',
      actividadesEconomicas: ['Ferreterías'],
      numeroRecibo: '5439',
      valorRecibo: '6000.00',
      fechaCreacion: '18/11/2025',
      estado: 'Aprobado'
    },
  ]

  const actividades = [
    { value: '', label: 'Todas' },
    { value: 'Cafeterías', label: 'Cafeterías' },
    { value: 'Gasolineras', label: 'Gasolineras' },
    { value: 'Ferreterías', label: 'Ferreterías' },
    { value: 'Restaurantes', label: 'Restaurantes' },
    { value: 'Tiendas', label: 'Tiendas' },
  ]

  const aldeas = [
    { value: '', label: 'Todas' },
    { value: 'Marcovia', label: 'Marcovia' },
    { value: 'Cedeño', label: 'Cedeño' },
    { value: 'Monjaras', label: 'Monjaras' },
    { value: 'Guapinolito', label: 'Guapinolito' },
  ]

  // Filtrar permisos
  const permisosFiltrados = useMemo(() => {
    return permisos.filter(permiso => {
      // Filtro por actividad económica
      if (actividadEconomica && !permiso.actividadesEconomicas.includes(actividadEconomica)) {
        return false
      }

      // Filtro por aldea
      if (aldea && permiso.aldea !== aldea) {
        return false
      }

      // Filtro por localidad
      if (localidad && !permiso.barrioColonia.toLowerCase().includes(localidad.toLowerCase())) {
        return false
      }

      // Filtro por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase()
        return (
          permiso.nombreNegocio.toLowerCase().includes(busquedaLower) ||
          permiso.propietario.toLowerCase().includes(busquedaLower) ||
          permiso.id.includes(busqueda)
        )
      }

      return true
    })
  }, [actividadEconomica, aldea, localidad, busqueda])

  // Paginación
  const totalPaginas = Math.ceil(permisosFiltrados.length / registrosPorPagina)
  const inicio = (paginaActual - 1) * registrosPorPagina
  const fin = inicio + registrosPorPagina
  const permisosPaginados = permisosFiltrados.slice(inicio, fin)

  // Calcular total
  const totalValor = permisosFiltrados.reduce((sum, permiso) => {
    return sum + parseFloat(permiso.valorRecibo || '0')
  }, 0)

  // Formatear fecha para mostrar
  const formatearFecha = (fecha: string) => {
    const partes = fecha.split('/')
    if (partes.length === 3) {
      const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
      const mes = meses[parseInt(partes[1]) - 1]
      return `${partes[0]} ${mes}. ${partes[2]}`
    }
    return fecha
  }

  const formatearFechaRango = (fecha: string) => {
    const partes = fecha.split('/')
    if (partes.length === 3) {
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      const mes = meses[parseInt(partes[1]) - 1]
      return `${partes[0]} ${mes} de ${partes[2]}`
    }
    return fecha
  }

  const handleGenerarReporte = () => {
    // Aquí se podría generar un PDF o exportar a Excel
    window.print()
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Libro de Control de Permisos de Operación</h1>
          <p className="text-base text-neutral-text">Genera reportes de permisos de operación</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Fecha inicial</label>
            <Input
              type="text"
              placeholder="dd/mm/aaaa"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Fecha final</label>
            <Input
              type="text"
              placeholder="dd/mm/aaaa"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Actividad económica</label>
            <Select
              options={actividades}
              value={actividadEconomica}
              onChange={(e) => setActividadEconomica(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Aldea</label>
            <Select
              options={aldeas}
              value={aldea}
              onChange={(e) => setAldea(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Localidad (Barrio / Colonia)</label>
            <Input
              placeholder="Buscar localidad"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleGenerarReporte} className="w-full flex items-center justify-center gap-xs">
              <FileText className="w-4 h-4" />
              Generar reporte
            </Button>
          </div>
        </div>
      </Card>

      {/* Banner del Reporte */}
      <div className="bg-gradient-to-r from-green-500 to-yellow-400 p-lg rounded-lg text-white print:block">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-xs">ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA</h2>
            <h3 className="text-lg font-semibold mb-sm">LIBRO DE CONTROL DE PERMISOS DE OPERACIÓN</h3>
            <div className="text-sm space-y-xs">
              <p>Del {formatearFechaRango(fechaInicial)} al {formatearFechaRango(fechaFinal)}</p>
              <p>Actividad: {actividadEconomica || 'Todas'}</p>
              <p>Localidad: {localidad || 'Todas'}</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">M</span>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y paginación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <Input
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value)
              setPaginaActual(1)
            }}
            className="w-64"
          />
          <Button variant="secondary" className="flex items-center gap-xs">
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-xs">
          <Button
            variant="secondary"
            onClick={() => setPaginaActual(1)}
            disabled={paginaActual === 1}
            className="p-xs"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            className="p-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-neutral-text px-md">
            {paginaActual} de {totalPaginas}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            className="p-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPaginaActual(totalPaginas)}
            disabled={paginaActual === totalPaginas}
            className="p-xs"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabla de permisos */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-background border-b border-neutral-border">
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">NO. PERMISO</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">FECHA</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">NOMBRE DEL NEGOCIO / CONTRIBUYENTE</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">UBICACIÓN</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">ACTIVIDAD(ES) ECONÓMICAS</th>
                <th className="text-right p-sm text-xs font-semibold text-neutral-text">VALOR PAGADO</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">NO. DE RECIBO</th>
              </tr>
            </thead>
            <tbody>
              {permisosPaginados.map((permiso, index) => (
                <tr key={permiso.id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-background'}>
                  <td className="p-sm text-xs">{permiso.id}</td>
                  <td className="p-sm text-xs">{formatearFecha(permiso.fechaCreacion)}</td>
                  <td className="p-sm text-xs">
                    {permiso.nombreNegocio} / {permiso.propietario}
                  </td>
                  <td className="p-sm text-xs">{permiso.direccion}</td>
                  <td className="p-sm text-xs">{permiso.actividadesEconomicas.join(', ')}</td>
                  <td className="p-sm text-xs text-right">
                    L {parseFloat(permiso.valorRecibo).toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs">{permiso.numeroRecibo}</td>
                </tr>
              ))}
              {/* Fila de total */}
              {permisosFiltrados.length > 0 && (
                <tr className="bg-gray-100 font-semibold border-t-2 border-gray-400">
                  <td colSpan={5} className="p-sm text-xs text-right">Total:</td>
                  <td className="p-sm text-xs text-right">
                    L {totalValor.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-md text-right text-xs text-neutral-text">
          Pag {paginaActual} de {totalPaginas}
        </div>
      </Card>
    </div>
  )
}