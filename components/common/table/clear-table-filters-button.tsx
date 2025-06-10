"use client"

import { X } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { Table } from "@tanstack/react-table"

interface ClearTableFiltersButtonProps<TData> {
  table: Table<TData>
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function ClearTableFiltersButton<TData>({
  table,
  className,
  variant = "outline",
  size = "sm",
  disabled,
}: ClearTableFiltersButtonProps<TData>) {
  const handleClearFilters = () => {
    table.resetColumnFilters()
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClearFilters}
      className={className}
      disabled={disabled}
    >
      <X className="h-4 w-4 mr-2" />
      Clear Filters
    </Button>
  )
} 