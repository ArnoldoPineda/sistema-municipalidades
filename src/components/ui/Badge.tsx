import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'success' | 'danger' | 'warning' | 'info'
  className?: string
}

export default function Badge({ children, variant = 'info', className }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
  }

  return (
    <span className={cn('px-xs py-xs rounded-sm text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}