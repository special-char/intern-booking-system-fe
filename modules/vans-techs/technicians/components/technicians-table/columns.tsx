"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/common/table/sortable-header";
import { TechniciansActions } from "./technicians-actions";
import { GetColumnsInterface } from "@/types/table";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";

export type Technician = {
  id: string;
  name: string;
  email: string;
  mobilePhone: string;
  twilioPhone: string;
  calendarId: string;
  mobileTireVan: string;
};

export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<Technician, string>[] {
  return [
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Name</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "name",
      meta: {
        label: "Name",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.name}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Email</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "email",
      meta: {
        label: "Email",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.email}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Mobile Phone</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "mobilePhone",
      meta: {
        label: "Mobile Phone",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.mobilePhone}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Twilio Phone</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "twilioPhone",
      meta: {
        label: "Twilio Phone",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.twilioPhone}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Calendar ID</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "calendarId",
      meta: {
        label: "Calendar ID",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.calendarId}
          </LoadingCell>
        );
      }
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Mobile Tire Van</SortableHeader>
        </LoadingHeader>
      ),
      accessorKey: "mobileTireVan",
      meta: {
        label: "Mobile Tire Van",
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            {row.original.mobileTireVan}
          </LoadingCell>
        );
      }
    },
    {
      id: "actions",
      meta: {
        label: "Actions",
      },
      cell: ({ row }) => {
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

        return <TechniciansActions initialValues={initialValues} disabled={isLoading} />;
      },
    },
  ]
}