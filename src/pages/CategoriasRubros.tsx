import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Card from '@/components/ui/Card'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Categoria {
  id: string
  nombre: string
}

interface Rubro {
  id: string
  codigo: string
  nombre: string
  categoriaId: string
}

export default function CategoriasRubros() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)
  const [codigoRubro, setCodigoRubro] = useState('')
  const [nombreRubro, setNombreRubro] = useState('')
  const [editingRubro, setEditingRubro] = useState<Rubro | null>(null)

  // Datos de ejemplo
  const [categorias] = useState<Categoria[]>([
    { id: '1', nombre: 'Impuestos a Establecimientos Industriales' },
    { id: '2', nombre: 'Impuestos a Establecimientos Comerciales' },
    { id: '3', nombre: 'Impuestos a Establecimientos de Servicios' },
  ])

  const [rubros] = useState<Rubro[]>([
    { id: '1', codigo: '11.7.1.01.01', nombre: 'Agricultura, ganadería, caza, selvicultura y pesca', categoriaId: '1' },
    { id: '2', codigo: '11.7.1.01.02', nombre: 'Matanza de ganado, preparación y conservación de carne', categoriaId: '1' },
    { id: '3', codigo: '11.7.1.01.03', nombre: 'Fabricación de productos lácteos', categoriaId: '1' },
    { id: '4', codigo: '11.7.1.01.04', nombre: 'Envasados y conservación de frutas y legumbres', categoriaId: '1' },
    { id: '5', codigo: '11.7.1.01.05', nombre: 'Procesamiento de pescado, crustáceos y moluscos', categoriaId: '1' },
    { id: '6', codigo: '11.7.1.01.06', nombre: 'Fabricación de aceites y grasas, vegetales y animales', categoriaId: '1' },
    { id: '7', codigo: '11.7.1.01.07', nombre: 'Elaboración de productos de molinería, harinas y almidones', categoriaId: '1' },
    { id: '8', codigo: '11.7.1.01.08', nombre: 'Procesadoras de Café', categoriaId: '1' },
    { id: '9', codigo: '11.7.1.01.09', nombre: 'Fabricación de productos de panadería', categoriaId: '1' },
    { id: '10', codigo: '11.7.1.01.10', nombre: 'Fabricación de azúcar', categoriaId: '1' },
    { id: '11', codigo: '11.7.1.01.11', nombre: 'Fabricación de cacao, chocolate y artículos de confitería', categoriaId: '1' },
    { id: '12', codigo: '11.7.1.01.12', nombre: 'Elaboración de otros productos alimenticios', categoriaId: '1' },
    { id: '13', codigo: '11.7.1.01.13', nombre: 'Elaboración de alimentos preparados para animales', categoriaId: '1' },
    { id: '14', codigo: '11.7.1.01.14', nombre: 'Planta Purificadora de Agua', categoriaId: '1' },
    { id: '15', codigo: '11.7.1.01.15', nombre: 'Destilación y mezcla de bebidas alcohólicas', categoriaId: '1' },
    { id: '16', codigo: '11.7.1.01.16', nombre: 'Industria textil hilados y cordelería', categoriaId: '1' },
  ])

  const rubrosFiltrados = selectedCategoria
    ? rubros.filter(r => r.categoriaId === selectedCategoria)
    : rubros

  const handleOpenModal = () => {
    setCodigoRubro('')
    setNombreRubro('')
    setEditingRubro(null)
    setIsModalOpen(true)
  }

  const handleEditRubro = (rubro: Rubro) => {
    setCodigoRubro(rubro.codigo)
    setNombreRubro(rubro.nombre)
    setEditingRubro(rubro)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    // TODO: Implementar guardado real
    console.log('Guardar rubro:', { codigo: codigoRubro, nombre: nombreRubro, categoriaId: selectedCategoria })
    setIsModalOpen(false)
    setCodigoRubro('')
    setNombreRubro('')
    setEditingRubro(null)
  }

  const handleDelete = (id: string) => {
    // TODO: Implementar eliminación real
    if (confirm('¿Estás seguro de eliminar este rubro?')) {
      console.log('Eliminar rubro:', id)
    }
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Categorías de Rubros de Negocios</h1>
          <p className="text-base text-neutral-text">Gestiona las categorías y rubros del sistema</p>
        </div>
        <Button onClick={handleOpenModal} className="flex items-center gap-xs">
          <Plus className="w-5 h-5" />
          Nuevo Rubro
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Tabla de Categorías */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">Categorías</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-background border-b border-neutral-border">
                  <th className="px-md py-sm text-left text-sm font-semibold text-neutral-text">
                    Categoría
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr
                    key={categoria.id}
                    onClick={() => setSelectedCategoria(categoria.id)}
                    className={`
                      border-b border-neutral-border cursor-pointer transition-colors
                      ${selectedCategoria === categoria.id
                        ? 'bg-primary-background'
                        : 'hover:bg-neutral-background'
                      }
                    `}
                  >
                    <td className="px-md py-md text-base">
                      {categoria.nombre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tabla de Rubros */}
        <Card>
          <h3 className="text-h3 font-semibold mb-md">
            Rubros
            {selectedCategoria && (
              <span className="text-base font-normal text-neutral-text ml-sm">
                ({rubrosFiltrados.length} items)
              </span>
            )}
          </h3>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <Table headers={['Código de rubro', 'Rubro', 'Acciones']}>
              {rubrosFiltrados.map((rubro, index) => (
                <TableRow key={rubro.id} stripe={index % 2 === 1}>
                  <TableCell>{rubro.codigo}</TableCell>
                  <TableCell>{rubro.nombre}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-xs">
                      <Button
                        variant="secondary"
                        className="p-xs"
                        onClick={() => handleEditRubro(rubro)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        className="p-xs"
                        onClick={() => handleDelete(rubro.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        </Card>
      </div>

      {/* Modal para Agregar/Editar Rubro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setCodigoRubro('')
          setNombreRubro('')
          setEditingRubro(null)
        }}
        title={editingRubro ? 'Editar Rubro' : 'Nuevo Rubro'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false)
                setCodigoRubro('')
                setNombreRubro('')
                setEditingRubro(null)
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
            label="Código de rubro"
            placeholder="Ej: 11.7.1.01.01"
            value={codigoRubro}
            onChange={(e) => setCodigoRubro(e.target.value)}
          />
          <Input
            label="Rubro"
            placeholder="Nombre del rubro"
            value={nombreRubro}
            onChange={(e) => setNombreRubro(e.target.value)}
          />
          {selectedCategoria && (
            <div className="p-md bg-neutral-background rounded-sm">
              <p className="text-sm text-neutral-text mb-xs">Categoría seleccionada:</p>
              <p className="text-base font-medium">
                {categorias.find(c => c.id === selectedCategoria)?.nombre}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}



