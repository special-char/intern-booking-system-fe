"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Table } from "@tanstack/react-table"

interface FilterOptionsButtonProps<TData> {
  table: Table<TData>
  filters: {
    id: string
    label: string
    options: {
      label: string
      value: string
    }[]
  }[]
}

export function multiValueFilterFn<TData>(
  row: any,
  columnId: string,
  filterValue: string[]
) {
  const value = row.getValue(columnId)
  return filterValue.length === 0 || filterValue.includes(value)
}

export function FilterOptionsButton<TData>({
  table,
  filters,
}: FilterOptionsButtonProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 lg:flex"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {filters.map((filter) => (
          <div key={filter.id} className="p-2">
            <div className="mb-2 text-sm font-medium">{filter.label}</div>
            {filter.options.map((option) => {
              const filterValues = (table
                .getColumn(filter.id)
                ?.getFilterValue() as string[]) || []
              
              return (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filterValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      table.getColumn(filter.id)?.setFilterValue([
                        ...filterValues,
                        option.value,
                      ])
                    } else {
                      table
                        .getColumn(filter.id)
                        ?.setFilterValue(
                          filterValues.filter((value) => value !== option.value)
                        )
                    }
                  }}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              )
            })}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 