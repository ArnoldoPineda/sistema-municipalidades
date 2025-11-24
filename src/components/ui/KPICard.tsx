import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  variant?: 'blue' | 'green' | 'orange' | 'red'
}

export default function KPICard({ title, value, change, variant = 'blue' }: KPICardProps) {
  const variants = {
    blue: 'border-t-primary',
    green: 'border-t-success',
    orange: 'border-t-warning',
    red: 'border-t-danger',
  }

  const valueColors = {
    blue: 'text-primary',
    green: 'text-success',
    orange: 'text-warning',
    red: 'text-danger',
  }

  return (
    <div className={cn('card border-t-4', variants[variant])}>
      <p className="text-small text-neutral-text mb-sm">{title}</p>
      <p className={cn('text-h2 font-semibold mb-sm', valueColors[variant])}>
        {value}
      </p>
      {change && (
        <div className="flex items-center gap-xs text-xs text-neutral-text">
          {change.isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change.isPositive ? '+' : ''}{change.value}%</span>
        </div>
      )}
    </div>
  )
}

