"use client";

import { DropdownMenuItem } from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { SortableHeader } from "./sortable-header";
import { dateRangeFilterFn } from "./date-filter";
import { multiValueFilterFn } from "./filter-options-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
export type Order = {
  id: string;
  date: string;
  orderNumber: string;
  payment: "Paid" | "Not Paid";
  orderStatus: "Delivered" | "Pending" | "Cancelled" | "Shipped";
  totalAmount: number;
  qboStatus: "Synced" | "Pending" | "Failed";
  appointmentDate: string;
  technician: string;
};

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
    filterFn: multiValueFilterFn,
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
    filterFn: multiValueFilterFn,
    cell: ({ row }) => {
      const orderStatus = row.getValue("orderStatus") as string;
      let statusClasses = "";
      switch (orderStatus) {
        case "Delivered":
          statusClasses = "bg-green-100 text-green-700";
          break;
        case "Shipped":
          statusClasses = "bg-lime-100 text-lime-700";
          break;
        case "Pending":
          statusClasses = "bg-yellow-100 text-yellow-700";
          break;
        case "Cancelled":
          statusClasses = "bg-red-100 text-red-700";
          break;
        default:
          statusClasses = "bg-gray-100 text-gray-700";
      }

      return (
        <div
          className={`inline-block px-2.5 py-0.5 rounded-full font-medium text-xs ${statusClasses}`}
        >
          {orderStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    meta: {
      label: "Total Amount",
    },
    header: ({ column }) => (
      <SortableHeader column={column} className="justify-end w-full">
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
    filterFn: multiValueFilterFn,
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
