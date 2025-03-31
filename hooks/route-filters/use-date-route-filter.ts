"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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
    return date ?? searchParams.get("date") ?? new Date().toISOString().split('T')[0]
  }

  function handleDateChange(newDate: string) {
    const params: URLSearchParams = new URLSearchParams()

    searchParams.forEach((value, key) => {
      if (key !== "date") {
        params.set(key, value)
      }
    })

    params.set("date", newDate)
    setCurrentDate(newDate)
    router.push(`?${params.toString()}`)
  }

  return {
    date: currentDate,
    onDateChange: handleDateChange,
  }
}

