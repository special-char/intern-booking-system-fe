"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, ArrowLeft } from "lucide-react"
import { PromotionSidebarForm } from "../forms/promotion-sidebar-form"

interface PromotionDetailViewPageProps {
  promotion: {
    id: string
    code: string
    type: string
    value: string
    allocation: string
    status: string
    conditions: any[]
    itemConditions: any[]
    campaign?: string
    promotionType?: string
  }
  onBack?: () => void
  onSave?: (data: any) => void
  onDuplicate?: (promotion: any) => void
  onDelete?: (promotion: any) => void
}

export function PromotionDetailViewPage({
  promotion,
  onBack,
  onSave,
  onDuplicate,
  onDelete,
}: PromotionDetailViewPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-status-success-bg text-status-success-text border-status-success-border"
      case "draft":
        return "bg-status-info-bg text-status-info-text border-status-info-border"
      case "expired":
        return "bg-status-error-bg text-status-error-text border-status-error-border"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the promotion data
      const updatedPromotion = {
        code: data.code,
        name: data.name,
        description: data.description,
        status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        type: data.type === "percentage" ? "Percentage Off" : "Fixed Amount",
        value: data.type === "percentage" ? `${data.discountValue}%` : `$${data.discountValue} USD`,
      }

      onSave?.(updatedPromotion)
    } catch (error) {
      console.error("Error updating promotion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const initialFormData = {
    name: promotion.code,
    code: promotion.code,
    description: `Promotion for ${promotion.type}`,
    type: promotion.type?.toLowerCase().includes("percentage") ? "percentage" : "fixed_amount",
    discountType: "order",
    discountValue: promotion.value?.replace(/[^0-9.]/g, "") || "10",
    minimumAmount: "50",
    maximumDiscount: "100",
    status: promotion.status?.toLowerCase() || "draft",
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white shadow-sm gap-4">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-500">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">{promotion.code}</h1>
            <p className="text-sm text-gray-500 mt-1">Promotion Details</p>
          </div>
          <Badge className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(promotion.status)}`}>
            {promotion.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Read-only promotion details */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            {/* Basic Info */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Campaign</h3>
                    <p className="text-gray-900">Promotion code</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Code</h3>
                    <p className="text-gray-900">{promotion.code}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                    <p className="text-gray-900">{promotion.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Value</h3>
                    <p className="text-gray-900">{promotion.value}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Allocation</h3>
                    <p className="text-gray-900">{promotion.allocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Who can use this code */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                <CardTitle className="text-lg font-semibold text-gray-900">Eligibility Rules</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Currency Code</span>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      Equals
                    </Badge>
                    <span className="text-sm text-gray-900">US Dollar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What items will the promotion be applied to */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                <CardTitle className="text-lg font-semibold text-gray-900">Product Conditions</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Product</span>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      Equals
                    </Badge>
                    <span className="text-sm text-gray-900">Medusa Shorts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg font-semibold text-gray-900">Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-500">Total Uses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">$0</div>
                    <div className="text-xs text-gray-500">Total Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-500">Unique Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">0%</div>
                    <div className="text-xs text-gray-500">Conversion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Form Sidebar - Always visible */}
          <div className="xl:col-span-1">
            <PromotionSidebarForm
              onSubmit={handleFormSubmit}
              initialData={initialFormData}
              isLoading={isLoading}
              promotionType={promotion.promotionType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
