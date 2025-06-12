"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingCellProps {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export function LoadingCell({ className, isLoading, children }: LoadingCellProps) {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center p-4", className)}>
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    )
  }
  return <>{children}</>
} 