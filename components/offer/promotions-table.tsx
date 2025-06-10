"use client"

import { DataTable } from "./ui/data-table"
import { Badge } from "@/components/ui/badge"

interface Promotion {
  id: string
  code: string
  method: string
  status: string
  type?: string
  value?: string
}

interface PromotionsTableProps {
  promotions: Promotion[]
  onEdit: (promotion: Promotion) => void
  onDelete: (promotion: Promotion) => void
}

export function PromotionsTable({ promotions, onEdit, onDelete }: PromotionsTableProps) {
  const columns = [
    {
      key: "code",
      label: "Code",
      filterable: true,
    },
    {
      key: "method",
      label: "Method",
      filterable: true,
    },
    {
      key: "status",
      label: "Status",
      filterable: true,
      render: (value: string) => (
        <Badge
          variant={value === "active" ? "default" : "secondary"}
          className={value === "active" ? "bg-green-600" : "bg-gray-600"}
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "type",
      label: "Type",
      filterable: true,
    },
  ]

  return (
    <DataTable columns={columns} data={promotions} onEdit={onEdit} onDelete={onDelete} searchPlaceholder="Search" />
  )
}
