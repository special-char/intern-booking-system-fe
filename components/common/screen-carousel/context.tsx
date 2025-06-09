"use client"

import * as React from "react"

interface ScreenCarouselContextValue {
  currentIndex: number
  totalScreens: number
  goToNext: () => void
  goToPrevious: () => void
  goToScreen: (index: number) => void
}

const ScreenCarouselContext = React.createContext<ScreenCarouselContextValue | undefined>(
  undefined
)

interface ScreenCarouselProviderProps {
  children: React.ReactNode
  totalScreens: number
  autoPlay?: boolean
  interval?: number
}

export function ScreenCarouselProvider({
  children,
  totalScreens,
  autoPlay = false,
  interval = 5000,
}: ScreenCarouselProviderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalScreens)
  }, [totalScreens])

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalScreens) % totalScreens)
  }, [totalScreens])

  const goToScreen = React.useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  React.useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, goToNext])

  const value = React.useMemo(
    () => ({
      currentIndex,
      totalScreens,
      goToNext,
      goToPrevious,
      goToScreen,
    }),
    [currentIndex, totalScreens, goToNext, goToPrevious, goToScreen]
  )

  return (
    <ScreenCarouselContext.Provider value={value}>
      {children}
    </ScreenCarouselContext.Provider>
  )
}

export function useScreenCarousel() {
  const context = React.useContext(ScreenCarouselContext)
  if (context === undefined) {
    throw new Error("useScreenCarousel must be used within a ScreenCarouselProvider")
  }
  return context
} 