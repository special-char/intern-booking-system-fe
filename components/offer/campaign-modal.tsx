"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "./ui/radio-group"
import { SelectField } from "./ui/select-field"
import { StepIndicator } from "./ui/step-indicator"
import { NewCampaignForm } from "./new-campaign-form"
import { useState } from "react"

interface CampaignFormData {
  campaignType: string
  existingCampaign?: string
}

interface CampaignModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: any) => void
}

const campaignOptions = [
  {
    value: "without_campaign",
    label: "Without Campaign",
    description: "Proceed without associating promotion with campaign",
  },
  {
    value: "existing_campaign",
    label: "Existing Campaign",
    description: "Add promotion to an existing campaign.",
  },
  {
    value: "new_campaign",
    label: "New Campaign",
    description: "Create a new campaign for this promotion.",
  },
]

const existingCampaigns = [
  { value: "summer_sale", label: "Summer Sale 2024" },
  { value: "black_friday", label: "Black Friday" },
  { value: "new_year", label: "New Year Special" },
]

const steps = [
  { id: "type", title: "Type", completed: true },
  { id: "details", title: "Details", completed: true },
  { id: "campaign", title: "Campaign" },
]

export function CampaignModal({ open, onClose, onSave }: CampaignModalProps) {
  const [newCampaignData, setNewCampaignData] = useState<any>(null)
  const [campaignType, setCampaignType] = useState("without_campaign")
  const [existingCampaign, setExistingCampaign] = useState("")

  const onSubmit = () => {
    const data: any = { campaignType }

    if (campaignType === "existing_campaign") {
      data.existingCampaign = existingCampaign
    } else if (campaignType === "new_campaign" && newCampaignData) {
      data.newCampaign = newCampaignData
    }

    onSave(data)
  }

  const handleNewCampaignSubmit = (data: any) => {
    setNewCampaignData(data)
  }

  const canSubmit = () => {
    if (campaignType === "without_campaign") return true
    if (campaignType === "existing_campaign") return existingCampaign !== ""
    if (campaignType === "new_campaign") return newCampaignData !== null
    return false
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Create Promotion</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              esc
            </Button>
          </div>
        </DialogHeader>

        <StepIndicator steps={steps} currentStep="campaign" />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Campaign</h3>
            <RadioGroup
              options={campaignOptions}
              value={campaignType}
              onChange={(value) => {
                setCampaignType(value)
                // Reset dependent state when campaign type changes
                setNewCampaignData(null)
                setExistingCampaign("")
              }}
              name="campaignType"
            />
          </div>

          {campaignType === "existing_campaign" && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-3">Existing Campaign</h4>
              <SelectField
                options={existingCampaigns}
                placeholder="Select a campaign"
                description="Only campaigns with the same currency code as the promotion are shown in this list."
                value={existingCampaign}
                onChange={setExistingCampaign}
              />
            </div>
          )}

          {campaignType === "new_campaign" && (
            <div className="mt-6">
              <NewCampaignForm onSubmit={handleNewCampaignSubmit} />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={!canSubmit()}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
