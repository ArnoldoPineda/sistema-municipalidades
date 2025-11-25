import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import AvisoCobroPrint from '@/components/AvisoCobroPrint'
import { Printer, Bell, X } from 'lucide-react'

type TipoMora = 'permiso-operacion' | 'permiso-construccion' | 'solvencia' | 'todos'

interface ContribuyenteMoroso {
  id: string
  tipo: TipoMora
  nombreEmpresa?: string
  nombreContribuyente?: string
  rtnEmpresa?: string
  propietario?: string
  identidad: string
  actividades?: string[]
  aldea: string
  sector: string
  montoAdeudado: number
  fechaVencimiento: string
  diasMora: number
}

export default function ContribuyentesMorosos() {
  const [busqueda, setBusqueda] = useState('')
  const [aldea, setAldea] = useState('')
  const [barrioColonia, setBarrioColonia] = useState('')
  const [tipoMora, setTipoMora] = useState<TipoMora>('todos')
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false)
  const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState<ContribuyenteMoroso | null>(null)

  // Datos de ejemplo de contribuyentes morosos
  const contribuyentes: ContribuyenteMoroso[] = [
    // Permisos de Operación
    {
      id: '1',
      tipo: 'permiso-operacion',
      nombreEmpresa: 'VARIEDADES CAMILA',
      rtnEmpresa: '0801-1899-965656',
      propietario: 'CAMILA LEONOR BAUTISTA',
      identidad: '0801-1265-69862',
      actividades: ['Bazares'],
      aldea: 'MARCOVIA',
      sector: 'DESVIO EL PAPALON',
      montoAdeudado: 1500.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    {
      id: '2',
      tipo: 'permiso-operacion',
      nombreEmpresa: "PUL'ERIA LOS HERMANOS",
      rtnEmpresa: '-',
      propietario: 'JORGE GODOY CRUZ',
      identidad: '0812-4578-98222',
      actividades: ['Pulperías'],
      aldea: 'MARCOVIA',
      sector: 'BO. EL EDEN',
      montoAdeudado: 800.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    {
      id: '3',
      tipo: 'permiso-operacion',
      nombreEmpresa: 'FERRETERIA EL CAIMAN',
      rtnEmpresa: '2939-2919-120191',
      propietario: 'JORGE ARTURO CAIMAN',
      identidad: '1932-9899-19203',
      actividades: ['Ferreterías'],
      aldea: 'MARCOVIA',
      sector: 'HACDA. CHAMBOROTO',
      montoAdeudado: 2500.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    // Permisos de Construcción
    {
      id: '4',
      tipo: 'permiso-construccion',
      nombreContribuyente: 'JOSE ANTONIO VILLELA ORDOÑEZ',
      identidad: '0901-1976-05691',
      aldea: 'MARCOVIA',
      sector: 'ALDEA MONJARAS',
      montoAdeudado: 4500.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    {
      id: '5',
      tipo: 'permiso-construccion',
      nombreContribuyente: 'MARIA ELENA GONZALEZ',
      identidad: '0801-1985-12345',
      aldea: 'CEDEÑO',
      sector: 'BARRIO EL CENTRO',
      montoAdeudado: 3200.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    // Solvencias
    {
      id: '6',
      tipo: 'solvencia',
      nombreContribuyente: 'CARLOS ALBERTO ANDINO FLORES',
      identidad: '0309-1974-00378',
      aldea: 'MARCOVIA',
      sector: 'BO. EL CENTRO DE MARCOVIA',
      montoAdeudado: 1700.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
    {
      id: '7',
      tipo: 'solvencia',
      nombreContribuyente: 'JUAN PABLO MARTINEZ',
      identidad: '0801-1980-12345',
      aldea: 'MONJARAS',
      sector: 'BARRIO NUEVO',
      montoAdeudado: 1200.00,
      fechaVencimiento: '31/12/2024',
      diasMora: 322
    },
  ]

  const tiposMora = [
    { value: 'todos', label: 'Todos los tipos' },
    { value: 'permiso-operacion', label: 'Permisos de Operación' },
    { value: 'permiso-construccion', label: 'Permisos de Construcción' },
    { value: 'solvencia', label: 'Solvencias' },
  ]

  const aldeas = [
    { value: '', label: 'Todas' },
    { value: 'MARCOVIA', label: 'Marcovia' },
    { value: 'CEDEÑO', label: 'Cedeño' },
    { value: 'MONJARAS', label: 'Monjaras' },
    { value: 'GUAPINOLITO', label: 'Guapinolito' },
  ]

  // Filtrar contribuyentes
  const contribuyentesFiltrados = useMemo(() => {
    return contribuyentes.filter(contribuyente => {
      // Filtro por tipo de mora
      if (tipoMora !== 'todos' && contribuyente.tipo !== tipoMora) {
        return false
      }

      // Filtro por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase()
        const nombre = contribuyente.nombreEmpresa || contribuyente.nombreContribuyente || ''
        const propietario = contribuyente.propietario || ''
        const rtn = contribuyente.rtnEmpresa || ''
        return (
          nombre.toLowerCase().includes(busquedaLower) ||
          propietario.toLowerCase().includes(busquedaLower) ||
          rtn.toLowerCase().includes(busquedaLower) ||
          contribuyente.identidad.toLowerCase().includes(busquedaLower)
        )
      }

      // Filtro por aldea
      if (aldea && contribuyente.aldea !== aldea) {
        return false
      }

      // Filtro por barrio/colonia
      if (barrioColonia && !contribuyente.sector.toLowerCase().includes(barrioColonia.toLowerCase())) {
        return false
      }

      return true
    })
  }, [busqueda, aldea, barrioColonia, tipoMora])

  const totalAdeudado = contribuyentesFiltrados.reduce((sum, c) => sum + c.montoAdeudado, 0)

  const handleImprimir = () => {
    window.print()
  }

  const handleCrearAviso = (contribuyente: ContribuyenteMoroso) => {
    setContribuyenteSeleccionado(contribuyente)
    setMostrarModalAviso(true)
  }

  const handleCerrarModal = () => {
    setMostrarModalAviso(false)
    setContribuyenteSeleccionado(null)
  }

  const handleImprimirAviso = () => {
    setMostrarModalAviso(false)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const getNombreCompleto = (contribuyente: ContribuyenteMoroso) => {
    if (contribuyente.tipo === 'permiso-operacion') {
      return contribuyente.nombreEmpresa || contribuyente.propietario || ''
    }
    return contribuyente.nombreContribuyente || contribuyente.propietario || ''
  }

  const getTipoLabel = (tipo: TipoMora) => {
    switch (tipo) {
      case 'permiso-operacion':
        return 'Permiso Operación'
      case 'permiso-construccion':
        return 'Permiso Construcción'
      case 'solvencia':
        return 'Solvencia'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Contribuyentes Morosos</h1>
          <p className="text-base text-neutral-text">Reporte de contribuyentes con trámites pendientes</p>
        </div>
        <div className="flex items-center gap-md">
          <span className="text-base text-neutral-text">Registros: {contribuyentesFiltrados.length}</span>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
          <div>
            <Select
              label="Tipo de mora"
              options={tiposMora}
              value={tipoMora}
              onChange={(e) => setTipoMora(e.target.value as TipoMora)}
            />
          </div>
          <div>
            <Input
              label="Buscar"
              placeholder="Buscar por nombre, propietario, RTN o identidad"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div>
            <Select
              label="Aldea"
              options={aldeas}
              value={aldea}
              onChange={(e) => {
                setAldea(e.target.value)
                setBarrioColonia('')
              }}
            />
            {aldea && (
              <button
                onClick={() => setAldea('')}
                className="mt-xs text-xs text-primary hover:underline flex items-center gap-xs"
              >
                <X className="w-3 h-3" />
                Limpiar filtro
              </button>
            )}
          </div>
          <div>
            <Input
              label="Barrio / Colonia"
              placeholder="Buscar barrio o colonia"
              value={barrioColonia}
              onChange={(e) => setBarrioColonia(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Tabla de contribuyentes morosos */}
      <Card>
        <div className="overflow-x-auto">
          <Table headers={[
            'Tipo',
            'Nombre / Empresa',
            'RTN',
            'Propietario / Contribuyente',
            'Identidad',
            'Actividades',
            'Aldea',
            'Sector',
            'Monto Adeudado',
            'Días de Mora',
            'Acciones'
          ]}>
            {contribuyentesFiltrados.map((contribuyente, index) => (
              <TableRow key={contribuyente.id} stripe={index % 2 === 1}>
                <TableCell>
                  <span className="px-xs py-xs bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                    {getTipoLabel(contribuyente.tipo)}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {contribuyente.nombreEmpresa || '-'}
                </TableCell>
                <TableCell>{contribuyente.rtnEmpresa || '-'}</TableCell>
                <TableCell>
                  {contribuyente.propietario || contribuyente.nombreContribuyente || '-'}
                </TableCell>
                <TableCell>{contribuyente.identidad}</TableCell>
                <TableCell>
                  {contribuyente.actividades ? contribuyente.actividades.join(', ') : '-'}
                </TableCell>
                <TableCell>{contribuyente.aldea}</TableCell>
                <TableCell>{contribuyente.sector}</TableCell>
                <TableCell className="text-right font-semibold text-danger">
                  L. {contribuyente.montoAdeudado.toLocaleString('es-HN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-danger font-semibold">{contribuyente.diasMora} días</span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleCrearAviso(contribuyente)}
                    title="Crear aviso de cobro"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {contribuyentesFiltrados.length > 0 && (
              <TableRow className="bg-neutral-background font-semibold">
                <TableCell colSpan={8} className="text-right">
                  Total Adeudado:
                </TableCell>
                <TableCell className="text-right text-danger font-bold">
                  L. {totalAdeudado.toLocaleString('es-HN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </Card>

      {/* Botones de acción */}
      <div className="flex items-center justify-end gap-md">
        <Button
          variant="secondary"
          onClick={handleImprimir}
          className="flex items-center gap-xs"
        >
          <Printer className="w-4 h-4" />
          Imprimir Reporte
        </Button>
      </div>

      {/* Modal de Aviso de Cobro */}
      <Modal
        isOpen={mostrarModalAviso}
        onClose={handleCerrarModal}
        title="Aviso de Cobro"
      >
        {contribuyenteSeleccionado && contribuyenteSeleccionado.tipo !== 'todos' && (
          <div className="space-y-lg">
            <div className="border border-neutral-border rounded-sm p-md bg-neutral-background max-h-[600px] overflow-y-auto">
              <AvisoCobroPrint
                contribuyente={{
                  nombre: getNombreCompleto(contribuyenteSeleccionado),
                  tipo: contribuyenteSeleccionado.tipo as 'permiso-operacion' | 'permiso-construccion' | 'solvencia',
                  fechaVencimiento: contribuyenteSeleccionado.fechaVencimiento
                }}
              />
            </div>
            <div className="flex justify-end gap-md pt-md border-t border-neutral-border">
              <Button
                variant="secondary"
                onClick={handleCerrarModal}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleImprimirAviso}
                className="flex items-center gap-xs"
              >
                <Printer className="w-4 h-4" />
                Imprimir Aviso
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Componente de impresión (oculto en pantalla, visible al imprimir) */}
      {contribuyenteSeleccionado && contribuyenteSeleccionado.tipo !== 'todos' && (
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
          <AvisoCobroPrint
            contribuyente={{
              nombre: getNombreCompleto(contribuyenteSeleccionado),
              tipo: contribuyenteSeleccionado.tipo as 'permiso-operacion' | 'permiso-construccion' | 'solvencia',
              fechaVencimiento: contribuyenteSeleccionado.fechaVencimiento
            }}
          />
        </div>
      )}
    </div>
  )
}
