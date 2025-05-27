"use client";
import { getColumns } from "./columns";
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
import { Order } from "@/types/orders/order";
import { useMemo } from "react";
import { Skeleton } from "@/components/shadcn/skeleton";
import {
  StatusTabs,
  TabItem,
} from "@/modules/orders/common/components/status-tabs";

export interface OrdersTableProps extends TableProps {
  data: Order[];
}

export function OrdersTable({
  data,
  pagination,
  isLoading = false
}: OrdersTableProps) {
  const columns = useMemo(() => getColumns({ isLoading }), []);

  const { table } = useTable({
    data,
    columns,
    config: {
      manualPagination: true,
      pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
      initialState: {
        pagination: {
          pageIndex: pagination.pageIndex - 1,
          pageSize: pagination.pageSize,
        },
      },
    },
  });

  const tabsData: TabItem[] = [
    { value: "all", label: "All", count: 100 },
    { value: "on-hold", label: "On Hold", count: 10 },
    { value: "completed", label: "Completed", count: 10 },
    { value: "cancelled", label: "Cancelled", count: 10 },
  ];

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center justify-between p-4 max-w-full overflow-x-scroll overflow-y-hidden">
          {isLoading ? (
            <Skeleton variant="default" />
          ) : (
            <StatusTabs defaultValue="all" tabs={tabsData} />
          )}
          <div className="flex items-center gap-2">
            <ClearTableFiltersButton table={table} disabled={isLoading} />
            <DateFilter
              table={table}
              disabled={isLoading}
            />
            <FilterOptionsButton
              table={table}
              filters={filters}
              disabled={isLoading}
            />
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
