"use client"

import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/common/table/sortable-header";
import { TireSupplier, TireSupplierFunctionality } from "@/types/tire-supplier";
import { GetColumnsInterface } from "@/types/table";
import { StatusBadge, StatusBadgeProps } from "@/components/common/table/status-badge";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";

export const LOADING_SUPPLIERS: TireSupplier['functionalities'] = Array.from({ length: 3 }, (_, i) => ({
  id: i.toString(),
})) as TireSupplier['functionalities'];


export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<TireSupplierFunctionality, string>[] {
  return [
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Functionality</SortableHeader>
        </LoadingHeader>,
      accessorKey: "name",
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.name}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Last checked</SortableHeader>
        </LoadingHeader>
      ,
      accessorKey: "lastChecked",
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {new Date(row.original.lastChecked).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </LoadingCell>
        )
      }
    },
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Status</SortableHeader>
        </LoadingHeader>,
      accessorKey: "status",
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            <StatusBadge
              level={{
                connected: "success",
                disconnected: "error",
              }[row.original.status] as keyof StatusBadgeProps['level']}
              label={row.original.status}
            />
          </LoadingCell>
        )
      }
    },
  ]
} 
