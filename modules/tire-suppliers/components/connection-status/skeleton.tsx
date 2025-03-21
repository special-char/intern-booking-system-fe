"use client"

import { Card, CardHeader, CardContent } from "@/components/shadcn/card";
import { getColumns } from "./columns";
import { Skeleton } from "@/components/shadcn/skeleton";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { useTable } from "@/hooks/use-table";
import { TireSupplier } from "@/types/tire-supplier";
import { ContentTable } from "@/components/common/table/content-table";

export function TireSupplierConnectionStatusSkeleton() {
  const columns = getColumns({ isLoading: true });
  const { data } = getTableLoadingData(3)

  const { table } = useTable({ data: (data as TireSupplier['functionalities']), columns })

  return (
    <Card>
      <CardHeader>
        <Skeleton variant="default" className="h-4 w-1/6" />
      </CardHeader>
      <CardContent>
        <div className="mt-5">
          <ContentTable
            columns={columns}
            table={table}
          />
        </div>
      </CardContent>
    </Card>
  );
}