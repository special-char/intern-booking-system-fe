import React from "react";
import { Button } from "@/components/shadcn/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  children: React.ReactNode;
  className?: string;
}

export function SortableHeader<TData, TValue>({
  column,
  children,
  className = "",
}: SortableHeaderProps<TData, TValue>) {
  const sort = column.getIsSorted();

  const handleSort = () => {
    if (!sort) {
      column.toggleSorting(true);
    } else if (sort === "desc") {
      column.toggleSorting(false);
    } else {
      column.clearSorting();
    }
  };

  return (
    <Button
      variant="ghost"
      className={`group flex items-center p-0 text-xs h-6 text-text-secondary uppercase ${className}`}
      onClick={handleSort}
    >
      {children}
      <span className="flex items-center">
        {!sort && (
          <ArrowDown className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        )}

        {sort === "desc" && (
          <>
            <ArrowDown className="h-4 w-4 block group-hover:hidden" />
            <ArrowUp className="h-4 w-4 hidden group-hover:block" />
          </>
        )}

        {sort === "asc" && <ArrowUp className="h-4 w-4" />}
      </span>
    </Button>
  );
}
