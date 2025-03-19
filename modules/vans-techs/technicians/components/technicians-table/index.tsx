"use client";

import { PaginationTable } from "@/components/common/table/pagination-table";

import { Card } from "@/components/shadcn/card";

import { ColumnVisibilityButton } from "@/components/common/table/column-visibility-button";
import { ContentTable } from "@/components/common/table/content-table";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { ClearTableFiltersButton } from "@/components/common/table/clear-table-filters-button";

import {
  ColumnDef,
} from "@tanstack/react-table";

import { Technician } from "./columns";
import { filters } from "./filter-options";
import { Pagination } from "@/types/common";
import { useTable } from "@/hooks/use-table";

export function TechniciansTable({
  columns,
  data,
  pagination,
}: {
  columns: ColumnDef<Technician, string>[];
  data: Technician[];
  pagination: Pagination;
}) {
  const { table } = useTable({ data, columns })

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
