"use client"

import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/common/table/sortable-header";
import { TireSupplier, TireSupplierFunctionality } from "@/types/tire-supplier";
import { Skeleton } from "@/components/shadcn/skeleton";
import { GetColumnsInterface } from "@/types/table";
import { StatusBadge, StatusBadgeProps } from "@/components/common/table/status-badge";
import { cn } from "@/lib/utils";

export const LOADING_SUPPLIERS: TireSupplier['functionalities'] = Array.from({ length: 3 }, (_, i) => ({
  id: i.toString(),
})) as TireSupplier['functionalities'];


export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<TireSupplierFunctionality, string>[] {
  return [
    {
      header: ({ column }) => isLoading ? "" : <SortableHeader column={column}>Functionality</SortableHeader>,
      accessorKey: "name",
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton variant="default" />
        }
        return row.original.name
      }
    },
    {
      header: ({ column }) => isLoading ? "" : <SortableHeader column={column}>Last checked</SortableHeader>,
      accessorKey: "lastChecked",
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton variant="default" />
        }
        return new Date(row.original.lastChecked).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true, // zapewnia AM/PM
        })
      }
    },
    {
      header: ({ column }) => isLoading ? "" : <SortableHeader column={column}>Status</SortableHeader>,
      accessorKey: "status",
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton variant="default" className={cn(row.index < 2 ? "bg-green-100" : "bg-red-100")} />
        }
        return (
          <StatusBadge
            level={{
              connected: "success",
              disconnected: "error",
            }[row.original.status] as keyof StatusBadgeProps['level']}
            label={row.original.status}
          />
        )
      }
    },
  ]
} 
