"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "./ui/radio-group"
import { StepIndicator } from "./ui/step-indicator"

interface PromotionTypeFormData {
  type: string
}

interface PromotionTypeModalProps {
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

export function PromotionTypeModal({ open, onClose, onContinue }: PromotionTypeModalProps) {
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
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Create Promotion</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              esc
            </Button>
          </div>
        </DialogHeader>

        <StepIndicator steps={steps} currentStep="type" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Type</h3>
            <RadioGroup
              options={promotionTypes}
              value={selectedType}
              onChange={(value) => setValue("type", value)}
              name="promotionType"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
