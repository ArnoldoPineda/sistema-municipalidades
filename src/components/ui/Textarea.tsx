import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-small text-gray-700 mb-xs">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn('input-base min-h-[100px] resize-y', error && 'input-error', className)}
          {...props}
        />
        {error && (
          <p className="text-xs text-danger mt-xs">{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea

