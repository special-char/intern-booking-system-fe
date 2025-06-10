"use client"

import type React from "react"

import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 p-3 rounded-full bg-gray-800">{icon || <Info className="w-6 h-6 text-gray-400" />}</div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm">{description}</p>
    </div>
  )
}
