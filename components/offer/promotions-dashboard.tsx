"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "./ui/empty-state"
import { PromotionTypeModal } from "./promotion-type-modal"
import { PromotionDetailsModal } from "./promotion-details-modal"
import { CampaignModal } from "./campaign-modal"
import { PromotionsTable } from "./promotions-table"
import { PromotionDetailView } from "./promotion-detail-view"

export function PromotionsDashboard() {
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [promotionData, setPromotionData] = useState<any>({})
  const [currentView, setCurrentView] = useState<"list" | "detail">("list")
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [promotions] = useState([
    {
      id: "1",
      code: "22323",
      method: "Promotion code",
      status: "Draft",
      type: "Standard",
      value: "$32.00 USD",
      allocation: "Each",
      conditions: [],
      itemConditions: [],
    },
    {
      id: "2",
      code: "new_offer",
      method: "Offer URL",
      status: "Active",
      type: "URL",
      value: "new_url",
      allocation: "Each",
      conditions: [],
      itemConditions: [],
    }
  ])

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
    console.log("Final promotion data:", finalData)
    setShowCampaignModal(false)
    // Here you would typically save to your backend
  }

  const handleEdit = (promotion: any) => {
    setSelectedPromotion(promotion)
    setCurrentView("detail")
  }

  const handleDelete = (promotion: any) => {
    console.log("Delete promotion:", promotion)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Promotions</h1>
        <div className="flex gap-2">
          <Button onClick={() => window.location.href = '/new_url'}>New Offer URL</Button>
          <Button onClick={() => setShowTypeModal(true)}>Create</Button>
        </div>
      </div>

      <div className="p-6">
        {currentView === "list" ? (
          promotions.length > 0 ? (
            <PromotionsTable promotions={promotions} onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <EmptyState title="No records" description="There are no records to show" />
          )
        ) : (
          selectedPromotion && <PromotionDetailView promotion={selectedPromotion} />
        )}
      </div>

      <PromotionTypeModal
        open={showTypeModal}
        onClose={() => setShowTypeModal(false)}
        onContinue={handleTypeSelection}
      />

      <PromotionDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onContinue={handleDetailsSubmit}
        promotionType={selectedType}
      />

      <CampaignModal
        open={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onSave={handleCampaignSubmit}
      />
    </div>
  )
}
