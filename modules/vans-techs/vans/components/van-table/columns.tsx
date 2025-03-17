"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/common/table/sortable-header";
import VanActions from "./van-actions";
import { TireVanDTO } from "@/types/tire-vans";

export const columns: ColumnDef<TireVanDTO, string>[] = [
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Vehicle ID</SortableHeader>
    ),
    accessorKey: "vehicleId",
    meta: {
      label: "Vehicle ID",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Year & Make</SortableHeader>
    ),
    accessorKey: "year-make",
    accessorFn: (row) => `${row.year} ${row.make}`,
    meta: {
      label: "Year & Make",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Model / TRIM</SortableHeader>
    ),
    accessorKey: "model-trim",
    accessorFn: (row) => `${row.model} ${row.trim}`,
    meta: {
      label: "Model / TRIM",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Tire Capacity</SortableHeader>
    ),
    accessorKey: "capacity",
    meta: {
      label: "TireCapacity",
    },
  },
  {
    id: "actions",
    meta: {
      label: "Actions",
    },
    cell: ({ row }) => {
      return <VanActions van={row.original} />;
    },
  },
];
