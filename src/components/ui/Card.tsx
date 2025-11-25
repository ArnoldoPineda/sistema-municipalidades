import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn('card bg-white border border-neutral-border rounded-sm p-md', className)}>
      {children}
    </div>
  )
}