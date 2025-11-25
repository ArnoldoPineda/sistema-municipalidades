import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  label?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {label && (
          <label className="block text-small text-gray-700 mb-sm">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-md py-sm border border-neutral-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none pr-xl',
              error && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-md top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text pointer-events-none" />
        </div>
        {error && (
          <p className="text-xs text-danger mt-xs">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select

