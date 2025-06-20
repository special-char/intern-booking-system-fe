"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name: string
  className?: string
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({ options, value, onChange, name, className }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-3", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
            value === option.value ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800 hover:bg-gray-700",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            className="mt-1 h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{option.label}</div>
            {option.description && <div className="text-xs text-gray-400 mt-1">{option.description}</div>}
          </div>
        </label>
      ))}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
