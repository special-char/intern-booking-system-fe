"use client"

import { Calendar as DatePicker } from "@/components/shadcn/calendar"
import moment from "moment";
import { enGB } from 'date-fns/locale';
import { useDateRangeRouteFilter } from "@/hooks/route-filters/use-date-range-route-filter";
import { DateRange } from "@/types/date";

interface DateFilterRangeProps {
  dateRange: DateRange
}

export function DateFilterRange({ dateRange }: DateFilterRangeProps) {
  const { dateRange: currentDateRange, onDateRangeChange } = useDateRangeRouteFilter({ dateRange })

  const dateFrom: Date = moment(currentDateRange.from).toDate()
  const dateTo: Date = moment(currentDateRange.to).toDate()

  return (
    <DatePicker
      className="rounded-lg border shadow-card bg-white"
      locale={enGB}
      modifiers={{
        selected: {
          from: dateFrom,
          to: dateTo
        },
        range_start: dateFrom,
        range_end: dateTo,
      }}
      mode="range"
      onDayClick={(day) => {
        onDateRangeChange({
          from: moment(day).startOf('isoWeek').format('YYYY-MM-DD'),
          to: moment(day).endOf('isoWeek').format('YYYY-MM-DD')
        });
      }}
    />
  )
}