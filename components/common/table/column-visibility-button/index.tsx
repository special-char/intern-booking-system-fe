"use client";

import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { Columns3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColumnVisibilityButtonProps<TData> {
  disabled?: boolean
  table: Table<TData>;
  label?: string;
}

export function ColumnVisibilityButton<TData>({
  disabled,
  table,
  label,
}: ColumnVisibilityButtonProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          variant="secondary"
          size="sm"
          className={cn("h-8 w-8", label && "w-fit")}
        >
          <Columns3 className="w-4 h-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table.getAllLeafColumns().map((column) => {
          const label = column.columnDef.meta?.label;

          if (!column.getCanHide?.()) {
            return null;
          }

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(checked) => {
                column.toggleVisibility(!!checked);
              }}
            >
              {label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
