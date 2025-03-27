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

export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<Order, string>[] {
  return [
    {
      accessorKey: "orderNumber",
      meta: {
        label: "Order",
      },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Order</SortableHeader>
        </LoadingHeader>
      ),
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.orderNumber}
          </LoadingCell>
        )
      }
    },
    {
      accessorKey: "date",
      meta: {
        label: "Date",
      },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Date</SortableHeader>
        </LoadingHeader>
      ),
      filterFn: dateRangeFilterFn,
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.date}
          </LoadingCell>
        )
      }
    },
    {
      meta: {
        label: "Payment",
      },
      accessorKey: "payment",
      header: () => <LoadingHeader isLoading={isLoading}>Payment</LoadingHeader>,
      filterFn: multiValueFilterFn as FilterFn<Order>,
      cell: ({ row }) => {
        const payment = row.getValue("payment") as string;
        return (
          <LoadingCell isLoading={isLoading}>
            <div className="font-medium bg-gray-50 border border-gray-200 rounded-full w-fit px-2.5 py-0.5 text-xs">
              {payment}
            </div>
          </LoadingCell>
        )
      },
    },
    {
      accessorKey: "orderStatus",
      meta: {
        label: "Order Status",
      },
      header: () => <LoadingHeader isLoading={isLoading}>Order Status</LoadingHeader>,
      filterFn: multiValueFilterFn as FilterFn<Order>,
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {renderOrderStatus(row.getValue("orderStatus") as string)}
          </LoadingCell>
        )
      },
    },
    {
      accessorKey: "totalAmount",
      meta: {
        label: "Total Amount",
      },
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} className="w-full">
            <div className="text-right">Total Amount</div>
          </SortableHeader>
        </LoadingHeader>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <LoadingCell isLoading={isLoading}>
            <div className="text-center font-medium">{formatted}</div>
          </LoadingCell>
        )
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
            {renderQBOStatus(row.getValue("qboStatus") as string)}
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
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.appointmentDate}
          </LoadingCell>
        )
      }
    },
    {
      accessorKey: "technician",
      meta: {
        label: "Technician",
      },
      header: () => <LoadingHeader isLoading={isLoading}>Technician</LoadingHeader>,
      cell: ({ row }) => {
        const technician = row.getValue("technician") as string;
        return (
          <LoadingCell isLoading={isLoading}>
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {technician
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </LoadingCell>
        )

      },
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