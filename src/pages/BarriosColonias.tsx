import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import Table, { TableRow, TableCell } from '@/components/ui/Table'
import { Plus, Search, Edit, Trash2, X } from 'lucide-react'

interface BarrioColonia {
  id: string
  codigo: string
  aldea: string
  nombre: string
}

export default function BarriosColonias() {
  const [aldeas] = useState([
    { value: 'cedeño', label: 'Cedeño' },
    { value: 'marcovia', label: 'Marcovia' },
    { value: 'guapinolito', label: 'Guapinolito' },
  ])

  const [barrios, setBarrios] = useState<BarrioColonia[]>([
    { id: '1', codigo: '060702001', aldea: 'cedeño', nombre: 'Cededo' },
    { id: '2', codigo: '060702002', aldea: 'cedeño', nombre: 'Col. Familias Unidas' },
    { id: '3', codigo: '060702003', aldea: 'cedeño', nombre: 'Col. Francesa O El Venado' },
    { id: '4', codigo: '060702004', aldea: 'cedeño', nombre: 'El Matapalo' },
    { id: '5', codigo: '060702006', aldea: 'cedeño', nombre: 'Guipo' },
    { id: '6', codigo: '060702007', aldea: 'cedeño', nombre: 'Hacda. Herrera' },
    { id: '7', codigo: '060702008', aldea: 'cedeño', nombre: 'Hacda. La Isla' },
    { id: '8', codigo: '060702009', aldea: 'cedeño', nombre: 'Hacda. La Moga' },
    { id: '9', codigo: '060702010', aldea: 'cedeño', nombre: 'Isla De Guapinolito' },
    { id: '10', codigo: '060702011', aldea: 'cedeño', nombre: 'Isla De Tomason' },
    { id: '11', codigo: '060702012', aldea: 'cedeño', nombre: 'La Butaca' },
    { id: '12', codigo: '060702013', aldea: 'cedeño', nombre: 'Las Doradas' },
    { id: '13', codigo: '040700014', aldea: 'marcovia', nombre: 'Los Delgaditos' },
  ])

  const [aldeaFiltro, setAldeaFiltro] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [selectedBarrio, setSelectedBarrio] = useState<BarrioColonia | null>(null)
  const [codigo, setCodigo] = useState('')
  const [aldea, setAldea] = useState('')
  const [nombre, setNombre] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Filtrar barrios
  const barriosFiltrados = barrios.filter(barrio => {
    const matchAldea = !aldeaFiltro || barrio.aldea === aldeaFiltro
    const matchBusqueda = !busqueda || 
      barrio.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      barrio.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return matchAldea && matchBusqueda
  })

  const handleSelectBarrio = (barrio: BarrioColonia) => {
    setSelectedBarrio(barrio)
    setCodigo(barrio.codigo)
    setAldea(barrio.aldea)
    setNombre(barrio.nombre)
    setIsEditing(true)
  }

  const handleNuevo = () => {
    setSelectedBarrio(null)
    setCodigo('')
    setAldea(aldeaFiltro || '')
    setNombre('')
    setIsEditing(false)
  }

  const handleGuardar = () => {
    if (!codigo || !aldea || !nombre) {
      alert('Por favor completa todos los campos')
      return
    }

    if (isEditing && selectedBarrio) {
      // Editar existente
      setBarrios(barrios.map(b => 
        b.id === selectedBarrio.id 
          ? { ...b, codigo, aldea, nombre }
          : b
      ))
    } else {
      // Crear nuevo
      const nuevoBarrio: BarrioColonia = {
        id: Date.now().toString(),
        codigo,
        aldea,
        nombre
      }
      setBarrios([...barrios, nuevoBarrio])
    }

    handleCancelar()
  }

  const handleCancelar = () => {
    setSelectedBarrio(null)
    setCodigo('')
    setAldea('')
    setNombre('')
    setIsEditing(false)
  }

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este barrio/colonia?')) {
      setBarrios(barrios.filter(b => b.id !== id))
      if (selectedBarrio?.id === id) {
        handleCancelar()
      }
    }
  }

  return (
    <div className="space-y-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 font-bold mb-xs">Gestión de Barrios y Colonias</h1>
          <p className="text-base text-neutral-text">Administra los barrios y colonias del municipio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Panel Izquierdo - Lista */}
        <Card>
          <div className="space-y-md">
            {/* Filtros */}
            <div className="space-y-md">
              <div>
                <label className="block text-sm text-gray-700 mb-xs">Aldea</label>
                <Select
                  options={[
                    { value: '', label: 'Todas las aldeas' },
                    ...aldeas
                  ]}
                  value={aldeaFiltro}
                  onChange={(e) => setAldeaFiltro(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Search className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text" />
                <Input
                  placeholder="Buscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-xl"
                />
              </div>

              <p className="text-sm text-neutral-text">
                Total: {barriosFiltrados.length}
              </p>
            </div>

            {/* Tabla de Barrios */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table headers={['Código', 'Barrio/Colonia']}>
                {barriosFiltrados.map((barrio, index) => (
                  <TableRow
                    key={barrio.id}
                    stripe={index % 2 === 1}
                    onClick={() => handleSelectBarrio(barrio)}
                    className={selectedBarrio?.id === barrio.id ? 'bg-primary-background' : ''}
                  >
                    <TableCell>{barrio.codigo}</TableCell>
                    <TableCell>{barrio.nombre}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        </Card>

        {/* Panel Derecho - Formulario */}
        <Card>
          <div className="space-y-md">
            <div className="flex items-center justify-between mb-md">
              <h3 className="text-h3 font-semibold">
                {isEditing ? 'Editar barrio / colonia' : 'Nuevo barrio / colonia'}
              </h3>
              {isEditing && (
                <Button
                  variant="secondary"
                  className="p-xs"
                  onClick={handleCancelar}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-md">
              <Input
                label="Código"
                placeholder="Ej: 060702001"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />

              <div>
                <label className="block text-sm text-gray-700 mb-xs">
                  Aldea del barrio / colonia
                </label>
                <Select
                  options={aldeas}
                  value={aldea}
                  onChange={(e) => setAldea(e.target.value)}
                />
              </div>

              <Input
                label="Nombre del barrio/colonia"
                placeholder="Ej: Cededo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="flex gap-md pt-md">
              <Button
                variant="secondary"
                onClick={handleNuevo}
                className="flex items-center gap-xs"
              >
                <Plus className="w-4 h-4" />
                Nuevo
              </Button>
              <Button
                onClick={handleGuardar}
                className="flex items-center gap-xs"
              >
                Guardar
              </Button>
              {isEditing && (
                <Button
                  variant="secondary"
                  onClick={handleCancelar}
                >
                  Cancelar
                </Button>
              )}
            </div>

            {isEditing && selectedBarrio && (
              <div className="pt-md border-t border-neutral-border">
                <Button
                  variant="danger"
                  onClick={() => handleEliminar(selectedBarrio.id)}
                  className="flex items-center gap-xs"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}



