import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Plus, Eye, Edit, Trash2 } from 'lucide-react'

export default function Usuarios() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const usuarios = [
    { id: 1, usuario: 'admin', email: 'admin@municipalidad.gob.pe', rol: 'Admin', estado: 'Activo' },
    { id: 2, usuario: 'empleado1', email: 'empleado1@municipalidad.gob.pe', rol: 'Empleado', estado: 'Activo' },
    { id: 3, usuario: 'directivo1', email: 'directivo1@municipalidad.gob.pe', rol: 'Directivo', estado: 'Inactivo' },
  ]

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Gestión de Usuarios</h1>
          <p className="text-base text-neutral-text">Administra los usuarios del sistema</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-xs">
          <Plus className="w-5 h-5" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-md">
        <Input placeholder="Buscar usuario" className="flex-1" />
        <Select
          options={[
            { value: '', label: 'Todos los roles' },
            { value: 'admin', label: 'Admin' },
            { value: 'empleado', label: 'Empleado' },
            { value: 'directivo', label: 'Directivo' },
          ]}
          className="w-full md:w-48"
        />
        <Select
          options={[
            { value: '', label: 'Todos los estados' },
            { value: 'activo', label: 'Activo' },
            { value: 'inactivo', label: 'Inactivo' },
          ]}
          className="w-full md:w-48"
        />
      </div>

      <Table headers={['#', 'Usuario', 'Email', 'Rol', 'Estado', 'Acciones']}>
        {usuarios.map((usuario, index) => (
          <TableRow key={usuario.id} stripe={index % 2 === 1}>
            <TableCell>{usuario.id}</TableCell>
            <TableCell>{usuario.usuario}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.rol}</TableCell>
            <TableCell>
              <Badge variant={usuario.estado === 'Activo' ? 'success' : 'danger'}>
                {usuario.estado}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Usuario"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Guardar
            </Button>
          </>
        }
      >
        <div className="space-y-md">
          <Input label="Nombre Completo *" placeholder="Nombre completo" />
          <Input label="Email *" type="email" placeholder="correo@ejemplo.com" />
          <Select
            label="Rol *"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'empleado', label: 'Empleado' },
              { value: 'directivo', label: 'Directivo' },
            ]}
          />
          <Input label="Contraseña *" type="password" placeholder="••••••••" />
          <Select
            label="Estado *"
            options={[
              { value: 'activo', label: 'Activo' },
              { value: 'inactivo', label: 'Inactivo' },
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}

