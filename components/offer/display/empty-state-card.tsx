"use client"

import type React from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function EmptyStateCard({ title, description, icon, className, children }: EmptyStateCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl shadow-lg p-6",
        className,
      )}
    >
      <div className="mb-4 p-3 rounded-full bg-gray-100">{icon || <Info className="w-6 h-6 text-gray-500" />}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {children}
    </div>
  )
}
