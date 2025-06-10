"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableWithActionsProps {
  columns: TableColumn[]
  data: any[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  searchPlaceholder?: string
  showActions?: boolean
  title?: string
  onCreateNew?: () => void
}

export function DataTableWithActions({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = "Search",
  showActions = true,
  title,
  onCreateNew,
}: DataTableWithActionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
          {onCreateNew && (
            <Button
              onClick={onCreateNew}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-lg transition-all"
            >
              Create
            </Button>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm">
          Add filter
        </Button>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-full h-9"
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-300 shadow-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-indigo-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)} className="text-gray-700 hover:bg-gray-100">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem onClick={() => onDelete(row)} className="text-red-700 hover:bg-red-50">
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

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          1 — {filteredData.length} of {data.length} results
        </span>
        <span>1 of 1 pages</span>
      </div>
    </div>
  )
}
