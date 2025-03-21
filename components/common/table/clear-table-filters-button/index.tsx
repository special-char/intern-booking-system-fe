"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/shadcn/button";
import { X } from "lucide-react";

interface ClearTableFiltersButtonProps<TData> {
  disabled?: boolean
  table: Table<TData>;
}

export function ClearTableFiltersButton<TData>({
  disabled,
  table,
}: ClearTableFiltersButtonProps<TData>) {
  const hasFilters = table.getState().columnFilters.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <Button
      disabled={disabled}
      variant="ghost"
      className="[&_svg]:size-3.5 gap-1"
      size="sm"
      onClick={() => {
        table.setColumnFilters([]);
      }}
    >
      <X />
      Clear Filters
    </Button>
  );
}
