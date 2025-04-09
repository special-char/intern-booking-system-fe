"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getLocalDateString } from "@/utils/date"

interface UseDateRouteFilterInterface {
  date?: string
}

interface UseDateRouteFilterReturnInterface {
  date: string
  onDateChange: (date: string) => void
}

export function useDateRouteFilter({ date }: UseDateRouteFilterInterface): UseDateRouteFilterReturnInterface {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate())

  useEffect(() => {
    setCurrentDate(getCurrentDate())
  }, [searchParams])

  function getCurrentDate(): string {
    return searchParams.get("date") ?? date ?? getLocalDateString()
  }

  function handleDateChange(newDate: string) {
    const params: URLSearchParams = new URLSearchParams(searchParams.toString())
    params.delete("date")

    params.set("date", newDate)
    setCurrentDate(newDate)
    router.push(`?${params.toString()}`)
  }

  return {
    date: currentDate,
    onDateChange: handleDateChange,
  }
}

