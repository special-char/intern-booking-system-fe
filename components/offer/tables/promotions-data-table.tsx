"use client"

import { DataTableWithActions } from "./data-table-with-actions"
import { Badge } from "@/components/ui/badge"

interface Promotion {
  id: string
  code: string
  method: string
  status: string
  type?: string
  value?: string
}

interface PromotionsDataTableProps {
  promotions: Promotion[]
  onEdit: (promotion: Promotion) => void
  onDelete: (promotion: Promotion) => void
  onCreateNew: () => void
}

export function PromotionsDataTable({ promotions, onEdit, onDelete, onCreateNew }: PromotionsDataTableProps) {
  const columns = [
    {
      key: "code",
      label: "Code",
    },
    {
      key: "method",
      label: "Method",
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => {
        let badgeClass = ""

        switch (value.toLowerCase()) {
          case "active":
            badgeClass = "bg-status-success-bg text-status-success-text border-status-success-border"
            break
          case "draft":
            badgeClass = "bg-status-info-bg text-status-info-text border-status-info-border"
            break
          case "expired":
            badgeClass = "bg-status-error-bg text-status-error-text border-status-error-border"
            break
          default:
            badgeClass = "bg-gray-100 text-gray-700 border-gray-200"
        }

        return <Badge className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>{value}</Badge>
      },
    },
  ]

  return (
    <DataTableWithActions
      title="Promotions"
      columns={columns}
      data={promotions}
      onEdit={onEdit}
      onDelete={onDelete}
      onCreateNew={onCreateNew}
      searchPlaceholder="Search promotions"
    />
  )
}
