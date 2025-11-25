import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { catalogosService } from '@/services/catalogosService'

interface Categoria {
  id: string
  nombre: string
  activo: boolean
}

interface Rubro {
  id: string
  codigo: string
  nombre: string
  categoriaId: string
  activo: boolean
}

export default function CategoriasRubros() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)
  const [codigoRubro, setCodigoRubro] = useState('')
  const [nombreRubro, setNombreRubro] = useState('')
  const [editingRubro, setEditingRubro] = useState<Rubro | null>(null)
  const [loading, setLoading] = useState(true)

  // Datos por defecto si no hay Supabase configurado
  const categoriasDefault: Categoria[] = [
    { id: '1', nombre: 'Impuestos a Establecimientos Industriales', activo: true },
    { id: '2', nombre: 'Impuestos a Establecimientos Comerciales', activo: true },
    { id: '3', nombre: 'Impuestos a Establecimientos de Servicios', activo: true },
  ]

  const rubrosDefault: Rubro[] = [
    { id: '1', codigo: '11.7.1.01.01', nombre: 'Agricultura, ganadería, caza, selvicultura y pesca', categoriaId: '1', activo: true },
    { id: '2', codigo: '11.7.1.01.02', nombre: 'Matanza de ganado, preparación y conservación de carne', categoriaId: '1', activo: true },
    { id: '3', codigo: '11.7.1.01.03', nombre: 'Fabricación de productos lácteos', categoriaId: '1', activo: true },
    { id: '4', codigo: '11.7.1.01.04', nombre: 'Envasados y conservación de frutas y legumbres', categoriaId: '1', activo: true },
    { id: '5', codigo: '11.7.1.01.05', nombre: 'Procesamiento de pescado, crustáceos y moluscos', categoriaId: '1', activo: true },
    { id: '6', codigo: '11.7.1.01.06', nombre: 'Fabricación de aceites y grasas, vegetales y animales', categoriaId: '1', activo: true },
    { id: '7', codigo: '11.7.1.01.07', nombre: 'Elaboración de productos de molinería, harinas y almidones', categoriaId: '1', activo: true },
    { id: '8', codigo: '11.7.1.01.08', nombre: 'Procesadoras de Café', categoriaId: '1', activo: true },
    { id: '9', codigo: '11.7.1.01.09', nombre: 'Fabricación de productos de panadería', categoriaId: '1', activo: true },
    { id: '10', codigo: '11.7.1.01.10', nombre: 'Fabricación de azúcar', categoriaId: '1', activo: true },
    { id: '11', codigo: '11.7.1.01.11', nombre: 'Fabricación de cacao, chocolate y artículos de confitería', categoriaId: '1', activo: true },
    { id: '12', codigo: '11.7.1.01.12', nombre: 'Elaboración de otros productos alimenticios', categoriaId: '1', activo: true },
    { id: '13', codigo: '11.7.1.01.13', nombre: 'Elaboración de alimentos preparados para animales', categoriaId: '1', activo: true },
    { id: '14', codigo: '11.7.1.01.14', nombre: 'Planta Purificadora de Agua', categoriaId: '1', activo: true },
    { id: '15', codigo: '11.7.1.01.15', nombre: 'Destilación y mezcla de bebidas alcohólicas', categoriaId: '1', activo: true },
    { id: '16', codigo: '11.7.1.01.16', nombre: 'Industria textil, hilados y cordelería', categoriaId: '1', activo: true },
  ]

  const [categorias, setCategorias] = useState<Categoria[]>(categoriasDefault)
  const [rubros, setRubros] = useState<Rubro[]>(rubrosDefault)

  // Cargar datos desde Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [categoriasData, rubrosData] = await Promise.all([
          catalogosService.getCategoriasRubros(),
          catalogosService.getAllRubros()
        ])

        if (categoriasData.length > 0) {
          setCategorias(categoriasData.map((c: any) => ({
            id: c.id,
            nombre: c.nombre,
            activo: c.activo
          })))
        }

        if (rubrosData.length > 0) {
          setRubros(rubrosData.map((r: any) => ({
            id: r.id,
            codigo: r.codigo,
            nombre: r.nombre,
            categoriaId: r.categoria_id,
            activo: r.activo
          })))
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        // Mantener datos por defecto en caso de error
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const rubrosFiltrados = selectedCategoria
    ? rubros.filter(r => r.categoriaId === selectedCategoria)
    : rubros

  const rubrosConCategoria = rubrosFiltrados.map(rubro => ({
    ...rubro,
    categoriaNombre: categorias.find(c => c.id === rubro.categoriaId)?.nombre || ''
  }))

  const handleOpenModal = () => {
    if (!selectedCategoria) {
      alert('Por favor selecciona una categoría primero')
      return
    }
    setCodigoRubro('')
    setNombreRubro('')
    setEditingRubro(null)
    setIsModalOpen(true)
  }

  const handleSelectAll = () => {
    setSelectedCategoria(null)
  }

  const handleEdit = (rubro: Rubro) => {
    setSelectedCategoria(rubro.categoriaId)
    setCodigoRubro(rubro.codigo)
    setNombreRubro(rubro.nombre)
    setEditingRubro(rubro)
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!codigoRubro || !nombreRubro || !selectedCategoria) return

    try {
      if (editingRubro) {
        // Actualizar rubro
        const updated = await catalogosService.updateRubro(editingRubro.id, {
          codigo: codigoRubro,
          nombre: nombreRubro,
          categoria_id: selectedCategoria
        })

        if (updated) {
          setRubros(rubros.map(r =>
            r.id === editingRubro.id
              ? { ...r, codigo: codigoRubro, nombre: nombreRubro, categoriaId: selectedCategoria }
              : r
          ))
        }
      } else {
        // Crear nuevo rubro
        const newRubro = await catalogosService.createRubro({
          codigo: codigoRubro,
          nombre: nombreRubro,
          categoria_id: selectedCategoria
        })

        if (newRubro) {
          setRubros([...rubros, {
            id: newRubro.id,
            codigo: newRubro.codigo,
            nombre: newRubro.nombre,
            categoriaId: newRubro.categoria_id,
            activo: newRubro.activo
          }])
        }
      }

      setIsModalOpen(false)
      setCodigoRubro('')
      setNombreRubro('')
      setEditingRubro(null)
    } catch (error) {
      console.error('Error al guardar rubro:', error)
      alert('Error al guardar el rubro. Por favor, intenta nuevamente.')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este rubro?')) {
      try {
        await catalogosService.deleteRubro(id)
        setRubros(rubros.filter(r => r.id !== id))
      } catch (error) {
        console.error('Error al eliminar rubro:', error)
        alert('Error al eliminar el rubro. Por favor, intenta nuevamente.')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-text">Cargando datos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Categorías de Rubros de Negocios</h1>
          <p className="text-base text-neutral-text">Gestiona las categorías y rubros de negocios</p>
        </div>
        <Button onClick={handleOpenModal} className="flex items-center gap-xs">
          <Plus className="w-5 h-5" />
          Nuevo Rubro
        </Button>
      </div>

      {/* Lista de Categorías */}
      <div>
        <h2 className="text-h2 font-semibold mb-md">Categorías</h2>
        <div className="flex flex-wrap gap-md">
          <button
            onClick={handleSelectAll}
            className={`px-md py-sm rounded-sm font-medium transition-colors ${
              selectedCategoria === null
                ? 'bg-primary text-white'
                : 'bg-neutral-background text-neutral-text border border-neutral-border hover:bg-gray-100'
            }`}
          >
            Todas
          </button>
          {categorias.map(categoria => (
            <button
              key={categoria.id}
              onClick={() => setSelectedCategoria(categoria.id)}
              className={`px-md py-sm rounded-sm font-medium transition-colors ${
                selectedCategoria === categoria.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-background text-neutral-text border border-neutral-border hover:bg-gray-100'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Rubros */}
      <div>
        <h2 className="text-h2 font-semibold mb-md">
          {selectedCategoria 
            ? `Rubros - ${categorias.find(c => c.id === selectedCategoria)?.nombre}`
            : 'Todos los Rubros'}
        </h2>
        <Table headers={['Categoría', 'Código de rubro', 'Rubro', 'Acciones']}>
          {rubrosConCategoria.map((rubro, index) => (
            <TableRow key={rubro.id} stripe={index % 2 === 1}>
              <TableCell>{rubro.categoriaNombre}</TableCell>
              <TableCell>{rubro.codigo}</TableCell>
              <TableCell>{rubro.nombre}</TableCell>
              <TableCell>
                <div className="flex items-center gap-xs">
                  <Button
                    variant="secondary"
                    className="p-xs"
                    onClick={() => handleEdit(rubro)}
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