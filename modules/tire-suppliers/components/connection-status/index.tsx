"use client"

import { Card, CardHeader, CardContent } from "@/components/shadcn/card";
import { TireSupplier } from "@/types/tire-supplier";
import { getColumns } from "./columns";
import { ContentTable } from "@/components/common/table/content-table";
import { useTable } from "@/hooks/use-table";
import { Tooltip } from "@/components/common/tooltip";
import { useMemo } from "react";

interface TireSupplierConnectionStatusProps {
  functionalities: TireSupplier['functionalities']
  isLoading: boolean
}

export default function TireSupplierConnectionStatus({ isLoading, functionalities }: TireSupplierConnectionStatusProps) {
  const columns = useMemo(() => getColumns({ isLoading }), []);

  const { table } = useTable({ data: functionalities, columns })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-sm font-medium text-text-primary">
            Connection Status
          </h2>
          <Tooltip>
            <p>lorem ipsum</p>
          </Tooltip>
        </div>
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