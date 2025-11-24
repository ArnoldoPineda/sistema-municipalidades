import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Download, FileSpreadsheet, FileText, Building2, Shield, BookOpen, ArrowRight } from 'lucide-react'

export default function Reportes() {
  const [tipoReporte, setTipoReporte] = useState('')
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')

  const handleGenerar = () => {
    // TODO: Implementar generación de reportes
    console.log('Generar reporte:', { tipoReporte, fechaDesde, fechaHasta })
  }

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-h1 font-bold mb-xs">Reportes</h1>
        <p className="text-base text-neutral-text">Genera reportes del sistema</p>
      </div>

      {/* Libros de Control Disponibles */}
      <div>
        <h3 className="text-h3 font-semibold mb-md">Libros de Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <Link to="/libro-control-permisos-operacion">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-start gap-md">
                <div className="p-md bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold mb-xs">Libro de Permisos de Operación</h4>
                  <p className="text-sm text-neutral-text mb-md">
                    Visualiza y genera reportes de permisos de operación con filtros avanzados
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Abrir libro <ArrowRight className="w-4 h-4 ml-xs" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/libro-control-permisos-construccion">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-start gap-md">
                <div className="p-md bg-green-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold mb-xs">Libro de Permisos de Construcción</h4>
                  <p className="text-sm text-neutral-text mb-md">
                    Visualiza y genera reportes de permisos de construcción con filtros avanzados
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Abrir libro <ArrowRight className="w-4 h-4 ml-xs" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/libro-control-solvencias">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-start gap-md">
                <div className="p-md bg-orange-100 rounded-lg">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold mb-xs">Libro de Solvencias</h4>
                  <p className="text-sm text-neutral-text mb-md">
                    Visualiza y genera reportes de solvencias municipales con filtros avanzados
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Abrir libro <ArrowRight className="w-4 h-4 ml-xs" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Generador de Reportes Personalizados */}
      <Card>
        <h3 className="text-h3 font-semibold mb-md">Generar Reporte Personalizado</h3>
        <div className="space-y-md">
          <Select
            label="Tipo de Reporte"
            options={[
              { value: '', label: 'Seleccionar tipo de reporte' },
              { value: 'permisos-operacion', label: 'Permisos de Operación por período' },
              { value: 'permisos-construccion', label: 'Permisos de Construcción por período' },
              { value: 'solvencias', label: 'Solvencias emitidas' },
              { value: 'estadisticas', label: 'Estadísticas generales' },
              { value: 'tipo-permiso', label: 'Por tipo de permiso' },
              { value: 'actividad-economica', label: 'Por actividad económica' },
            ]}
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-md">
            <Input
              label="Desde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
            <Input
              label="Hasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerar} className="w-full md:w-auto">
            Generar Reporte
          </Button>
        </div>
      </Card>

      {/* Vista Previa del Reporte */}
      {tipoReporte && (
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Vista Previa del Reporte</h3>
          <div className="h-64 bg-neutral-background rounded-sm flex items-center justify-center mb-md">
            <p className="text-base text-neutral-text">
              {tipoReporte ? `Vista previa del reporte: ${tipoReporte}` : 'Selecciona un tipo de reporte para ver la vista previa'}
            </p>
          </div>
          <div className="flex gap-md">
            <Button variant="secondary" className="flex items-center gap-xs">
              <Download className="w-4 h-4" />
              Descargar PDF
            </Button>
            <Button variant="secondary" className="flex items-center gap-xs">
              <FileSpreadsheet className="w-4 h-4" />
              Exportar Excel
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
