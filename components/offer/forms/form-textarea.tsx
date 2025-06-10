"use client"

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, helpText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors",
            error && "border-red-500 focus:ring-red-100 focus:border-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>
    )
  },
)
FormTextarea.displayName = "FormTextarea"

export { FormTextarea }
