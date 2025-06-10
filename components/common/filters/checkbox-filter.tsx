"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxFilterProps {
  id: string
  label: string
  options: {
    label: string
    value: string
  }[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function CheckboxFilter({
  id,
  label,
  options,
  value,
  onChange,
  className,
}: CheckboxFilterProps) {
  const handleChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-sm font-medium">{label}</div>
      <div className="space-y-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 text-sm"
          >
            <div className="relative flex h-4 w-4 items-center justify-center">
              <input
                type="checkbox"
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-input bg-background transition-colors checked:border-primary checked:bg-primary"
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
              <Check
                className={cn(
                  "pointer-events-none absolute h-3 w-3 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
                )}
              />
            </div>
            <span className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
} 