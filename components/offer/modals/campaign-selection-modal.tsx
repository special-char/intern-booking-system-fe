"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormRadioGroup } from "../forms/form-radio-group"
import { FormSelect } from "../forms/form-select"
import { StepProgress } from "../navigation/step-progress"

interface CampaignFormData {
  campaignType: string
  existingCampaign?: string
}

interface CampaignSelectionModalProps {
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

export function CampaignSelectionModal({ open, onClose, onSave }: CampaignSelectionModalProps) {
  const { register, handleSubmit, watch, setValue } = useForm<CampaignFormData>({
    defaultValues: {
      campaignType: "without_campaign",
    },
  })

  const campaignType = watch("campaignType")

  const onSubmit = (data: CampaignFormData) => {
    onSave(data)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-200 max-w-2xl rounded-xl shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Create Promotion</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
              esc
            </Button>
          </div>
        </DialogHeader>

        <StepProgress steps={steps} currentStep="campaign" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormRadioGroup
            label="Campaign"
            options={campaignOptions}
            value={campaignType}
            onChange={(value) => setValue("campaignType", value)}
            name="campaignType"
          />

          {campaignType === "existing_campaign" && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Existing Campaign</h4>
              <FormSelect
                options={existingCampaigns}
                placeholder="Select a campaign"
                helpText="Only campaigns\
"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
