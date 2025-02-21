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

interface ColumnVisibilityButtonProps<TData> {
  table: Table<TData>;
}

export function ColumnVisibilityButton<TData>({
  table,
}: ColumnVisibilityButtonProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8 w-8">
          <Columns3 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table.getAllLeafColumns().map((column) => {
          // @ts-expect-error - meta is not typed
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
