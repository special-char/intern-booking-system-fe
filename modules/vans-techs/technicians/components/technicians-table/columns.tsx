"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/common/table/sortable-header";
import { TechniciansActions } from "./technicians-actions";

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
    cell: ({ row }) => {
      console.log(row.original.name);
      // TODO: Fill with the correct values when backend is ready
      const initialValues = {
        id: row.original.id,
        fullName: row.original.name,
        email: "john.doe@example.com",
        password: "password",
        mobilePhone: "+1234567890",
        twilioPhone: "+1234567890",
        profilePhoto: "none",
        assignMobileTireVan: "van1",
      };

      return <TechniciansActions initialValues={initialValues} />;
    },
  },
];
