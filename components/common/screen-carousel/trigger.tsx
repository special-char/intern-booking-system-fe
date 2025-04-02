import type React from "react"
import { cn } from "@/lib/utils"
import { useScreenCarousel } from "./context"
import { PropsWithChildren } from "react"

interface ScreenCarouselTriggerProps extends PropsWithChildren {
  goToScreen: number
  className?: string
}

export function ScreenCarouselTrigger({ children, goToScreen, className }: ScreenCarouselTriggerProps) {
  const { onCurrentScreenChange } = useScreenCarousel()

  function handleClick(): void {
    onCurrentScreenChange(goToScreen)
  }

  return (
    <div className={cn("cursor-pointer", className)} onClick={handleClick}>
      {children}
    </div>
  )
}

