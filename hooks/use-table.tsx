import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, Table, TableOptions, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

interface UseTableInterface<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  config?: Partial<TableOptions<TData>>
  data: TData[]
}

interface UseTableReturnInterface<TData> {
  table: Table<TData>
}

export function useTable<TData, TValue>({ data, config, columns }: UseTableInterface<TData, TValue>): UseTableReturnInterface<TData> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    ...config ?? {}
  });

  return { table }
}