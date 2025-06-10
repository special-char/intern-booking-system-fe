"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MaxHeightWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number
  children: React.ReactNode
}

export function MaxHeightWrapper({
  maxHeight = "calc(100vh - 200px)",
  children,
  className,
  ...props
}: MaxHeightWrapperProps) {
  return (
    <div
      className={cn(
        "overflow-y-auto",
        className
      )}
      style={{
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
      }}
      {...props}
    >
      {children}
    </div>
  )
} 