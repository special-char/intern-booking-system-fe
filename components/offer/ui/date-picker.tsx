"use client"

import { forwardRef, ChangeEvent } from "react"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"

interface DatePickerProps {
  label?: string
  error?: string
  description?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, description, placeholder = "MM/DD/YYYY ——— AM", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-white">{label}</label>}
        <div className="relative">
          <input
            type="text"
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 pl-10",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        {description && <p className="text-xs text-gray-400">{description}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
