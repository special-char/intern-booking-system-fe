"use client"

import { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/common/table/sortable-header";
import { TireBrand } from "@/types/tire-brand";
import { Switch } from "@/components/shadcn/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Skeleton } from "@/components/shadcn/skeleton";
import { GetColumnsInterface } from "@/types/table";
import Image from "next/image";
import { getTableLoadingData } from "@/utils/get-table-loading-data";
import { TireSupplier } from "@/types/tire-supplier";
import { LoadingHeader } from "@/components/common/table/loading-header";
import { LoadingCell } from "@/components/common/table/loading-cell";

interface GetTireBrandColumnsInterface extends GetColumnsInterface {
  onStatusChange: (id: string, status: boolean) => void
  onSuppliersChange: (id: string, suppliers: TireSupplier[]) => void
  onPreferredSupplierChange: (id: string, supplierId: string | null) => void
  suppliers?: TireSupplier[]
}

export const LOADING_SUPPLIERS: TireSupplier[] = getTableLoadingData(4).data as TireSupplier[];

export function getColumns({ isLoading, onStatusChange, onPreferredSupplierChange, onSuppliersChange, suppliers }: GetTireBrandColumnsInterface): ColumnDef<TireBrand, string>[] {
  return [
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Tire brand</SortableHeader>
        </LoadingHeader>,
      accessorKey: "name",
      meta: {
        center: {
          vertical: true,
        },
        border: true
      },
      cell: ({ row }) => {
        return (
          <LoadingCell isLoading={isLoading}>
            <Image src={row.original.logoUrl} width={100} height={10} alt={row.original.name} />
          </LoadingCell>
        )
      }
    },
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Status</SortableHeader>
        </LoadingHeader>,
      accessorKey: "status",
      meta: {
        center: {
          vertical: true,
        },
        border: true,
      },
      cell: ({ row }) => {
        const status: boolean = row.getValue("status") as boolean;
        const id: string = row.original.id;

        return (
          <LoadingCell isLoading={isLoading}>
            <Switch
              checked={status}
              size="large"
              onCheckedChange={(checked) => {
                onStatusChange(id, checked);
              }}
            />
          </LoadingCell>
        );
      },
    },
    {
      header: ({ column }) =>
        <LoadingHeader isLoading={isLoading}>
          <SortableHeader column={column}>Preferred suppliers</SortableHeader>
        </LoadingHeader>,
      accessorKey: "preferredSuplier",
      accessorFn: (row) => suppliers?.find(({ id }) => id === row.preferredSuplierId)?.name || "",
      meta: {
        center: {
          vertical: true
        },
        border: true
      },
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton variant="default" />
        }

        const id: string = row.original.id;
        const preferredSupplierId: string | null = row.original.preferredSuplierId;

        return (
          <LoadingCell isLoading={isLoading}>
            {!row.original.suppliers.length ? "—" : (
              <Select
                onValueChange={(value) => {
                  onPreferredSupplierChange(id, value);
                }}
                defaultValue={preferredSupplierId ?? undefined}
              >
                <SelectTrigger variant={preferredSupplierId ? "primary" : undefined}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {row.original.suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </LoadingCell>
        )

      },
    },
    {
      accessorKey: "suppliers",
      header: () => <LoadingHeader isLoading={isLoading}>Tire suppliers</LoadingHeader>,
      meta: {
        center: {
          horizontal: true
        }
      },
      columns: (isLoading ? LOADING_SUPPLIERS : suppliers ?? []).map(supplier => ({
        id: supplier.id,
        header: supplier.name,
        cell: ({ row }) => {
          const id: string = row.original.id;
          const suppliers: TireSupplier[] = row.original.suppliers;

          return (
            <div className="flex justify-center mr-4">
              <Checkbox
                disabled={isLoading}
                checked={isLoading ? false : suppliers.some(({ id }) => id === supplier.id)}
                onCheckedChange={(checked) => {
                  onSuppliersChange(
                    id,
                    checked ? [...suppliers, supplier] : suppliers.filter(s => s.id !== supplier.id)
                  )
                  if (!checked && row.original.preferredSuplierId === supplier.id) {
                    onPreferredSupplierChange(id, null)
                  }
                }}
              />
            </div>
          )
        },
        meta: {
          center: {
            horizontal: true
          },
          border: true
        }
      }))
    },
  ]
} 
