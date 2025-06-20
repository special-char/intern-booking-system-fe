"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Edit, Trash2, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { FilterPopover } from "./filter-popover"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
  filterable?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  searchPlaceholder?: string
  showActions?: boolean
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = "Search",
  showActions = true,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for each filterable column
  const filterOptions = useMemo(() => {
    const options: Record<string, { value: string; label: string }[]> = {}

    columns.forEach((column) => {
      if (column.filterable) {
        const uniqueValues = Array.from(new Set(data.map((row) => row[column.key])))
        options[column.key] = uniqueValues.map((value) => ({
          value: String(value),
          label: String(value),
        }))
      }
    })

    return options
  }, [columns, data])

  // Update filters for a specific column
  const updateFilter = (columnKey: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: values,
    }))
  }

  // Apply filters and search to data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Check if row matches search term
      const matchesSearch =
        searchTerm === "" ||
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))

      // Check if row matches all active filters
      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true
        return values.includes(String(row[key]))
      })

      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, filters])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide filters" : "Show filters"}
        </Button>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          {columns
            .filter((column) => column.filterable)
            .map((column) => (
              <FilterPopover
                key={column.key}
                filterKey={column.label}
                options={filterOptions[column.key] || []}
                placeholder={`Filter by ${column.label}`}
                selectedValues={filters[column.key] || []}
                onChange={(values) => updateFilter(column.key, values)}
              />
            ))}
        </div>
      )}

      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {filteredData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-800">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)} className="text-white hover:bg-gray-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem onClick={() => onDelete(row)} className="text-red-400 hover:bg-gray-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          1 — {filteredData.length} of {data.length} results
        </span>
        <span>1 of 1 pages</span>
      </div>
    </div>
  )
}
