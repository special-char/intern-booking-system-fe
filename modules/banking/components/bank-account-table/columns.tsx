"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/common/table/sortable-header";
import { GetColumnsInterface } from "@/types/table";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";

export function getColumns({ isLoading }: GetColumnsInterface): ColumnDef<any, string>[] {
  return [
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} title="Account Holder Name" />
        </LoadingHeader>
      ),
      accessorKey: "accountHolderName",
      meta: { label: "Account Holder Name" },
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>{row.original.accountHolderName}</LoadingCell>
      ),
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} title="Bank Name" />
        </LoadingHeader>
      ),
      accessorKey: "bankName",
      meta: { label: "Bank Name" },
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>{row.original.bankName}</LoadingCell>
      ),
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} title="Account Number" />
        </LoadingHeader>
      ),
      accessorKey: "accountNumber",
      meta: { label: "Account Number" },
      cell: ({ row }) => {
        const value = row.original.accountNumber || "";
        const masked = value.length > 4 ? value.replace(/.(?=.{4})/g, "*") : value;
        return <LoadingCell isLoading={isLoading}>{masked}</LoadingCell>;
      },
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} title="IFSC Code" />
        </LoadingHeader>
      ),
      accessorKey: "ifscCode",
      meta: { label: "IFSC Code" },
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>{row.original.ifscCode}</LoadingCell>
      ),
    },
    {
      header: ({ column }) => (
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column} title="Venue" />
        </LoadingHeader>
      ),
      accessorKey: "venue",
      meta: { label: "Venue" },
      cell: ({ row }) => (
        <LoadingCell isLoading={isLoading}>{row.original.venue}</LoadingCell>
      ),
    },
    {
      id: "actions",
      meta: { label: "Actions" },
      cell: ({ row }) => {
        // return <BankAccountActions account={row.original} disabled={isLoading} />;
        return <span className="text-xs text-muted-foreground">Actions</span>;
      },
    },
  ];
}
