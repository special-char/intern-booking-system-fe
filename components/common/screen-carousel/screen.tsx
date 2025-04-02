import type React from "react"
import { CarouselItem } from "@/components/shadcn/carousel"
import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface ScreenCarouselScreenProps extends PropsWithChildren {
  className?: string
}

export function ScreenCarouselScreen({ children, className }: ScreenCarouselScreenProps) {
  return (
    <CarouselItem className={cn("w-full pl-0", className)}>
      {children}
    </CarouselItem>
  )
}