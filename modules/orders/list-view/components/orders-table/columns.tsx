"use client";

import { DropdownMenuItem } from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { SortableHeader } from "@/components/common/table/sortable-header";
import { dateRangeFilterFn } from "./date-filter";
import { multiValueFilterFn } from "@/components/common/table/filter-options-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

import { Order } from "@/types/orders/order";
import { StatusBadge } from "@/components/common/table/status-badge";
import { GetColumnsInterface } from "@/types/table";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";
import { ReactNode } from "react";
import { format } from "date-fns";
//TODO ::: fix type any
export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<Order | any, string>[] {
  return [
    {
      accessorKey: "display_id",
      meta: { label: "Order #" },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Order #</SortableHeader>
        </LoadingHeader>
      ),
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>
          {row?.original?.id || "-"}
        </LoadingCell>
      ),
    },
    {
      accessorKey: "created_at",
      meta: { label: "Date" },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Date</SortableHeader>
        </LoadingHeader>
      ),
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>
          {format(new Date(row.original.created_at), 'MMM yy, dd')}
        </LoadingCell>
      ),
    },
    {
      accessorKey: "status",
      meta: { label: "Status" },
      header: () => <LoadingHeader isLoading={isLoading}>Status</LoadingHeader>,
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>
          {renderOrderStatus(row.original.payment_status)}
        </LoadingCell>
      ),
    },
    {
      accessorKey: "customer.email",
      meta: { label: "Customer Email" },
      header: () => <LoadingHeader isLoading={isLoading}>Customer Email</LoadingHeader>,
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>
          {row.original.customer?.email || "-"}
        </LoadingCell>
      ),
    },
    {
      accessorKey: "technician.name",
      meta: { label: "Technician" },
      header: () => <LoadingHeader isLoading={isLoading}>Technician</LoadingHeader>,
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>
          {row.original.technician?.name || "-"}
        </LoadingCell>
      ),
    },
    {
      accessorKey: "summary.current_order_total",
      meta: { label: "Total" },
      header: () => <LoadingHeader isLoading={isLoading}>Total</LoadingHeader>,
      cell: ({ row }) => {
        const total = row.original?.items?.reduce((sum: number, item: any) =>
          sum + (item.unit_price * item.quantity), 0);
        return (
          <LoadingCell isLoading={isLoading}>
            ${total || 0}
          </LoadingCell>
        );
      },
    },
    {
      accessorKey: "qboStatus",
      meta: {
        label: "QBO Status",
      },
      header: () => <LoadingHeader isLoading={isLoading}>QBO Status</LoadingHeader>,
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {renderQBOStatus("-")}
          </LoadingCell>
        )
      },
      filterFn: multiValueFilterFn as FilterFn<Order>,
    },
    {
      accessorKey: "appointmentDate",
      meta: {
        label: "Appointment",
      },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Appointment</SortableHeader>
        </LoadingHeader>
      ),
      cell: ({ row }) => {
        const startTime = row.original.metadata?.startTime;
        return (
          <LoadingCell isLoading={isLoading}>
            {startTime
              ? format(new Date(startTime * 1000), 'h:mm a MMM dd, yy')
              : "-"}
          </LoadingCell>
        )
      }
    },
    {
      id: "actions",
      meta: {
        label: "Actions",
      },
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={isLoading}
                variant="ghost"
                className="p-0 h-fit flex items-center justify-center"
                size="sm"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ]
}

function renderOrderStatus(orderStatus: string): ReactNode {
  if (orderStatus === "Delivered") {
    return <StatusBadge level="success" label={orderStatus} />
  }
  if (orderStatus === "Shipped") {
    return <StatusBadge className="bg-lime-100 text-lime-700" label={orderStatus} />
  }
  if (orderStatus === "Pending") {
    return <StatusBadge level="warning" label={orderStatus} />
  }
  if (orderStatus === "Cancelled") {
    return <StatusBadge level="error" label={orderStatus} />
  }
  if (orderStatus === "authorized") {
    return <StatusBadge level="warning" label={orderStatus} />
  }
  if (orderStatus === "captured") {
    return <StatusBadge level="success" label={orderStatus} />
  }
  return <StatusBadge level="default" label={orderStatus} />
}

function renderQBOStatus(qboStatus: string): ReactNode {
  let statusClasses = "";
  switch (qboStatus) {
    case "Synced":
      statusClasses = "bg-green-100 text-green-700";
      break;
    case "Pending":
      statusClasses = "bg-yellow-100 text-yellow-700";
      break;
    case "Failed":
      statusClasses = "bg-red-100 text-red-700";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-700";
  }
  return (
    <div className={`inline-block px-2.5 py-0.5 rounded-full font-medium text-xs ${statusClasses}`}>
      {qboStatus}
    </div>
  );
}