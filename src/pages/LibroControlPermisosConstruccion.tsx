import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { FileText, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PermisoConstruccion {
  id: string
  concedePermisoA: string
  numeroIdentidad: string
  claveCatastral: string
  paraConstruir: string
  ubicacion: string
  presupuesto: string
  valorPagado: string
  numeroRecibo: string
  fechaCreacion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado'
}

export default function LibroControlPermisosConstruccion() {
  // Filtros
  const [fechaInicial, setFechaInicial] = useState('01/01/2025')
  const [fechaFinal, setFechaFinal] = useState('31/12/2025')
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 10

  // Datos de ejemplo (en producción vendrían de una API)
  const permisos: PermisoConstruccion[] = [
    {
      id: '00001',
      concedePermisoA: 'NEPTALY SALGADO',
      numeroIdentidad: '0315-1840-98504',
      claveCatastral: '123456789',
      paraConstruir: 'CASA DE DOS PLANTAS',
      ubicacion: 'BARRIO EL CENTRO DE MARCOVIA',
      presupuesto: '300000.00',
      valorPagado: '1200.00',
      numeroRecibo: '521545',
      fechaCreacion: '17/04/2023',
      estado: 'Aprobado'
    },
    {
      id: '00002',
      concedePermisoA: 'JORGE SANCHEZ',
      numeroIdentidad: '0212-3456-05066',
      claveCatastral: 'AK 525525121132221',
      paraConstruir: 'CONSTRUCCION DE UN MURO DE 50 MTS.2',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '100000.00',
      valorPagado: '800.00',
      numeroRecibo: '58955',
      fechaCreacion: '18/04/2023',
      estado: 'Aprobado'
    },
    {
      id: '00003',
      concedePermisoA: 'GENARO ANDRES MARTINEZ',
      numeroIdentidad: '0818-1905-02150',
      claveCatastral: 'CR-258-25-59',
      paraConstruir: 'SEGUNDA PLANTA Y PORCHE',
      ubicacion: 'ALDEA DE CEDEÑO, BARRIO EL CENTRO, FRENTE A RESTAURANTE',
      presupuesto: '300000.00',
      valorPagado: '375.00',
      numeroRecibo: '2599',
      fechaCreacion: '24/04/2023',
      estado: 'Aprobado'
    },
    {
      id: '00004',
      concedePermisoA: 'SILVIA JULISSA GUEVARA RAMOS',
      numeroIdentidad: '0312-1978-24587',
      claveCatastral: 'FI21-2452-1254',
      paraConstruir: 'MURO PERIMETRAL Y HABITACION EN SEGUNDA PLANTA',
      ubicacion: 'COLONIA CARE, MARCOVIA CHOLUTECA',
      presupuesto: '500000.00',
      valorPagado: '500.00',
      numeroRecibo: '12546',
      fechaCreacion: '15/05/2023',
      estado: 'Aprobado'
    },
    {
      id: '00005',
      concedePermisoA: 'JORGE CHAVEZ',
      numeroIdentidad: '2212-1131-21321',
      claveCatastral: 'LSLFNLALK',
      paraConstruir: '3 CUARTOS DE HABITACION PARA ALQUILER',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '500000.00',
      valorPagado: '5000.00',
      numeroRecibo: '1222121',
      fechaCreacion: '19/05/2023',
      estado: 'Aprobado'
    },
    {
      id: '00006',
      concedePermisoA: 'SANTOS ORELLANA',
      numeroIdentidad: '0158-7966-67722',
      claveCatastral: 'CL-528',
      paraConstruir: 'SEGUNDO PISO DE CASA DE HABITACION Y PORCHE',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '150000.00',
      valorPagado: '1500.00',
      numeroRecibo: '25987',
      fechaCreacion: '16/08/2023',
      estado: 'Aprobado'
    },
    {
      id: '00007',
      concedePermisoA: 'JORGE SANCHEZ ANDINO',
      numeroIdentidad: '0890-1124-55545',
      claveCatastral: '0009JC33242',
      paraConstruir: 'UN MURO PERIMETRAL DE LARGO POR 4 DE ANCHO',
      ubicacion: 'SAN BERNARDO',
      presupuesto: '24500.00',
      valorPagado: '240.00',
      numeroRecibo: '25005',
      fechaCreacion: '16/08/2023',
      estado: 'Aprobado'
    },
    {
      id: '00008',
      concedePermisoA: 'JOSE MARIA BENAVIDES',
      numeroIdentidad: '0818-1112-12121',
      claveCatastral: '11212121121',
      paraConstruir: 'UN MURO DE 20 X 20',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '50000.00',
      valorPagado: '500.00',
      numeroRecibo: '1548',
      fechaCreacion: '27/09/2023',
      estado: 'Aprobado'
    },
    {
      id: '00009',
      concedePermisoA: 'JUAN PEREZ',
      numeroIdentidad: '0548-5222-22555',
      claveCatastral: 'JHJKJLKJHJKJHJK HBJKJK',
      paraConstruir: 'UN MURO Y UN PORSCHE',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '5056555.00',
      valorPagado: '5000.00',
      numeroRecibo: '1528',
      fechaCreacion: '16/10/2023',
      estado: 'Aprobado'
    },
    {
      id: '00010',
      concedePermisoA: 'FULANITO MENDEZ',
      numeroIdentidad: '0812-4578-88888',
      claveCatastral: 'KDJKJDKSJA',
      paraConstruir: 'UN MURO Y UN PORCHE',
      ubicacion: 'CEDEÑO',
      presupuesto: '80000.00',
      valorPagado: '800.00',
      numeroRecibo: '2589',
      fechaCreacion: '25/10/2023',
      estado: 'Aprobado'
    },
    {
      id: '00011',
      concedePermisoA: 'VIRGILIO CALIX',
      numeroIdentidad: '0814-7852-55552',
      claveCatastral: 'CO-01',
      paraConstruir: 'UNA SEGUNDA PLANTA Y UN MURO',
      ubicacion: 'BARRIO EL CENTRO',
      presupuesto: '200000.00',
      valorPagado: '5000.00',
      numeroRecibo: '14584',
      fechaCreacion: '06/12/2023',
      estado: 'Aprobado'
    },
  ]

  // Filtrar permisos
  const permisosFiltrados = useMemo(() => {
    return permisos.filter(permiso => {
      // Filtro por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase()
        return (
          permiso.concedePermisoA.toLowerCase().includes(busquedaLower) ||
          permiso.numeroIdentidad.includes(busqueda) ||
          permiso.claveCatastral.toLowerCase().includes(busquedaLower) ||
          permiso.id.includes(busqueda)
        )
      }

      return true
    })
  }, [busqueda])

  // Paginación
  const totalPaginas = Math.ceil(permisosFiltrados.length / registrosPorPagina)
  const inicio = (paginaActual - 1) * registrosPorPagina
  const fin = inicio + registrosPorPagina
  const permisosPaginados = permisosFiltrados.slice(inicio, fin)

  // Calcular totales
  const totalPresupuesto = permisosFiltrados.reduce((sum, permiso) => {
    return sum + parseFloat(permiso.presupuesto || '0')
  }, 0)

  const totalValorPagado = permisosFiltrados.reduce((sum, permiso) => {
    return sum + parseFloat(permiso.valorPagado || '0')
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
          <h1 className="text-h1 font-bold mb-xs">Libro de Control de Permisos de Construcción</h1>
          <p className="text-base text-neutral-text">Genera reportes de permisos de construcción</p>
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
          <div className="flex items-end">
            <Button onClick={handleGenerarReporte} className="w-full flex items-center justify-center gap-xs">
              <FileText className="w-4 h-4" />
              Generar reporte
            </Button>
          </div>
        </div>
      </Card>

      {/* Banner del Reporte */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-lg rounded-lg text-gray-900 print:block">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-xs">ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA</h2>
            <h3 className="text-lg font-semibold mb-sm">LIBRO DE CONTROL DE PERMISOS DE CONSTRUCCIÓN</h3>
            <div className="text-sm space-y-xs">
              <p>Del {formatearFechaRango(fechaInicial)} al {formatearFechaRango(fechaFinal)}</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-yellow-600">M</span>
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
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">PERMISO A</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">IDENTIDAD</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">CLAVE CATASTRAL</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">CONSTRUCCIÓN</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">UBICACIÓN</th>
                <th className="text-right p-sm text-xs font-semibold text-neutral-text">PRESUPUESTO</th>
                <th className="text-right p-sm text-xs font-semibold text-neutral-text">VALOR PAGADO</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">NO. DE RECIBO</th>
              </tr>
            </thead>
            <tbody>
              {permisosPaginados.map((permiso, index) => (
                <tr key={permiso.id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-background'}>
                  <td className="p-sm text-xs">{permiso.id.padStart(5, '0')}</td>
                  <td className="p-sm text-xs">{formatearFecha(permiso.fechaCreacion)}</td>
                  <td className="p-sm text-xs">{permiso.concedePermisoA}</td>
                  <td className="p-sm text-xs">{permiso.numeroIdentidad}</td>
                  <td className="p-sm text-xs">{permiso.claveCatastral}</td>
                  <td className="p-sm text-xs">{permiso.paraConstruir}</td>
                  <td className="p-sm text-xs">{permiso.ubicacion}</td>
                  <td className="p-sm text-xs text-right">
                    L{parseFloat(permiso.presupuesto).toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs text-right">
                    L {parseFloat(permiso.valorPagado).toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs">{permiso.numeroRecibo}</td>
                </tr>
              ))}
              {/* Fila de totales */}
              {permisosFiltrados.length > 0 && (
                <tr className="bg-gray-100 font-semibold border-t-2 border-gray-400">
                  <td colSpan={7} className="p-sm text-xs text-right">Total:</td>
                  <td className="p-sm text-xs text-right">
                    L{totalPresupuesto.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs text-right">
                    L {totalValorPagado.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-sm text-xs"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-md text-right text-xs text-neutral-text">
          Pág {paginaActual} de {totalPaginas}
        </div>
      </Card>
    </div>
  )
}