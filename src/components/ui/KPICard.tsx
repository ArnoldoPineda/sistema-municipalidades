import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: number | string
  change?: {
    value: number
    isPositive: boolean
  }
  variant?: 'blue' | 'green' | 'orange' | 'red'
  icon?: ReactNode
}

export default function KPICard({ 
  title, 
  value, 
  change, 
  variant = 'blue',
  icon 
}: KPICardProps) {
  const variantStyles = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  }

  const changeColors = {
    blue: change?.isPositive ? 'text-blue-600' : 'text-blue-600',
    green: change?.isPositive ? 'text-green-600' : 'text-green-600',
    orange: change?.isPositive ? 'text-orange-600' : 'text-orange-600',
    red: change?.isPositive ? 'text-red-600' : 'text-red-600',
  }

  return (
    <div className={cn('card border-2', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-text mb-xs">{title}</p>
          <p className="text-3xl font-bold text-neutral-text mb-xs">{value}</p>
          {change && (
            <p className={cn('text-sm font-medium', changeColors[variant])}>
              {change.isPositive ? '+' : ''}{change.value}% vs mes anterior
            </p>
          )}
        </div>
        {icon && (
          <div className="text-neutral-text/50">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}