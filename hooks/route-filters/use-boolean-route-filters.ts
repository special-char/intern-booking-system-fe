"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { safeParseJSON } from "@/utils/safe-parse-json"

type Filters = Record<string, boolean>

interface UseBooleanUrlFiltersReturnInterface {
  isInitialized: boolean
  getIsChecked: (keys: string[]) => boolean
  onFiltersChange: (filters: Filters[]) => void
  onFiltersReset?: () => void
}

export function useBooleanUrlFilters(): UseBooleanUrlFiltersReturnInterface {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<Filters>({})
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  useEffect(() => {
    setFilters(getFiltersFromUrl())
    setIsInitialized(true)
  }, [searchParams])

  function getFiltersFromUrl(): Filters {
    const filterParam = searchParams.get('filters')
    if (!filterParam) {
      return {}
    }

    return safeParseJSON(decodeURIComponent(filterParam))
  }

  function handleFiltersChange(changedFilters: Record<string, boolean>[]): void {
    const newFilters: Filters = { ...filters }
    changedFilters.forEach((filter) => {
      const [key, value] = Object.entries(filter)[0]
      newFilters[key] = value
    })

    setFilters(newFilters)
    updateUrl(newFilters)
  }

  function updateUrl(newFilters: Record<string, boolean>) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('filters')

    const activeFilters = Object.entries(newFilters)
      .reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, boolean>);

    if (!!Object.keys(activeFilters).length) {
      const filtersJson = encodeURIComponent(JSON.stringify(activeFilters))
      params.set('filters', filtersJson)
    }

    router.push(`?${params.toString()}`)
  }

  function getIsChecked(keys: string[]): boolean {
    if (keys.length === 1) {
      return !!filters[keys[0]]
    }
    return keys.some((key) => filters[key])
  }

  function resetFilters() {
    setFilters({})
    updateUrl({})
  }

  return {
    isInitialized,
    onFiltersChange: handleFiltersChange,
    getIsChecked,
    onFiltersReset: !!Object.keys(filters).length ? resetFilters : undefined,
  }
}

