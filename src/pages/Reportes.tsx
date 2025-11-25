import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Download, BarChart3, BookOpen } from 'lucide-react'
export default function Reportes() {
  const [tipoReporte, setTipoReporte] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const tiposReporte = [
    { value: '', label: 'Seleccione un tipo de reporte' },
    { value: 'permisos-operacion', label: 'Permisos de Operación' },
    { value: 'permisos-construccion', label: 'Permisos de Construcción' },
    { value: 'solvencias', label: 'Solvencias Municipales' },
    { value: 'general', label: 'Reporte General' },
  ]

  const handleGenerarReporte = () => {
    if (!tipoReporte) {
      alert('Por favor selecciona un tipo de reporte')
      return
    }
    // Aquí iría la lógica para generar el reporte
    console.log('Generando reporte:', { tipoReporte, fechaInicio, fechaFin })
  }

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-h1 font-bold mb-xs">Reportes</h1>
        <p className="text-base text-neutral-text">Genera y descarga reportes del sistema</p>
      </div>

      {/* Libros de Control */}
      <div>
        <h2 className="text-h2 font-semibold mb-md">Libros de Control</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <Link to="/libro-control-permisos-operacion">
            <Card className="p-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-md">
                <div className="p-md bg-blue-100 rounded-sm">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-text">Libro de Permisos de Operación</h3>
                  <p className="text-sm text-neutral-text/70">Ver y exportar</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/libro-control-permisos-construccion">
            <Card className="p-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-md">
                <div className="p-md bg-green-100 rounded-sm">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-text">Libro de Permisos de Construcción</h3>
                  <p className="text-sm text-neutral-text/70">Ver y exportar</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/libro-control-solvencias">
            <Card className="p-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-md">
                <div className="p-md bg-orange-100 rounded-sm">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-text">Libro de Solvencias</h3>
                  <p className="text-sm text-neutral-text/70">Ver y exportar</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Generador de Reportes Personalizados */}
      <Card>
        <div className="p-md">
          <h2 className="text-h2 font-semibold mb-md">Generar Reporte Personalizado</h2>
          <div className="space-y-md">
            <Select
              label="Tipo de Reporte *"
              options={tiposReporte}
              value={tipoReporte}
              onChange={(e) => setTipoReporte(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="Fecha Inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <Input
                label="Fecha Fin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-xs">
              <Button onClick={handleGenerarReporte} className="flex items-center gap-xs">
                <BarChart3 className="w-5 h-5" />
                Generar Reporte
              </Button>
              <Button variant="secondary" className="flex items-center gap-xs">
                <Download className="w-5 h-5" />
                Descargar PDF
              </Button>
              <Button variant="secondary" className="flex items-center gap-xs">
                <Download className="w-5 h-5" />
                Descargar Excel
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}