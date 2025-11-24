import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Plus, Trash2 } from 'lucide-react'

export default function Configuracion() {
  const tiposPermisos = [
    'Comercial',
    'Servicios',
    'Industrial',
    'Construcción Residencial',
    'Construcción Comercial',
  ]

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-h1 font-bold mb-xs">Configuración</h1>
        <p className="text-base text-neutral-text">Configuración general del sistema</p>
      </div>

      {/* Información Municipal */}
      <Card>
        <h3 className="text-h3 font-semibold mb-md">Información Municipal</h3>
        <div className="space-y-md">
          <Input label="Nombre" placeholder="Municipalidad Distrital de..." />
          <Input label="Dirección" placeholder="Dirección completa" />
          <Input label="Teléfono" placeholder="+51 XXX XXX XXX" />
          <Input label="Email" type="email" placeholder="contacto@municipalidad.gob.pe" />
          <Button>Guardar Cambios</Button>
        </div>
      </Card>

      {/* Tipos de Permisos */}
      <Card>
        <div className="flex items-center justify-between mb-md">
          <h3 className="text-h3 font-semibold">Tipos de Permisos</h3>
          <Button className="flex items-center gap-xs">
            <Plus className="w-4 h-4" />
            Agregar Tipo
          </Button>
        </div>
        <div className="space-y-xs">
          {tiposPermisos.map((tipo, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-md bg-neutral-background rounded-sm"
            >
              <span className="text-base">{tipo}</span>
              <Button variant="danger" className="p-xs">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Configuración General */}
      <Card>
        <h3 className="text-h3 font-semibold mb-md">Configuración General</h3>
        <div className="space-y-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">Notificaciones por Email</p>
              <p className="text-small text-neutral-text">Recibir notificaciones por correo electrónico</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">Modo Oscuro</p>
              <p className="text-small text-neutral-text">Activar tema oscuro</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <Button>Guardar Configuración</Button>
        </div>
      </Card>
    </div>
  )
}

