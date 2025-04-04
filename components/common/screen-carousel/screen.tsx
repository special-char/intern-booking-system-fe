import type React from "react"
import { CarouselItem } from "@/components/shadcn/carousel"
import { cn } from "@/lib/utils"
import { PropsWithChildren, useEffect, useRef } from "react"
import { useScreenCarousel } from "./context"

export interface ScreenCarouselScreenProps extends PropsWithChildren {
  className?: string
  index?: number
}

export function ScreenCarouselScreen({ children, className, index }: ScreenCarouselScreenProps) {
  const { currentScreen } = useScreenCarousel()
  const screenRef = useRef<HTMLDivElement>(null)

  const isActive: boolean = currentScreen === index

  // Focus management
  useEffect(() => {
    if (isActive && screenRef.current) {
      // Find the first focusable element in the screen
      const focusableElements = screenRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (!!focusableElements.length) {
        // Set focus to the first focusable element when screen becomes active
        setTimeout(() => {
          (focusableElements[0] as HTMLElement).focus()
        }, 300);
      }
    }
  }, [isActive])

  return (
    <CarouselItem
      tabIndex={isActive ? undefined : -1}
      className={cn("w-full pl-0", className)}
      ref={screenRef}
    >
      {children}
    </CarouselItem>
  )
}