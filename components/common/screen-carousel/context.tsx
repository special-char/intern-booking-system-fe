"use client"

import { createContext, useContext } from "react"

export interface ScreenCarouselContextType {
  currentScreen: number
  onCurrentScreenChange: (index: number) => void
}

export const ScreenCarouselContext = createContext<ScreenCarouselContextType>({
  currentScreen: 0,
  onCurrentScreenChange: () => { },
})

export function useScreenCarousel(): ScreenCarouselContextType {
  return useContext(ScreenCarouselContext)
}
