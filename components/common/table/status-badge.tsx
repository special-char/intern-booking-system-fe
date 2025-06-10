"use client"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

const statusStyles: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyle = statusStyles[status.toLowerCase()] || statusStyles.default

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyle,
        className
      )}
    >
      {status}
    </span>
  )
} 