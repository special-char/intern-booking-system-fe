"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/shadcn/calendar"
import { Button } from "@/components/shadcn/button"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { DateRange } from "@/types/date"

interface DateFilterRangeProps {
  dateRange: DateRange
  className?: string
  disabled?: boolean
}

export function DateFilterRange({
  dateRange,
  className,
  disabled = false,
}: DateFilterRangeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [fromDate, setFromDate] = React.useState<Date | undefined>(
    dateRange.from ? new Date(dateRange.from) : undefined
  )
  const [toDate, setToDate] = React.useState<Date | undefined>(
    dateRange.to ? new Date(dateRange.to) : undefined
  )

  const handleSelect = (selectedDate: Date | undefined, isFrom: boolean) => {
    if (isFrom) {
      setFromDate(selectedDate)
    } else {
      setToDate(selectedDate)
    }

    const params = new URLSearchParams(searchParams.toString())
    const newDateRange: DateRange = {
      from: selectedDate && isFrom ? selectedDate.toISOString() : dateRange.from,
      to: selectedDate && !isFrom ? selectedDate.toISOString() : dateRange.to
    }

    params.set('dateRange', encodeURIComponent(JSON.stringify(newDateRange)))
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setFromDate(undefined)
    setToDate(undefined)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('dateRange')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !fromDate && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate ? format(fromDate, "PPP") : <span>From</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={(date) => handleSelect(date, true)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !toDate && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {toDate ? format(toDate, "PPP") : <span>To</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={(date) => handleSelect(date, false)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {(fromDate || toDate) && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 