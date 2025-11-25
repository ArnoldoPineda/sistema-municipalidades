import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TableProps {
  headers: string[]
  children: ReactNode
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-background border-b border-neutral-border">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-md py-sm text-left text-small font-semibold text-neutral-text"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}

interface TableRowProps {
  children: ReactNode
  hover?: boolean
  stripe?: boolean
  onClick?: () => void
  className?: string
}

export function TableRow({ children, hover = true, stripe = false, onClick, className }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-neutral-border',
        hover && 'hover:bg-neutral-background cursor-pointer transition-colors',
        stripe && 'bg-gray-50/50',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

interface TableCellProps {
  children?: ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
  colSpan?: number
}

export function TableCell({ children, align = 'left', className, colSpan }: TableCellProps) {
  return (
    <td 
      className={cn('px-md py-md text-base', `text-${align}`, className)}
      colSpan={colSpan}
    >
      {children}
    </td>
  )
}

