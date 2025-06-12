"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingHeaderProps {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export function LoadingHeader({ className, isLoading, children }: LoadingHeaderProps) {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center p-4", className)}>
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    )
  }
  return <>{children}</>
} 