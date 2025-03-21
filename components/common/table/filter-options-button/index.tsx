"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { ListFilterIcon } from "lucide-react";
import { Table, ColumnFiltersState, FilterFn } from "@tanstack/react-table";
import { Checkbox } from "@/components/shadcn/checkbox";
import { cn } from "@/lib/utils";

export const multiValueFilterFn: FilterFn<unknown> = (
  row,
  columnId,
  filterValue
) => {
  if (!filterValue || filterValue.length === 0) {
    return true;
  }
  const rowValue = row.getValue(columnId);
  return filterValue.includes(rowValue);
};

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface ReusableFilterDropdownProps<TData> {
  disabled?: boolean
  table: Table<TData>;
  filters: FilterGroup[];
  label?: string;
}

export function FilterOptionsButton<TData>({
  disabled,
  table,
  filters,
  label,
}: ReusableFilterDropdownProps<TData>) {
  const columnFilters = table.getState().columnFilters as ColumnFiltersState;

  const getFilterValue = React.useCallback(
    (id: string): string[] => {
      const filter = columnFilters.find((f) => f.id === id);
      return (filter?.value as string[]) || [];
    },
    [columnFilters]
  );

  const setFilterValue = React.useCallback(
    (id: string, newValue: string[]) => {
      table.setColumnFilters((old) => {
        const existingFilter = old?.find((f) => f.id === id);
        if (!existingFilter) {
          return [...(old || []), { id, value: newValue }];
        }
        return old.map((f) => {
          if (f.id === id) {
            return { ...f, value: newValue };
          }
          return f;
        });
      });
    },
    [table]
  );

  const handleCheckboxChange = React.useCallback(
    (columnId: string, option: string) => {
      const oldValues = getFilterValue(columnId);
      let newValues: string[] = [];
      if (oldValues.includes(option)) {
        newValues = oldValues.filter((val) => val !== option);
      } else {
        newValues = [...oldValues, option];
      }
      setFilterValue(columnId, newValues);
    },
    [getFilterValue, setFilterValue]
  );

  const handleParentToggle = React.useCallback(
    (columnId: string, options: string[], checked: boolean) => {
      if (checked) {
        setFilterValue(columnId, options);
      } else {
        setFilterValue(columnId, []);
      }
    },
    [setFilterValue]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          variant="secondary"
          className={cn("h-8", label ? "w-fit" : "w-8")}
        >
          <ListFilterIcon className="w-4 h-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {filters.map((group) => {
          const groupOptions = group.options.map((o) => o.value);
          const isGroupChecked = getFilterValue(group.id).length > 0;
          return (
            <DropdownMenuSub key={group.id}>
              <DropdownMenuSubTrigger
                onClick={() =>
                  handleParentToggle(group.id, groupOptions, !isGroupChecked)
                }
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    size="sm"
                    checked={isGroupChecked}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={(checked) =>
                      handleParentToggle(
                        group.id,
                        groupOptions,
                        checked === true
                      )
                    }
                  />
                  <span>{group.label}</span>
                </div>
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                {group.options.map((option) => {
                  const currentValues = getFilterValue(group.id);
                  const checked = currentValues.includes(option.value);
                  return (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={checked}
                      onCheckedChange={() =>
                        handleCheckboxChange(group.id, option.value)
                      }
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
