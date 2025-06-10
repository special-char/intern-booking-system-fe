"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefixText?: string
  suffixText?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, helpText, leftIcon, rightIcon, prefixText, suffixText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{leftIcon}</div>
          )}
          {prefixText && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {prefixText}
            </span>
          )}
          <input
            className={cn(
              "flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
              leftIcon && "pl-10",
              prefixText && "pl-8",
              (rightIcon || suffixText) && "pr-10",
              error && "border-red-500 focus:ring-red-100 focus:border-red-500",
              className,
            )}
            ref={ref}
            {...props}
          />
          {suffixText && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              {suffixText}
            </span>
          )}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{rightIcon}</div>
          )}
        </div>
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>
    )
  },
)
FormInput.displayName = "FormInput"

export { FormInput }
