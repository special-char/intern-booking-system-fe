"use client";

import { PaginationTable } from "@/components/common/table/pagination-table";

import { Card } from "@/components/shadcn/card";

import { ColumnVisibilityButton } from "@/components/common/table/column-visibility-button";
import { ContentTable } from "@/components/common/table/content-table";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { ClearTableFiltersButton } from "@/components/common/table/clear-table-filters-button";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Technician } from "./columns";
import { useState } from "react";
import { filters } from "./filter-options";
import { Pagination } from "@/types/common";

export function TechniciansTable({
  columns,
  data,
  pagination,
}: {
  columns: ColumnDef<Technician, string>[];
  data: Technician[];
  pagination: Pagination;
}) {
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
  });

  return (
    <div className="space-y-5 mt-6">
      <Card>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center justify-end gap-2 w-full">
            <ClearTableFiltersButton table={table} />

            <FilterOptionsButton<Technician>
              label="Filter"
              table={table}
              filters={filters}
            />
            <ColumnVisibilityButton label="Show/Hide Columns" table={table} />
          </div>
        </div>
        <ContentTable table={table} columns={columns} />
      </Card>
      <PaginationTable table={table} pagination={pagination} />
    </div>
  );
}
