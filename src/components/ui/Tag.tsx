import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: ReactNode
  onRemove?: () => void
  className?: string
}

export default function Tag({ children, onRemove, className }: TagProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-xs px-sm py-xs bg-blue-100 text-blue-800 rounded-sm text-sm',
      className
    )}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-blue-200 rounded-full p-xs transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}