"use client"

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Column } from "@tanstack/react-table"

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function SortableHeader<TData, TValue>({
  column,
  title,
  className,
}: SortableHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("font-medium", className)}>{title}</div>
  }

  return (
    <button
      className={cn(
        "flex items-center gap-2 font-medium hover:text-foreground/80",
        className
      )}
      onClick={() => column.toggleSorting()}
    >
      {title}
      {{
        asc: <ArrowUp className="h-4 w-4" />,
        desc: <ArrowDown className="h-4 w-4" />,
      }[column.getIsSorted() as string] ?? <ArrowUpDown className="h-4 w-4" />}
    </button>
  )
} 