import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Shield, 
  BarChart3, 
  Users, 
  Settings,
  FolderTree,
  MapPin,
  BookOpen
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/permisos-operacion', label: 'Permisos Operación', icon: FileText },
  { path: '/permisos-construccion', label: 'Permisos Construcción', icon: Building2 },
  { path: '/solvencias', label: 'Solvencias', icon: Shield },
  { path: '/categorias-rubros', label: 'Categorías de Rubros', icon: FolderTree, adminOnly: true },
  { path: '/barrios-colonias', label: 'Barrios y Colonias', icon: MapPin, adminOnly: true },
  { path: '/libro-control-permisos-operacion', label: 'Libro de Permisos de Operación', icon: BookOpen },
  { path: '/libro-control-permisos-construccion', label: 'Libro de Permisos de Construcción', icon: BookOpen },
  { path: '/libro-control-solvencias', label: 'Libro de Solvencias', icon: BookOpen },
  { path: '/reportes', label: 'Reportes', icon: BarChart3 },
  { path: '/usuarios', label: 'Usuarios', icon: Users, adminOnly: true },
  { path: '/configuracion', label: 'Configuración', icon: Settings, adminOnly: true },
]

export default function Sidebar() {
  const { user } = useAuthStore()

  const filteredItems = menuItems.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') return false
    return true
  })

  return (
    <aside className="w-60 bg-white border-r border-neutral-border p-md">
      <nav className="flex flex-col gap-xs">
        {filteredItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-md px-md py-sm rounded-sm transition-colors',
                  isActive
                    ? 'bg-primary-background text-primary font-medium'
                    : 'text-neutral-text hover:bg-neutral-background'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-small">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

