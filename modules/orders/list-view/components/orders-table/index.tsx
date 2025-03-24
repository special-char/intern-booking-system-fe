"use client";
import { getColumns } from "./columns";
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
import { useTable } from "@/hooks/use-table";
import { TableProps } from "@/types/table";
import { Order } from "@/types/order";
import { useMemo } from "react";
import { Skeleton } from "@/components/shadcn/skeleton";

export interface OrdersTableProps extends TableProps {
  data: Order[]
}

export function OrdersTable({ data, pagination, isLoading = false }: OrdersTableProps) {
  const columns = useMemo(() => getColumns({ isLoading }), [])

  const { table } = useTable({
    data,
    columns,
    config: {
      manualPagination: true,
      pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
      initialState: {
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      },
    }
  })

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center justify-between p-4">
          {isLoading ? (
            <Skeleton variant="default" />
          ) : (
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
          )}
          <div className="flex items-center gap-2">
            <ClearTableFiltersButton table={table} disabled={isLoading} />
            <DateFilter table={table} disabled={isLoading} />
            <FilterOptionsButton table={table} filters={filters} disabled={isLoading} />
            <SortButton table={table} disabled={isLoading} />
            <ColumnVisibilityButton table={table} disabled={isLoading} />
          </div>
        </div>
        <ContentTable table={table} columns={columns} />
      </Card>
      <PaginationTable table={table} pagination={pagination} />
    </div>
  );
}
