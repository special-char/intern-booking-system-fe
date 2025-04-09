"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getLocalEndWeekDateString, getLocalStartWeekDateString } from "@/utils/date"
import { safeParseJSON } from "@/utils/safe-parse-json"
import { DateRange } from "@/types/date"

interface UseDateRangeRouteFilterInterface {
  dateRange: DateRange
}

interface UseDateRangeRouteFilterReturnInterface {
  dateRange: DateRange
  onDateRangeChange: (dateRange: DateRange) => void
}

export function useDateRangeRouteFilter({ dateRange }: UseDateRangeRouteFilterInterface): UseDateRangeRouteFilterReturnInterface {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentDateRange, setCurrentDateRange] = useState<DateRange>(getCurrentDateRange())

  useEffect(() => {
    setCurrentDateRange(getCurrentDateRange())
  }, [searchParams])

  function getCurrentDateRange(): DateRange {
    const dateRangeParam: string | null = searchParams.get("dateRange")
    if (!dateRangeParam) {
      return dateRange ?? { from: getLocalStartWeekDateString(), to: getLocalEndWeekDateString() }
    }
    return safeParseJSON(decodeURIComponent(dateRangeParam))
  }

  function handleDateRangeChange(newDateRange: DateRange) {
    const params: URLSearchParams = new URLSearchParams(searchParams.toString())
    params.delete("dateRange")

    const dateRangeJson = encodeURIComponent(JSON.stringify(newDateRange))
    params.set("dateRange", dateRangeJson)
    setCurrentDateRange(newDateRange)
    router.push(`?${params.toString()}`)
  }

  return {
    dateRange: currentDateRange,
    onDateRangeChange: handleDateRangeChange,
  }
}

