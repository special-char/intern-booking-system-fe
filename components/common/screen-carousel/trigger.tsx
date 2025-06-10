"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useScreenCarousel } from "./context"

interface ScreenCarouselTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: "next" | "prev" | number
  children?: React.ReactNode
  showOnHover?: boolean
}

export function ScreenCarouselTrigger({
  action,
  children,
  showOnHover = false,
  className,
  ...props
}: ScreenCarouselTriggerProps) {
  const { goToNext, goToPrevious, goToScreen, totalScreens } = useScreenCarousel()

  const handleClick = () => {
    if (typeof action === "number") {
      if (action >= 0 && action < totalScreens) {
        goToScreen(action)
      }
    } else if (action === "next") {
      goToNext()
    } else if (action === "prev") {
      goToPrevious()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        showOnHover && "opacity-0 group-hover:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 