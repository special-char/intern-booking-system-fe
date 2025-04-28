"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/common/table/sortable-header";
import VanActions from "./van-actions";
import { TireVanDTO } from "@/types/tire-vans";
import { GetColumnsInterface } from "@/types/table";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";

export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<TireVanDTO, string>[] {
  return [
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Vehicle ID</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "vehicleId",
      meta: {
        label: "Vehicle ID",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.vehicleId}
          </LoadingCell>
        )
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Year & Make</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "yearAndMake",
      // accessorFn: (row) => `${row.year} ${row.make}`,
      meta: {
        label: "Year & Make",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.yearAndMake}
          </LoadingCell>
        )
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Model / TRIM</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "modelTrim",
      // accessorFn: (row) => `${row.model} ${row.trim}`,
      meta: {
        label: "Model / TRIM",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.modelTrim}
          </LoadingCell>
        )
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Tire Capacity</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "tireCapacity",
      meta: {
        label: "TireCapacity",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.tireCapacity}
          </LoadingCell>
        )
      }
    },
    {
      id: "actions",
      meta: {
        label: "Actions",
      },
      cell: ({ row }) => {
        return <VanActions van={row.original} disabled={isLoading} />;
      },
    },
  ]
}
