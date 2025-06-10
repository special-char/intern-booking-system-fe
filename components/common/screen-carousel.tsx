"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"
import { ScreenCarouselProvider, useScreenCarousel } from "@/components/common/screen-carousel/context"

interface ScreenCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  showControls?: boolean
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
}

interface ScreenCarouselScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function ScreenCarouselContent({
  children,
  showControls = true,
  showDots = true,
  className,
  ...props
}: Omit<ScreenCarouselProps, "autoPlay" | "interval">) {
  const { currentIndex, totalScreens, goToNext, goToPrevious, goToScreen } = useScreenCarousel()

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {children}
      </div>

      {showControls && totalScreens > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showDots && totalScreens > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: totalScreens }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => goToScreen(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function ScreenCarousel({
  children,
  showControls = true,
  showDots = true,
  autoPlay = false,
  interval = 5000,
  ...props
}: ScreenCarouselProps) {
  const childrenArray = React.Children.toArray(children)
  const totalScreens = childrenArray.length

  return (
    <ScreenCarouselProvider
      totalScreens={totalScreens}
      autoPlay={autoPlay}
      interval={interval}
    >
      <ScreenCarouselContent
        showControls={showControls}
        showDots={showDots}
        {...props}
      >
        {children}
      </ScreenCarouselContent>
    </ScreenCarouselProvider>
  )
}

export function ScreenCarouselScreen({
  children,
  className,
  ...props
}: ScreenCarouselScreenProps) {
  return (
    <div
      className={cn("w-full flex-shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  )
} 