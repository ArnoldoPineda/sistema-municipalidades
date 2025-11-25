import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { FileText, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface Solvencia {
  id: string
  numeroSolvencia: string
  nombreContribuyente: string
  numeroIdentidad: string
  aldea: string
  barrioColonia: string
  numeroRecibo: string
  valorRecibo: string
  fechaCreacion: string
  tipo: 'bienes-inmuebles' | 'impuestos-personales'
  estado: 'Vigente' | 'Vencida'
}

export default function LibroControlSolvencias() {
  // Filtros
  const [tipoSolvencia, setTipoSolvencia] = useState<'bienes-inmuebles' | 'impuestos-personales'>('impuestos-personales')
  const [fechaInicial, setFechaInicial] = useState('01/01/2025')
  const [fechaFinal, setFechaFinal] = useState('31/12/2025')
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const registrosPorPagina = 10

  // Datos de ejemplo (en producción vendrían de una API)
  const solvencias: Solvencia[] = [
    {
      id: '18',
      numeroSolvencia: '0000018',
      nombreContribuyente: 'CARLOS MEJIA GUILLEN',
      numeroIdentidad: '0719-1998-01508',
      aldea: 'Marcovia',
      barrioColonia: 'Marcovia',
      numeroRecibo: '39939',
      valorRecibo: '70.00',
      fechaCreacion: '05/02/2005',
      tipo: 'impuestos-personales',
      estado: 'Vigente'
    },
    {
      id: '19',
      numeroSolvencia: '0000019',
      nombreContribuyente: 'GABINO ARGUETA',
      numeroIdentidad: '1218-1962-00057',
      aldea: 'Cedeño',
      barrioColonia: 'HACDA. CHAMBOROTO',
      numeroRecibo: '3399',
      valorRecibo: '700.00',
      fechaCreacion: '07/04/2005',
      tipo: 'impuestos-personales',
      estado: 'Vigente'
    },
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
      tipo: 'impuestos-personales',
      estado: 'Vigente'
    },
  ]

  // Filtrar solvencias
  const solvenciasFiltradas = useMemo(() => {
    return solvencias.filter(solvencia => {
      // Filtro por tipo
      if (solvencia.tipo !== tipoSolvencia) {
        return false
      }

      // Filtro por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase()
        return (
          solvencia.nombreContribuyente.toLowerCase().includes(busquedaLower) ||
          solvencia.numeroIdentidad.includes(busqueda) ||
          solvencia.numeroSolvencia.includes(busqueda)
        )
      }

      return true
    })
  }, [tipoSolvencia, busqueda])

  // Paginación
  const totalPaginas = Math.ceil(solvenciasFiltradas.length / registrosPorPagina)
  const inicio = (paginaActual - 1) * registrosPorPagina
  const fin = inicio + registrosPorPagina
  const solvenciasPaginadas = solvenciasFiltradas.slice(inicio, fin)

  // Calcular total
  const totalValor = solvenciasFiltradas.reduce((sum, solvencia) => {
    return sum + parseFloat(solvencia.valorRecibo || '0')
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

  const getTituloReporte = () => {
    if (tipoSolvencia === 'bienes-inmuebles') {
      return 'LIBRO DE CONTROL DE SOLVENCIAS DE BIENES INMUEBLES MUNICIPALES'
    }
    return 'LIBRO DE CONTROL DE SOLVENCIAS DE IMPUESTOS PERSONALES MUNICIPALES'
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Libro de Control de Solvencias Municipales</h1>
          <p className="text-base text-neutral-text">Genera reportes de solvencias municipales</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <div className="space-y-md">
          <div>
            <label className="block text-sm text-gray-700 mb-xs">Tipo de solvencia</label>
            <div className="flex gap-md">
              <label className="flex items-center gap-xs cursor-pointer">
                <input
                  type="radio"
                  name="tipoSolvencia"
                  value="bienes-inmuebles"
                  checked={tipoSolvencia === 'bienes-inmuebles'}
                  onChange={() => {
                    setTipoSolvencia('bienes-inmuebles')
                    setPaginaActual(1)
                  }}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">Bienes inmuebles</span>
              </label>
              <label className="flex items-center gap-xs cursor-pointer">
                <input
                  type="radio"
                  name="tipoSolvencia"
                  value="impuestos-personales"
                  checked={tipoSolvencia === 'impuestos-personales'}
                  onChange={() => {
                    setTipoSolvencia('impuestos-personales')
                    setPaginaActual(1)
                  }}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">Impuestos personales</span>
              </label>
            </div>
          </div>
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
        </div>
      </Card>

      {/* Banner del Reporte */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-lg rounded-lg text-white print:block">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-xs">ALCALDÍA MUNICIPAL DE MARCOVIA, CHOLUTECA</h2>
            <h3 className="text-lg font-semibold mb-sm">{getTituloReporte()}</h3>
            <div className="text-sm space-y-xs">
              <p>Del {formatearFechaRango(fechaInicial)} al {formatearFechaRango(fechaFinal)}</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">M</span>
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

      {/* Tabla de solvencias */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-background border-b border-neutral-border">
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">N° SOLVENCIA</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">FECHA</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">NOMBRE COMPLETO</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">N° IDENTIDAD</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">ALDEA</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">BARRIO / COLONIA</th>
                <th className="text-left p-sm text-xs font-semibold text-neutral-text">N° RECIBO</th>
                <th className="text-right p-sm text-xs font-semibold text-neutral-text">VALOR RECIBO</th>
              </tr>
            </thead>
            <tbody>
              {solvenciasPaginadas.map((solvencia, index) => (
                <tr key={solvencia.id} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-background'}>
                  <td className="p-sm text-xs">{solvencia.numeroSolvencia}</td>
                  <td className="p-sm text-xs">{formatearFecha(solvencia.fechaCreacion)}</td>
                  <td className="p-sm text-xs">{solvencia.nombreContribuyente}</td>
                  <td className="p-sm text-xs">{solvencia.numeroIdentidad}</td>
                  <td className="p-sm text-xs">{solvencia.aldea}</td>
                  <td className="p-sm text-xs">{solvencia.barrioColonia}</td>
                  <td className="p-sm text-xs">{solvencia.numeroRecibo}</td>
                  <td className="p-sm text-xs text-right">
                    L. {parseFloat(solvencia.valorRecibo).toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              {/* Fila de total */}
              {solvenciasFiltradas.length > 0 && (
                <tr className="bg-gray-100 font-semibold border-t-2 border-gray-400">
                  <td colSpan={7} className="p-sm text-xs text-right">Total:</td>
                  <td className="p-sm text-xs text-right">
                    L. {totalValor.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-md text-right text-xs text-neutral-text">
          Pág. {paginaActual} de {totalPaginas}
        </div>
      </Card>
    </div>
  )
}