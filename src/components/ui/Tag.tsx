import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  onRemove?: () => void
  className?: string
}

export default function Tag({ children, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-xs px-sm py-xs bg-primary-background text-primary rounded-sm text-sm',
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-primary/20 rounded-full p-xs transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}



