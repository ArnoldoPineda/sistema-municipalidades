import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

interface BarrioColonia {
  id: string
  nombre: string
  aldea: string
  activo: boolean
}

export default function BarriosColonias() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAldea, setSelectedAldea] = useState('')
  const [nombreBarrio, setNombreBarrio] = useState('')
  const [aldeaBarrio, setAldeaBarrio] = useState('')
  const [editingBarrio, setEditingBarrio] = useState<BarrioColonia | null>(null)

  const aldeas = [
    { value: 'marcovia', label: 'Marcovia' },
    { value: 'cedeño', label: 'Cedeño' },
    { value: 'monjaras', label: 'Monjaras' },
    { value: 'guapinolito', label: 'Guapinolito' },
  ]

  const [barrios, setBarrios] = useState<BarrioColonia[]>([
    { id: '1', nombre: 'Bo. El Centro De Marcovia', aldea: 'marcovia', activo: true },
    { id: '2', nombre: 'Buena Vista', aldea: 'marcovia', activo: true },
    { id: '3', nombre: 'Cededo', aldea: 'cedeño', activo: true },
    { id: '4', nombre: 'Col. Familias Unidas', aldea: 'cedeño', activo: true },
  ])

  const barriosFiltrados = barrios.filter(barrio => {
    const matchSearch = barrio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchAldea = !selectedAldea || barrio.aldea === selectedAldea
    return matchSearch && matchAldea
  })

  const handleOpenModal = () => {
    setNombreBarrio('')
    setAldeaBarrio('')
    setEditingBarrio(null)
    setIsModalOpen(true)
  }

  const handleEdit = (barrio: BarrioColonia) => {
    setNombreBarrio(barrio.nombre)
    setAldeaBarrio(barrio.aldea)
    setEditingBarrio(barrio)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!nombreBarrio || !aldeaBarrio) return

    if (editingBarrio) {
      setBarrios(barrios.map(b =>
        b.id === editingBarrio.id
          ? { ...b, nombre: nombreBarrio, aldea: aldeaBarrio }
          : b
      ))
    } else {
      const newBarrio: BarrioColonia = {
        id: Date.now().toString(),
        nombre: nombreBarrio,
        aldea: aldeaBarrio,
        activo: true
      }
      setBarrios([...barrios, newBarrio])
    }

    setIsModalOpen(false)
    setNombreBarrio('')
    setAldeaBarrio('')
    setEditingBarrio(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este barrio/colonia?')) {
      setBarrios(barrios.filter(b => b.id !== id))
    }
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Barrios y Colonias</h1>
          <p className="text-base text-neutral-text">Gestiona los barrios y colonias del municipio</p>
        </div>
        <Button onClick={handleOpenModal} className="flex items-center gap-xs">
          <Plus className="w-5 h-5" />
          Nuevo Barrio/Colonia
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-md">
        <div className="relative flex-1">
          <Search className="absolute left-md top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-text/50" />
          <Input
            placeholder="Buscar barrio o colonia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-xl"
          />
        </div>
        <Select
          options={[
            { value: '', label: 'Todas las aldeas' },
            ...aldeas
          ]}
          value={selectedAldea}
          onChange={(e) => setSelectedAldea(e.target.value)}
          className="w-full md:w-64"
        />
      </div>

      <Table headers={['#', 'Nombre', 'Aldea', 'Estado', 'Acciones']}>
        {barriosFiltrados.map((barrio, index) => (
          <TableRow key={barrio.id} stripe={index % 2 === 1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{barrio.nombre}</TableCell>
            <TableCell>{aldeas.find(a => a.value === barrio.aldea)?.label || barrio.aldea}</TableCell>
            <TableCell>
              <span className={`px-xs py-xs rounded-sm text-xs font-medium ${
                barrio.activo 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {barrio.activo ? 'Activo' : 'Inactivo'}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-xs">
                <Button
                  variant="secondary"
                  className="p-xs"
                  onClick={() => handleEdit(barrio)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  className="p-xs"
                  onClick={() => handleDelete(barrio.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setNombreBarrio('')
          setAldeaBarrio('')
          setEditingBarrio(null)
        }}
        title={editingBarrio ? 'Editar Barrio/Colonia' : 'Nuevo Barrio/Colonia'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false)
                setNombreBarrio('')
                setAldeaBarrio('')
                setEditingBarrio(null)
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </>
        }
      >
        <div className="space-y-md">
          <Input
            label="Nombre del Barrio/Colonia *"
            placeholder="Ej: Bo. El Centro De Marcovia"
            value={nombreBarrio}
            onChange={(e) => setNombreBarrio(e.target.value)}
          />
          <Select
            label="Aldea *"
            options={aldeas}
            value={aldeaBarrio}
            onChange={(e) => setAldeaBarrio(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}