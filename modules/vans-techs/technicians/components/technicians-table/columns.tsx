"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/common/table/sortable-header";
import { TechniciansActions } from "./technicians-actions";
import { GetColumnsInterface } from "@/types/table";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";
import { Technician } from ".";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

export function getColumns({
  isLoading,
}: GetColumnsInterface): ColumnDef<Technician, string>[] {
  return [
    {
      accessorKey: "profilePhoto",
      header: "Photo",
      cell: ({ row }) => {
        const photo = row.original.profilePhoto;
        return (
          <Avatar>
            <AvatarImage src={photo?.url} alt={photo?.alt || ""} />
            <AvatarFallback>
              {row?.original?.name?.charAt(0)?.toUpperCase() || ""}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
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
          <LoadingCell isLoading={isLoading}>{row.original.name}</LoadingCell>
        );
      },
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
          <LoadingCell isLoading={isLoading}>{row.original.email}</LoadingCell>
        );
      },
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
      },
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
      },
    },
    {
      accessorKey: "mobileTireVan",
      header: "Assigned Van",
      cell: ({ row }) => {
        const vans = row.original.mobileTireVan || [];
        const van = vans[0];
        return van ? `${van.vehicleId}` : "No van assigned";
      },
    },
    {
      id: "actions",
      meta: {
        label: "Actions",
      },
      cell: ({ row }) => {
        return (
          <TechniciansActions
            initialValues={
              {
                id: `${row.original.id}`,
                email: row.original.email,
                mobilePhone: `${row.original.mobilePhone}`,
                ...(row.original.twilioPhone && {
                  twilioPhone: `${row.original.twilioPhone}`,
                }),
                mobileTireVan:
                  row.original.mobileTireVan?.map((van) => van.id) || [],
                assignMobileTireVan:
                  row.original.mobileTireVan?.[0]?.id?.toString() || "",
                password: row.original.password,
                fullName: row.original.name,
                profilePhoto: row.original.profilePhoto,
              } as any
            }
            disabled={isLoading}
          />
        );
      },
    },
  ];
}
