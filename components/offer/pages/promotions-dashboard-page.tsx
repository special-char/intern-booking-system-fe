"use client"
import { useState } from "react"
import { EmptyStateCard } from "../display/empty-state-card"
import { PromotionTypeSelectionModal } from "../modals/promotion-type-selection-modal"
import { PromotionDetailsFormModal } from "../modals/promotion-details-form-modal"
import { CampaignSelectionModal } from "../modals/campaign-selection-modal"
import { PromotionsDataTable } from "../tables/promotions-data-table"
import { PromotionDetailViewPage } from "../views/promotion-detail-view-page"
import { Button } from "@/components/ui/button"

export function PromotionsDashboardPage() {
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [promotionData, setPromotionData] = useState<any>({})
  const [currentView, setCurrentView] = useState<"list" | "detail">("list")
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [promotions, setPromotions] = useState([
    {
      id: "1",
      code: "SUMMER2024",
      method: "Promotion code",
      status: "Active",
      type: "Percentage Off",
      value: "$32.00 USD",
      allocation: "Each",
      conditions: [],
      itemConditions: [],
      promotionType: "percentage_off_order",
    },
    {
      id: "2",
      code: "WELCOME10",
      method: "Automatic",
      status: "Draft",
      type: "Fixed Amount",
      value: "$10.00 USD",
      allocation: "Order",
      conditions: [],
      itemConditions: [],
      promotionType: "amount_off_order",
    },
  ])

  const getPromotionTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      amount_off_products: "Amount off products",
      amount_off_order: "Amount off order",
      percentage_off_product: "Percentage off product",
      percentage_off_order: "Percentage off order",
      buy_x_get_y: "Buy X Get Y",
    }
    return typeMap[type] || type
  }

  const getFormattedValue = (data: any) => {
    const value = data.promotionValue || "0"
    switch (data.promotionType) {
      case "percentage_off_product":
      case "percentage_off_order":
      case "buy_x_get_y":
        return `${value}%`
      case "amount_off_order":
      case "amount_off_products":
        return `$${value} USD`
      default:
        return `$${value} USD`
    }
  }

  const handleTypeSelection = (type: string) => {
    setSelectedType(type)
    setShowTypeModal(false)
    setShowDetailsModal(true)
  }

  const handleDetailsSubmit = (data: any) => {
    setPromotionData({ ...promotionData, ...data })
    setShowDetailsModal(false)
    setShowCampaignModal(true)
  }

  const handleCampaignSubmit = (data: any) => {
    const finalData = { ...promotionData, ...data }

    // Create new promotion object
    const newPromotion = {
      id: Date.now().toString(),
      code: finalData.code || "NEW_PROMO",
      method: finalData.method === "promotion_code" ? "Promotion code" : "Automatic",
      status: finalData.status === "active" ? "Active" : "Draft",
      type: getPromotionTypeLabel(finalData.promotionType),
      value: getFormattedValue(finalData),
      allocation: "Each",
      conditions: finalData.customerConditions || [],
      itemConditions: finalData.itemConditions || [],
      cartRequirements: finalData.cartRequirements || [],
      applyToConditions: finalData.applyToConditions || [],
      promotionType: finalData.promotionType,
    }

    // Add to promotions list
    setPromotions((prev) => [...prev, newPromotion])
    setShowCampaignModal(false)

    // Reset form data
    setPromotionData({})
    setSelectedType("")
  }

  const handleEdit = (promotion: any) => {
    setSelectedPromotion(promotion)
    setCurrentView("detail")
  }

  const handleDelete = (promotion: any) => {
    if (confirm(`Are you sure you want to delete promotion "${promotion.code}"?`)) {
      setPromotions((prev) => prev.filter((p) => p.id !== promotion.id))
    }
  }

  const handleCreateNew = () => {
    setShowTypeModal(true)
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedPromotion(null)
  }

  const handleSaveEdit = (updatedData: any) => {
    if (selectedPromotion) {
      setPromotions((prev) =>
        prev.map((p) => (p.id === selectedPromotion.id ? { ...p, ...updatedData, id: selectedPromotion.id } : p)),
      )
      // Update the selected promotion for the detail view
      setSelectedPromotion((prev) => ({ ...prev, ...updatedData }))
    }
  }

  const handleDuplicate = (promotion: any) => {
    const duplicatedPromotion = {
      ...promotion,
      id: Date.now().toString(),
      code: `${promotion.code}_COPY`,
      status: "Draft",
    }
    setPromotions((prev) => [...prev, duplicatedPromotion])
  }

  const handleDeleteFromDetail = (promotion: any) => {
    setPromotions((prev) => prev.filter((p) => p.id !== promotion.id))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {currentView === "list" ? (
          promotions.length > 0 ? (
            <PromotionsDataTable
              promotions={promotions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCreateNew={handleCreateNew}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">Promotions</h1>
                <Button onClick={handleCreateNew} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  Create
                </Button>
              </div>
              <EmptyStateCard title="No promotions found" description="Create your first promotion to get started">
                <Button onClick={handleCreateNew} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  Create Promotion
                </Button>
              </EmptyStateCard>
            </div>
          )
        ) : (
          selectedPromotion && (
            <PromotionDetailViewPage
              promotion={selectedPromotion}
              onBack={handleBackToList}
              onSave={handleSaveEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDeleteFromDetail}
            />
          )
        )}
      </div>

      <PromotionTypeSelectionModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onContinue={handleTypeSelection}
      />

      <PromotionDetailsFormModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onContinue={handleDetailsSubmit}
        promotionType={selectedType}
      />

      <CampaignSelectionModal
        open={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onSave={handleCampaignSubmit}
      />
    </div>
  )
}
