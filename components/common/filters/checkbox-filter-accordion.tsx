"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { CheckboxFilter } from "./checkbox-filter"

interface CheckboxFilterAccordionProps {
  id: string
  label: string
  options: {
    label: string
    value: string
  }[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
  defaultOpen?: boolean
}

export function CheckboxFilterAccordion({
  id,
  label,
  options,
  value,
  onChange,
  className,
  defaultOpen = false,
}: CheckboxFilterAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("border-b", className)}>
      <button
        className="flex w-full items-center justify-between py-4 text-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <CheckboxFilter
            id={id}
            label=""
            options={options}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
} 