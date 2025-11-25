import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: ModalProps) {
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

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white rounded-lg shadow-xl w-full',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-md border-b border-neutral-border">
            <h2 className="text-h3 font-semibold text-neutral-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-xs hover:bg-neutral-background rounded-sm transition-colors"
            >
              <X className="w-5 h-5 text-neutral-text" />
            </button>
          </div>
        )}
        <div className="p-md">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-xs p-md border-t border-neutral-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}