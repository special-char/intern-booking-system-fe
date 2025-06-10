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
          <SortableHeader column={column}>Account Holder Name</SortableHeader>
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
          <SortableHeader column={column}>Bank Name</SortableHeader>
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
          <SortableHeader column={column}>Account Number</SortableHeader>
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
          <SortableHeader column={column}>IFSC Code</SortableHeader>
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
          <SortableHeader column={column}>Venue</SortableHeader>
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
