import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-small text-gray-700 mb-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-md py-sm border border-neutral-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
            error && 'border-danger focus:ring-danger',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-danger mt-xs">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

