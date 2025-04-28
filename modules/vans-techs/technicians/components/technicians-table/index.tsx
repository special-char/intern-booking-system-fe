"use client";

import { PaginationTable } from "@/components/common/table/pagination-table";

import { Card } from "@/components/shadcn/card";

import { ColumnVisibilityButton } from "@/components/common/table/column-visibility-button";
import { ContentTable } from "@/components/common/table/content-table";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { ClearTableFiltersButton } from "@/components/common/table/clear-table-filters-button";

import { getColumns } from "./columns";
import { filters } from "./filter-options";
import { useTable } from "@/hooks/use-table";
import { TableProps } from "@/types/table";
import { useMemo } from "react";

export interface Technician {
  id: number;
  name: string;
  email: string;
  mobilePhone: number;
  twilioPhone: number;
  password: string;
  profilePhoto: {
    url: string;
    alt: string;
  } | null;
  mobileTireVan: Array<{
    id: number;
    vehicleId: string;
    yearMake: string;
    modelTrim: string;
  }>;
  updatedAt: string;
  createdAt: string;
}

export interface TechniciansTable extends TableProps {
  data: Technician[];
}

export function TechniciansTable({
  data,
  isLoading = false,
  pagination,
}: TechniciansTable) {
  const columns = useMemo(() => getColumns({ isLoading }), []);

  const { table } = useTable({ data, columns });

  return (
    <div className="space-y-5 mt-6">
      <Card>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center justify-end gap-2 w-full">
            <ClearTableFiltersButton table={table} disabled={isLoading} />

            <FilterOptionsButton<Technician>
              disabled={isLoading}
              label="Filter"
              table={table}
              filters={filters}
            />
            <ColumnVisibilityButton
              label="Show/Hide Columns"
              table={table}
              disabled={isLoading}
            />
          </div>
        </div>
        <ContentTable table={table} columns={columns} />
      </Card>
      <PaginationTable table={table} pagination={pagination} />
    </div>
  );
}
