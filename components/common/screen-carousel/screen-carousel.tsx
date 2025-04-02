"use client"

import type React from "react"
import { useState, useEffect, PropsWithChildren } from "react"
import { Carousel, CarouselContent, CarouselOptions, type CarouselApi } from "@/components/shadcn/carousel"
import { cn } from "@/lib/utils"
import { ScreenCarouselContext } from "./context"

interface ScreenCarouselProps extends PropsWithChildren {
  className?: string
  initialScreen?: number
  options?: CarouselOptions
}

function ScreenCarousel({ children, className, initialScreen = 0, options = {} }: ScreenCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentScreen, setCurrentScreen] = useState<number>(0)

  useEffect(() => {
    if (!api) return

    function onSelect(): void {
      if (!api) return
      const current: number = api.selectedScrollSnap()
      setCurrentScreen(current)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  function handleScreenChange(index: number): void {
    if (!api) return

    api.scrollTo(index)
    setCurrentScreen(index)
  }

  return (
    <ScreenCarouselContext.Provider value={{ currentScreen, onCurrentScreenChange: handleScreenChange }}>
      <Carousel
        setApi={setApi}
        className={cn("w-full", className)}
        opts={{
          align: "start",
          loop: false,
          startIndex: initialScreen,
          watchDrag: false,
          ...options,
        }}
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
    </ScreenCarouselContext.Provider>
  )
}

export { ScreenCarousel }
export { ScreenCarouselScreen } from "./screen"
export { ScreenCarouselTrigger } from "./trigger"
export { useScreenCarousel } from "./context"
