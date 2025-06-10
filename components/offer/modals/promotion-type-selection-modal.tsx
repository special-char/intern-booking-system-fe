"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormRadioGroup } from "../forms/form-radio-group"
import { StepProgress } from "../navigation/step-progress"

interface PromotionTypeFormData {
  type: string
}

interface PromotionTypeSelectionModalProps {
  open: boolean
  onClose: () => void
  onContinue: (type: string) => void
}

const promotionTypes = [
  {
    value: "amount_off_products",
    label: "Amount off products",
    description: "Discount specific products or collection of products",
  },
  {
    value: "amount_off_order",
    label: "Amount off order",
    description: "Discounts the total order amount",
  },
  {
    value: "percentage_off_product",
    label: "Percentage off product",
    description: "Discounts a percentage off selected products",
  },
  {
    value: "percentage_off_order",
    label: "Percentage off order",
    description: "Discounts a percentage of the total order amount",
  },
  {
    value: "buy_x_get_y",
    label: "Buy X Get Y",
    description: "Buy X product(s), get Y product(s)",
  },
]

const steps = [
  { id: "type", title: "Type" },
  { id: "details", title: "Details" },
  { id: "campaign", title: "Campaign" },
]

export function PromotionTypeSelectionModal({ open, onClose, onContinue }: PromotionTypeSelectionModalProps) {
  const { handleSubmit, watch, setValue } = useForm<PromotionTypeFormData>({
    defaultValues: {
      type: "amount_off_products",
    },
  })

  const selectedType = watch("type")

  const onSubmit = (data: PromotionTypeFormData) => {
    onContinue(data.type)
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

        <StepProgress steps={steps} currentStep="type" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormRadioGroup
            label="Type"
            options={promotionTypes}
            value={selectedType}
            onChange={(value) => setValue("type", value)}
            name="promotionType"
          />

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
