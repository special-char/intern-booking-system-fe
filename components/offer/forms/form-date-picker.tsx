"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"

interface FormDatePickerProps {
  label?: string
  error?: string
  helpText?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(
  ({ className, label, error, helpText, placeholder = "MM/DD/YYYY ——— AM", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          <input
            type="text"
            className={cn(
              "flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 pl-10 transition-colors",
              error && "border-red-500 focus:ring-red-100 focus:border-red-500",
              className,
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>
    )
  },
)
FormDatePicker.displayName = "FormDatePicker"

export { FormDatePicker }
