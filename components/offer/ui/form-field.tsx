"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  description?: string
  prefix?: string
  suffix?: string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, label, error, description, prefix, suffix, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-white">{label}</label>}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>
          )}
          <input
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              prefix && "pl-8",
              suffix && "pr-12",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">{suffix}</span>
          )}
        </div>
        {description && <p className="text-xs text-gray-400">{description}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)
FormField.displayName = "FormField"

export { FormField }
