"use client"

import { Calendar as DatePicker } from "@/components/shadcn/calendar"
import { useDateRouteFilter } from "@/hooks/route-filters/use-date-route-filter"
import { getLocalDateString } from "@/utils/date"
import moment from "moment"

interface DateFilterProps {
  date?: string
}

export function DateFilter({ date }: DateFilterProps) {
  const { date: currentDateString, onDateChange } = useDateRouteFilter({ date })

  const currentDate: Date = moment(currentDateString).toDate()

  return (
    <DatePicker
      className="rounded-lg border shadow-card bg-white"
      mode="single"
      onDayClick={(date: Date) => {
        const dateFormatted: string = getLocalDateString(date)
        onDateChange(dateFormatted)
      }}
      selected={currentDate}
    />
  )
}