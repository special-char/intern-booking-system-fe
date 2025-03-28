import type React from "react"
import "./style.css"
import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface HourSlotProps extends PropsWithChildren {
  isCurrentHour: boolean
  isLoading?: boolean
}

export function HourSlot({ children, isCurrentHour, isLoading }: HourSlotProps) {
  return (
    <div className={cn("wrapper", isCurrentHour && !isLoading && "current-hour")}>
      {children}
    </div>)
}

