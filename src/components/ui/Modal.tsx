import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-modal max-w-[600px] w-full max-h-[80vh] flex flex-col mx-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-lg border-b border-neutral-border">
          <h3 className="text-h3 font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-xs hover:bg-neutral-background rounded-sm transition-colors"
          >
            <X className="w-6 h-6 text-neutral-text" />
          </button>
        </div>

        {/* Content */}
        <div className="p-lg overflow-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-lg border-t border-neutral-border flex justify-end gap-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}



