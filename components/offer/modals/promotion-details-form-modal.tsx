"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormInput } from "../forms/form-input"
import { FormRadioGroup } from "../forms/form-radio-group"
import { DynamicConditionBuilder } from "../forms/dynamic-condition-builder"
import { StepProgress } from "../navigation/step-progress"
import { useState } from "react"

interface PromotionDetailsFormData {
  method: string
  status: string
  code: string
  promotionValue: string
  maximumQuantity: string
  minimumQuantity: string
  applyToQuantity: string
}

interface PromotionDetailsFormModalProps {
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

const customerFieldOptions = [
  { value: "customer_group", label: "Customer Group" },
  { value: "region", label: "Region" },
  { value: "country", label: "Country" },
  { value: "sales_channel", label: "Sales Channel" },
]

const productFieldOptions = [
  { value: "product", label: "Product" },
  { value: "product_category", label: "Product Category" },
  { value: "product_collection", label: "Product Collection" },
  { value: "product_tag", label: "Product Tag" },
]

const cartRequirementFieldOptions = [
  { value: "minimum_quantity", label: "Minimum quantity of items" },
  { value: "product", label: "Product" },
]

const operatorOptions = [
  { value: "in", label: "In" },
  { value: "equals", label: "Equals" },
  { value: "not_in", label: "Not In" },
]

export function PromotionDetailsFormModal({
  open,
  onClose,
  onContinue,
  promotionType,
}: PromotionDetailsFormModalProps) {
  const [customerConditions, setCustomerConditions] = useState<any[]>([])
  const [itemConditions, setItemConditions] = useState<any[]>([])
  const [cartRequirements, setCartRequirements] = useState<any[]>([])

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
      code: "",
      promotionValue: "",
      maximumQuantity: "1",
      minimumQuantity: "",
      applyToQuantity: "",
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
      case "amount_off_products":
        return {
          prefixText: "$",
          suffixText: "USD",
          placeholder: "100",
          helpText: "The amount to be discounted, eg. 100",
        }
      case "percentage_off_product":
      case "percentage_off_order":
        return {
          suffixText: "%",
          placeholder: "10",
          helpText: "The percentage to discount off the amount, eg. 10%",
        }
      case "buy_x_get_y":
        return {
          suffixText: "%",
          placeholder: "100",
          helpText: "Percentage discount for Y items (100% = free)",
        }
      default:
        return {
          placeholder: "100",
          helpText: "The amount to be discounted, eg. 100",
        }
    }
  }

  // Get field configuration based on promotion type
  const getFieldConfig = () => {
    switch (promotionType) {
      case "amount_off_products":
        return {
          showMaximumQuantity: true,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
        }
      case "amount_off_order":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
        }
      case "percentage_off_product":
        return {
          showMaximumQuantity: true,
          showCustomerConditions: true,
          showItemConditions: true,
          showCartRequirements: false,
        }
      case "percentage_off_order":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
        }
      case "buy_x_get_y":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: true,
          showCartRequirements: true,
        }
      default:
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
        }
    }
  }

  const fieldConfig = getFieldConfig()
  const valueConfig = getPromotionValueConfig(promotionType)

  const onSubmit = (data: PromotionDetailsFormData) => {
    onContinue({
      ...data,
      customerConditions,
      itemConditions,
      cartRequirements,
      promotionType,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-200 max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Create Promotion</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
              esc
            </Button>
          </div>
        </DialogHeader>

        <StepProgress steps={steps} currentStep="details" />

        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Promotion Details</h2>
          <span className="px-2.5 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
            {getPromotionTypeLabel(promotionType)}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Level 1: Basic Configuration */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-6">1. Basic Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormRadioGroup
                label="Method"
                options={methodOptions}
                value={method}
                onChange={(value) => setValue("method", value)}
                name="method"
              />

              <FormRadioGroup
                label="Status"
                options={statusOptions}
                value={status}
                onChange={(value) => setValue("status", value)}
                name="status"
              />
            </div>

            <div className="mt-6">
              <FormInput
                label="Code"
                placeholder="Enter promotion code"
                helpText="The code your customers will enter during checkout."
                {...register("code", { required: "Code is required" })}
                error={errors.code?.message}
              />
            </div>
          </div>

          {/* Level 2: Customer Eligibility */}
          {fieldConfig.showCustomerConditions && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-6">2. Customer Eligibility</h3>
              <DynamicConditionBuilder
                title="Who can use this code?"
                description="Which customer is allowed to use the promotion code? Promotion code can be used by all customers if left untouched."
                conditions={customerConditions}
                onChange={setCustomerConditions}
                fieldOptions={customerFieldOptions}
                operatorOptions={operatorOptions}
              />
            </div>
          )}

          {/* Level 3: Cart Requirements (Buy X Get Y only) */}
          {fieldConfig.showCartRequirements && (
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-6">3. Cart Requirements</h3>
              <DynamicConditionBuilder
                title="What needs to be in the cart to unlock the promotion?"
                description="If these conditions match, we enable the promotion on the target items."
                conditions={cartRequirements}
                onChange={setCartRequirements}
                fieldOptions={cartRequirementFieldOptions}
                operatorOptions={operatorOptions}
              />
            </div>
          )}

          {/* Level 4: Product Conditions */}
          {fieldConfig.showItemConditions && (
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {fieldConfig.showCartRequirements ? "4. Product Conditions" : "3. Product Conditions"}
              </h3>
              <DynamicConditionBuilder
                title="What items will the promotion be applied to?"
                description="The promotion will be applied to items that match the following conditions."
                conditions={itemConditions}
                onChange={setItemConditions}
                fieldOptions={productFieldOptions}
                operatorOptions={operatorOptions}
              />
            </div>
          )}

          {/* Level 5: Discount Configuration */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {fieldConfig.showCartRequirements && fieldConfig.showItemConditions
                ? "5. Discount Configuration"
                : fieldConfig.showItemConditions
                  ? "4. Discount Configuration"
                  : "3. Discount Configuration"}
            </h3>

            <div
              className={`grid ${fieldConfig.showMaximumQuantity ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-6`}
            >
              <FormInput
                label="Promotion Value"
                placeholder={valueConfig.placeholder}
                helpText={valueConfig.helpText}
                prefixText={valueConfig.prefixText}
                suffixText={valueConfig.suffixText}
                {...register("promotionValue", { required: "Promotion value is required" })}
                error={errors.promotionValue?.message}
              />

              {fieldConfig.showMaximumQuantity && (
                <FormInput
                  label="Maximum Quantity"
                  placeholder="1"
                  helpText="Maximum quantity of items this promotion applies to."
                  {...register("maximumQuantity")}
                  error={errors.maximumQuantity?.message}
                />
              )}
            </div>
          </div>

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
