"use client";

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

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { ContentTable } from "@/components/common/table/content-table";

import { Card } from "@/components/shadcn/card";
import { DateFilter } from "./date-filter";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { SortButton } from "./sort-button";
import { ColumnVisibilityButton } from "@/components/common/table/column-visibility-button";

import { PaginationTable } from "@/components/common/table/pagination-table";
import { ClearTableFiltersButton } from "@/components/common/table/clear-table-filters-button";
import { filters } from "./filter-options";
import { Pagination } from "@/types/common";

interface OrdersTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: Pagination;
}

export function OrdersTable<TData, TValue>({
  columns,
  data,
  pagination,
}: OrdersTableProps<TData, TValue>) {
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
    manualPagination: true,
    pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
    initialState: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
  });

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center justify-between p-4">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-white  data-[state=active]:[&>span]:bg-gray-50 data-[state=active]:[&>span]:rounded-full data-[state=active]:[&>span]:py-0.5 data-[state=active]:[&>span]:px-2 h-8"
                value="all"
              >
                All <span className="ml-1 text-[12px]">(100)</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-white  data-[state=active]:[&>span]:bg-gray-50 data-[state=active]:[&>span]:rounded-full data-[state=active]:[&>span]:py-0.5 data-[state=active]:[&>span]:px-[10px] h-8"
                value="on-hold"
              >
                On Hold <span className="ml-1 text-[12px]">(10)</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-white  data-[state=active]:[&>span]:bg-gray-50 data-[state=active]:[&>span]:rounded-full data-[state=active]:[&>span]:py-0.5 data-[state=active]:[&>span]:px-[10px] h-8"
                value="completed"
              >
                Completed <span className="ml-1 text-[12px]">(10)</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-white  data-[state=active]:[&>span]:bg-gray-50 data-[state=active]:[&>span]:rounded-full data-[state=active]:[&>span]:py-0.5 data-[state=active]:[&>span]:px-[10px] h-8"
                value="cancelled"
              >
                Cancelled <span className="ml-1 text-[12px]">(10)</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <ClearTableFiltersButton table={table} />
            <DateFilter table={table} />
            <FilterOptionsButton table={table} filters={filters} />
            <SortButton table={table} />
            <ColumnVisibilityButton table={table} />
          </div>
        </div>
        <ContentTable table={table} columns={columns} />
      </Card>
      <PaginationTable table={table} pagination={pagination} />
    </div>
  );
}
