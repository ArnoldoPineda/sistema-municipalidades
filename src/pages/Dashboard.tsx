import { Link } from 'react-router-dom'
import KPICard from '@/components/ui/KPICard'
import Card from '@/components/ui/Card'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Eye, Edit, Trash2, FileText, Building2, Shield, BookOpen, ArrowRight } from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function Dashboard() {
  const recentPermits = [
    { id: 1, solicitante: 'Juan Pérez', tipo: 'Comercial', fecha: '01/01/2025', estado: 'Aprobado' },
    { id: 2, solicitante: 'María López', tipo: 'Construcción', fecha: '02/01/2025', estado: 'Pendiente' },
    { id: 3, solicitante: 'Carlos Ruiz', tipo: 'Servicios', fecha: '03/01/2025', estado: 'Rechazado' },
  ]

  // Datos para gráfico de permisos por mes
  const permisosPorMes = [
    { mes: 'Ene', operacion: 12, construccion: 8, solvencias: 45 },
    { mes: 'Feb', operacion: 15, construccion: 10, solvencias: 52 },
    { mes: 'Mar', operacion: 18, construccion: 12, solvencias: 48 },
    { mes: 'Abr', operacion: 20, construccion: 15, solvencias: 55 },
    { mes: 'May', operacion: 16, construccion: 11, solvencias: 50 },
    { mes: 'Jun', operacion: 22, construccion: 14, solvencias: 58 },
    { mes: 'Jul', operacion: 19, construccion: 13, solvencias: 52 },
    { mes: 'Ago', operacion: 25, construccion: 16, solvencias: 60 },
    { mes: 'Sep', operacion: 21, construccion: 14, solvencias: 55 },
    { mes: 'Oct', operacion: 23, construccion: 15, solvencias: 58 },
    { mes: 'Nov', operacion: 20, construccion: 13, solvencias: 54 },
    { mes: 'Dic', operacion: 18, construccion: 12, solvencias: 50 },
  ]

  // Datos para gráfico de distribución de permisos
  const distribucionPermisos = [
    { name: 'Aprobados', value: 98, color: '#10B981' },
    { name: 'Pendientes', value: 45, color: '#F59E0B' },
    { name: 'Rechazados', value: 13, color: '#EF4444' },
  ]

  // Datos para gráfico de ingresos por mes
  const ingresosPorMes = [
    { mes: 'Ene', ingresos: 125000 },
    { mes: 'Feb', ingresos: 145000 },
    { mes: 'Mar', ingresos: 138000 },
    { mes: 'Abr', ingresos: 152000 },
    { mes: 'May', ingresos: 148000 },
    { mes: 'Jun', ingresos: 165000 },
    { mes: 'Jul', ingresos: 158000 },
    { mes: 'Ago', ingresos: 172000 },
    { mes: 'Sep', ingresos: 162000 },
    { mes: 'Oct', ingresos: 175000 },
    { mes: 'Nov', ingresos: 168000 },
    { mes: 'Dic', ingresos: 155000 },
  ]

  // Datos para gráfico de solvencias por estado
  const solvenciasPorEstado = [
    { estado: 'Vigentes', cantidad: 234, color: '#10B981' },
    { estado: 'Vencidas', cantidad: 18, color: '#EF4444' },
  ]

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'Aprobado': return 'success'
      case 'Pendiente': return 'warning'
      case 'Rechazado': return 'danger'
      default: return 'info'
    }
  }

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-h1 font-bold mb-md">Dashboard</h1>
        <p className="text-base text-neutral-text">Resumen general del sistema</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <KPICard
          title="Permisos de Operación"
          value={98}
          change={{ value: 12, isPositive: true }}
          variant="blue"
        />
        <KPICard
          title="Permisos de Construcción"
          value={45}
          change={{ value: 5, isPositive: true }}
          variant="green"
        />
        <KPICard
          title="Solvencias Emitidas"
          value={234}
          change={{ value: 18, isPositive: true }}
          variant="orange"
        />
        <KPICard
          title="Pendientes"
          value={13}
          change={{ value: -3, isPositive: false }}
          variant="red"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {/* Gráfico de Permisos por Mes */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Permisos por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={permisosPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="operacion" fill="#0066CC" name="Operación" />
              <Bar dataKey="construccion" fill="#10B981" name="Construcción" />
              <Bar dataKey="solvencias" fill="#F59E0B" name="Solvencias" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de Distribución de Permisos */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Estado de Permisos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionPermisos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distribucionPermisos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de Ingresos por Mes */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Ingresos Mensuales (L.)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ingresosPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `L. ${value.toLocaleString('es-HN')}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#0066CC"
                strokeWidth={2}
                name="Ingresos"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de Solvencias por Estado */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Solvencias por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={solvenciasPorEstado}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#8884d8">
                {solvenciasPorEstado.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Acceso Rápido a Libros de Control */}
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
                    Control y registro de permisos de operación
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Ver libro <ArrowRight className="w-4 h-4 ml-xs" />
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
                    Control y registro de permisos de construcción
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Ver libro <ArrowRight className="w-4 h-4 ml-xs" />
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
                    Control y registro de solvencias municipales
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Ver libro <ArrowRight className="w-4 h-4 ml-xs" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div>
        <h3 className="text-h3 font-semibold mb-md">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          <Link to="/permisos-operacion">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-xs">
              <FileText className="w-4 h-4" />
              Nuevo Permiso Operación
            </Button>
          </Link>
          <Link to="/permisos-construccion">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-xs">
              <Building2 className="w-4 h-4" />
              Nuevo Permiso Construcción
            </Button>
          </Link>
          <Link to="/solvencias">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-xs">
              <Shield className="w-4 h-4" />
              Nueva Solvencia
            </Button>
          </Link>
          <Link to="/reportes">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-xs">
              <BookOpen className="w-4 h-4" />
              Ver Reportes
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Permits Table */}
      <div>
        <h3 className="text-h3 font-semibold mb-md">Últimos Registros</h3>
        <Table headers={['#', 'Solicitante', 'Tipo', 'Fecha', 'Estado', 'Acciones']}>
          {recentPermits.map((permit, index) => (
            <TableRow key={permit.id} stripe={index % 2 === 1}>
              <TableCell>{permit.id}</TableCell>
              <TableCell>{permit.solicitante}</TableCell>
              <TableCell>{permit.tipo}</TableCell>
              <TableCell>{permit.fecha}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(permit.estado)}>
                  {permit.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-xs">
                  <Button variant="secondary" className="p-xs">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" className="p-xs">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" className="p-xs">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  )
}
