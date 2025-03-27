"use client"

import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface MaxHeightWrapperProps extends PropsWithChildren {
  className?: string
  offsetBotom?: number
  disabledAt?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const BREAKPOINT_VALUES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

/**
 * A wrapper component that automatically adjusts its maximum height based on viewport size
 * and the element's position on the page.
 * 
 * @param children - Child elements to be rendered inside the wrapper
 * @param offsetBottom - Optional bottom offset in pixels (default: 36px)
 * @param className - Optional CSS class name to style the wrapper
 * @param disabledAt - Optional breakpoint at which maxHeight will be set to 'unset'
 * 
 * The component calculates available height by subtracting the element's top offset
 * and bottom margin from viewport height. Content is only visible once maxHeight is calculated.
 * If the component is initially positioned below the bottom boundary, maxHeight is not set.
 */

export function MaxHeightWrapper({ children, offsetBotom = 36, className, disabledAt }: MaxHeightWrapperProps) {
  const [maxHeight, setMaxHeight] = useState<string>("unset")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }

    function calcMaxHeight() {
      const wrapperElement: HTMLDivElement | null = wrapperRef.current
      if (!wrapperElement) {
        return
      }

      if (disabledAt && window.innerWidth <= BREAKPOINT_VALUES[disabledAt]) {
        return setMaxHeight("unset")
      }

      const offsetTop: number = wrapperElement.getBoundingClientRect().top
      const bottomBoundary: number = window.innerHeight - offsetBotom

      setMaxHeight(offsetTop >= bottomBoundary ? "unset" : `${bottomBoundary - offsetTop}px`)
    }

    calcMaxHeight()
    setIsLoaded(true)
    window.addEventListener('resize', calcMaxHeight)

    return () => {
      window.removeEventListener('resize', calcMaxHeight)
    }
  }, [disabledAt])

  return (
    <div ref={wrapperRef} style={{ maxHeight }} className={className}>
      <div className={cn(!isLoaded && 'opacity-0')}>
        {children}
      </div>
    </div>
  );
}