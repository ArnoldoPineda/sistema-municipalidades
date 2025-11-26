import { useState, useRef } from 'react'
import Button from './Button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  label: string
  value: string | null
  onChange: (base64: string | null) => void
  accept?: string
  maxSizeMB?: number
  previewWidth?: number
  previewHeight?: number
}

export default function ImageUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
  maxSizeMB = 5,
  previewWidth = 200,
  previewHeight = 100
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError(null)

    // Validar tamaño
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`El archivo es muy grande. Tamaño máximo: ${maxSizeMB}MB`)
      return
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }

    // Convertir a base64
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          onChange(e.target.result)
        }
      }
      reader.onerror = () => {
        setError('Error al leer el archivo')
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError('Error al procesar la imagen')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm text-gray-700 mb-sm">{label}</label>
      
      {value ? (
        <div className="relative inline-block">
          <div
            className="border-2 border-neutral-border rounded-sm overflow-hidden"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-xs hover:bg-red-700 transition-colors"
            title="Eliminar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-sm p-lg text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-primary bg-primary-background' 
              : 'border-neutral-border hover:border-primary hover:bg-gray-50'
            }
          `}
          style={{ minHeight: previewHeight }}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-8 h-8 mx-auto mb-sm text-neutral-text" />
          <p className="text-sm text-neutral-text mb-xs">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-neutral-text">
            Tamaño máximo: {maxSizeMB}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}

      {!value && (
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="mt-sm flex items-center gap-xs"
        >
          <Upload className="w-4 h-4" />
          Cargar imagen
        </Button>
      )}

      {error && (
        <p className="text-xs text-danger mt-xs">{error}</p>
      )}
    </div>
  )
}






