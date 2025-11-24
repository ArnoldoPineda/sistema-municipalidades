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
          <label className="block text-small text-gray-700 mb-xs">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn('input-base', error && 'input-error', className)}
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

