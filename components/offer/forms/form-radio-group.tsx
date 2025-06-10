"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface FormRadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name: string
  className?: string
  label?: string
  error?: string
  helpText?: string
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ options, value, onChange, name, className, label, error, helpText }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div ref={ref} className={cn("space-y-3", className)}>
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
                value === option.value ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white hover:bg-gray-50",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                {option.description && <div className="text-xs text-gray-500 mt-1">{option.description}</div>}
              </div>
            </label>
          ))}
        </div>
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>
    )
  },
)
FormRadioGroup.displayName = "FormRadioGroup"

export { FormRadioGroup }
