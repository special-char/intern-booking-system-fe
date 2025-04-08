"use client"

import { Calendar as DatePicker } from "@/components/shadcn/calendar"
import { useDateRouteFilter } from "@/hooks/route-filters/use-date-route-filter"
import { getLocalDateString } from "@/utils/date"

interface DateFilterProps {
  date?: string
}

export function DateFilter({ date }: DateFilterProps) {
  const { date: currentDate, onDateChange } = useDateRouteFilter({ date })

  return (
    <DatePicker
      className="rounded-lg border shadow-card bg-white"
      mode="single"
      onDayClick={(date: Date) => {
        const dateFormatted: string = getLocalDateString(date)
        onDateChange(dateFormatted)
      }}
      selected={new Date(currentDate)}
    />
  )
}