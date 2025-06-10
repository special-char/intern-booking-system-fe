"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingHeaderProps {
  className?: string
}

export function LoadingHeader({ className }: LoadingHeaderProps) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    </div>
  )
} 