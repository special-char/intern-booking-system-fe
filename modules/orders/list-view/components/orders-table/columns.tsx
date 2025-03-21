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

import { Order } from "@/types/order";
import { StatusBadge } from "@/components/common/table/status-badge";

export const columns: ColumnDef<Order, string>[] = [
  {
    accessorKey: "orderNumber",
    meta: {
      label: "Order",
    },
    header: ({ column }) => (
      <SortableHeader column={column}>Order</SortableHeader>
    ),
  },
  {
    accessorKey: "date",
    meta: {
      label: "Date",
    },
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    filterFn: dateRangeFilterFn,
  },
  {
    meta: {
      label: "Payment",
    },
    accessorKey: "payment",
    header: "Payment",
    filterFn: multiValueFilterFn as FilterFn<Order>,
    cell: ({ row }) => {
      const payment = row.getValue("payment") as string;
      return (
        <div className="font-medium bg-gray-50 border border-gray-200 rounded-full w-fit px-2.5 py-0.5 text-xs">
          {payment}
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    meta: {
      label: "Order Status",
    },
    header: "Order Status",
    filterFn: multiValueFilterFn as FilterFn<Order>,
    cell: ({ row }) => {
      const orderStatus = row.getValue("orderStatus") as string;
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
    },
  },
  {
    accessorKey: "totalAmount",
    meta: {
      label: "Total Amount",
    },
    header: ({ column }) => (
      <SortableHeader column={column} className="w-full">
        <div className="text-right">Total Amount</div>
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "qboStatus",
    meta: {
      label: "QBO Status",
    },
    header: "QBO Status",
    cell: ({ row }) => {
      const qboStatus = row.getValue("qboStatus") as string;
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
        <div
          className={`inline-block px-2.5 py-0.5 rounded-full font-medium text-xs ${statusClasses}`}
        >
          {qboStatus}
        </div>
      );
    },
    filterFn: multiValueFilterFn as FilterFn<Order>,
  },
  {
    accessorKey: "appointmentDate",
    meta: {
      label: "Appointment",
    },
    header: ({ column }) => (
      <SortableHeader column={column}>Appointment</SortableHeader>
    ),
  },
  {
    accessorKey: "technician",
    meta: {
      label: "Technician",
    },
    header: "Technician",
    cell: ({ row }) => {
      const technician = row.getValue("technician") as string;
      return (
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {technician
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      );
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
];
