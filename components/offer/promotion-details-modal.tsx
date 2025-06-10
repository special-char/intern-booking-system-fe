"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormField } from "./ui/form-field"
import { RadioGroup } from "./ui/radio-group"
import { ConditionBuilder } from "./ui/condition-builder"
import { StepIndicator } from "./ui/step-indicator"
import { useState } from "react"

interface PromotionDetailsFormData {
  method: string
  status: string
  code: string
  promotionValue: string
  maximumQuantity: string
  currencyCode: string
}

interface PromotionDetailsModalProps {
  open: boolean
  onClose: () => void
  onContinue: (data: any) => void
  promotionType: string
}

const methodOptions = [
  {
    value: "promotion_code",
    label: "Promotion code",
    description: "Customers must enter this code at checkout",
  },
  {
    value: "automatic",
    label: "Automatic",
    description: "Customers will see this promotion at checkout",
  },
]

const statusOptions = [
  {
    value: "draft",
    label: "Draft",
    description: "Customers will not be able to use the code yet",
  },
  {
    value: "active",
    label: "Active",
    description: "Customers will be able to use the code",
  },
]

const steps = [
  { id: "type", title: "Type", completed: true },
  { id: "details", title: "Details" },
  { id: "campaign", title: "Campaign" },
]

const fieldOptions = [
  { value: "currency_code", label: "Currency Code" },
  { value: "product", label: "Product" },
]

const operatorOptions = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
]

export function PromotionDetailsModal({ open, onClose, onContinue, promotionType }: PromotionDetailsModalProps) {
  const [customerConditions, setCustomerConditions] = useState<any[]>([
    {
      id: "1",
      field: "currency_code",
      operator: "equals",
      value: "us_dollar",
    },
  ])
  const [itemConditions, setItemConditions] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PromotionDetailsFormData>({
    defaultValues: {
      method: "promotion_code",
      status: "draft",
      code: "SUMMER15",
      promotionValue: "",
      maximumQuantity: "1",
      currencyCode: "",
    },
  })

  const method = watch("method")
  const status = watch("status")

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

  const getPromotionValueConfig = (type: string) => {
    switch (type) {
      case "amount_off_order":
        return {
          prefix: "$",
          suffix: "USD",
          placeholder: "100",
          description: "The amount to be discounted, eg. 100",
        }
      case "percentage_off_product":
      case "percentage_off_order":
        return {
          suffix: "%",
          placeholder: "5",
          description: "The percentage to discount off the amount, eg. 5%",
        }
      default:
        return {
          placeholder: "100",
          description: "The amount to be discounted, eg. 100",
        }
    }
  }

  const showMaximumQuantity = () => {
    return promotionType === "percentage_off_product" || promotionType === "amount_off_products"
  }

  const showItemConditions = () => {
    return promotionType === "percentage_off_product" || promotionType === "buy_x_get_y"
  }

  const onSubmit = (data: PromotionDetailsFormData) => {
    onContinue({
      ...data,
      customerConditions,
      itemConditions,
      promotionType,
    })
  }

  const valueConfig = getPromotionValueConfig(promotionType)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Create Promotion</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              esc
            </Button>
          </div>
        </DialogHeader>

        <StepIndicator steps={steps} currentStep="details" />

        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-semibold text-white">Promotion Details</h2>
          <span className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
            {getPromotionTypeLabel(promotionType)}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Method</h3>
              <RadioGroup
                options={methodOptions}
                value={method}
                onChange={(value) => setValue("method", value)}
                name="method"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-4">Status</h3>
              <RadioGroup
                options={statusOptions}
                value={status}
                onChange={(value) => setValue("status", value)}
                name="status"
              />
            </div>
          </div>

          <FormField
            label="Code"
            placeholder="SUMMER15"
            description="The code your customers will enter during checkout."
            {...register("code", { required: "Code is required" })}
            error={errors.code?.message}
          />

          <ConditionBuilder
            title="Who can use this code?"
            description="Which customer is allowed to use the promotion code? Promotion code can be used by all customers if left untouched."
            conditions={customerConditions}
            onChange={setCustomerConditions}
            fieldOptions={fieldOptions}
            operatorOptions={operatorOptions}
          />

          <div className={`grid ${showMaximumQuantity() ? "grid-cols-2" : "grid-cols-1"} gap-6`}>
            <FormField
              label="Promotion Value"
              placeholder={valueConfig.placeholder}
              description={valueConfig.description}
              prefix={valueConfig.prefix}
              suffix={valueConfig.suffix}
              {...register("promotionValue", { required: "Promotion value is required" })}
              error={errors.promotionValue?.message}
            />

            {showMaximumQuantity() && (
              <FormField
                label="Maximum Quantity"
                placeholder="1"
                description="Maximum quantity of items this promotion applies to."
                {...register("maximumQuantity")}
                error={errors.maximumQuantity?.message}
              />
            )}
          </div>

          {showItemConditions() && (
            <ConditionBuilder
              title="What items will the promotion be applied to?"
              description="The promotion will be applied to items that match the following conditions."
              conditions={itemConditions}
              onChange={setItemConditions}
              fieldOptions={fieldOptions}
              operatorOptions={operatorOptions}
            />
          )}

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
