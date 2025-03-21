"use client"

import { Card } from "@/components/shadcn/card";
import { TireBrand } from "@/types/tire-brand";
import { useState } from "react";
import { ContentTable } from "@/components/common/table/content-table";
import { PaginationTable } from "@/components/common/table/pagination-table";
import { FilterOptionsButton } from "@/components/common/table/filter-options-button";
import { TableProps } from "@/types/table";
import { useTable } from "@/hooks/use-table";
import { getColumns } from "./columns";
import { TireSupplier } from "@/types/tire-supplier";

export interface TireBrandTableProps extends TableProps {
  data: TireBrand[];
  suppliers?: TireSupplier[]
}

//TODO: pass columns as props when api is ready; get rid of mocks, tableData state, and handlers (since they will be handled as server actions)
//TODO: handle filters
export function TireBrandTable({ data, isLoading = false, suppliers, pagination }: TireBrandTableProps) {
  const [tableData, setTableData] = useState<TireBrand[]>(data);

  //temp solution thus not memoized, no render issues tho
  const columns = getColumns({
    isLoading,
    onStatusChange: handleStatusChange,
    onPreferredSupplierChange: handlePreferredSupplierChange,
    onSuppliersChange: handleSupplierChange,
    suppliers
  })

  const { table } = useTable({ data: tableData, columns })

  function handleStatusChange(id: string, status: boolean): void {
    setTableData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status }
      }
      return item
    }));
  }

  function handlePreferredSupplierChange(id: string, supplierId: string | null): void {
    setTableData(prev => prev.map(item => {
      if (item.id === id) {
        if (!supplierId) {
          return { ...item, preferredSuplierId: null }
        }
        const preferredSuplierId: string | null = suppliers?.find(({ id }) => id === supplierId)?.id || null;
        return { ...item, preferredSuplierId }
      }
      return item
    }));
  }

  function handleSupplierChange(id: string, suppliers: TireSupplier[]): void {
    setTableData(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, suppliers }
      }
      return item
    }
    ));
  }

  return (
    <div className="space-y-5 mt-6">
      <Card>
        <div className="flex items-center justify-end px-4 py-2">
          <FilterOptionsButton<TireBrand>
            disabled={isLoading}
            label="Filter"
            table={table}
            filters={[]}
          />
        </div>
        <ContentTable columns={columns} table={table} isHeaderGrouping rowCn="hover:bg-brand-primary-100 cursor-pointer" />
      </Card>
      <PaginationTable table={table} pagination={pagination} />
    </div>
  );
}
