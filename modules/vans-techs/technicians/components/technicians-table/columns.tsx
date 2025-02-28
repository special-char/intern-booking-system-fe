"use client";

import { Button } from "@/components/shadcn/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { SortableHeader } from "@/components/common/table/sortable-header";

export type Technician = {
  id: string;
  name: string;
  email: string;
  mobilePhone: string;
  twilioPhone: string;
  calendarId: string;
  mobileTireVan: string;
};
export const columns: ColumnDef<Technician, string>[] = [
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
    accessorKey: "name",
    meta: {
      label: "Name",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
    accessorKey: "email",
    meta: {
      label: "Email",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Mobile Phone</SortableHeader>
    ),
    accessorKey: "mobilePhone",
    meta: {
      label: "Mobile Phone",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Twilio Phone</SortableHeader>
    ),
    accessorKey: "twilioPhone",
    meta: {
      label: "Twilio Phone",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Calendar ID</SortableHeader>
    ),
    accessorKey: "calendarId",
    meta: {
      label: "Calendar ID",
    },
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column}>Mobile Tire Van</SortableHeader>
    ),
    accessorKey: "mobileTireVan",
    meta: {
      label: "Mobile Tire Van",
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
