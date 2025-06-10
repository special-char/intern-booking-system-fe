"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
}

interface FilterPopoverProps {
  options: FilterOption[]
  placeholder: string
  selectedValues: string[]
  onChange: (values: string[]) => void
  filterKey: string
}

export function FilterPopover({ options, placeholder, selectedValues, onChange, filterKey }: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false)

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const removeValue = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value))
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-200"
          >
            {`Filter by ${filterKey}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-gray-800 border-gray-700">
          <Command className="bg-gray-800">
            <CommandInput placeholder={placeholder} className="text-gray-300" />
            <CommandList>
              <CommandEmpty className="py-2 text-center text-sm text-gray-400">No results found.</CommandEmpty>
              <CommandGroup className="max-h-[200px] overflow-auto">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-gray-200"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-600",
                        selectedValues.includes(option.value) ? "bg-blue-500 border-blue-500" : "opacity-50",
                      )}
                    >
                      {selectedValues.includes(option.value) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => {
            const option = options.find((o) => o.value === value)
            return (
              <Badge key={value} variant="secondary" className="bg-gray-700 text-gray-300">
                {option?.label || value}
                <button
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => removeValue(value)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          {selectedValues.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-6 px-2 text-xs text-gray-400 hover:text-gray-300"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
