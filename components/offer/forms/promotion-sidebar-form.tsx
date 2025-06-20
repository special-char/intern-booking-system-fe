"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DynamicConditionBuilder } from "./dynamic-condition-builder"
import { X, ChevronDown, ChevronRight } from "lucide-react"

interface PromotionFormData {
  // Basic fields
  status: string
  method: string
  code: string
  promotionValue: string
  maximumQuantity: string
}

interface PromotionSidebarFormProps {
  onSubmit: (data: PromotionFormData) => void
  initialData?: Partial<PromotionFormData>
  isLoading?: boolean
  promotionType?: string
  onClose?: () => void
}

export function PromotionSidebarForm({
  onSubmit,
  initialData,
  isLoading = false,
  promotionType,
  onClose,
}: PromotionSidebarFormProps) {
  const [customerConditions, setCustomerConditions] = useState<any[]>([])
  const [itemConditions, setItemConditions] = useState<any[]>([])
  const [cartRequirements, setCartRequirements] = useState<any[]>([])

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    customer: true,
    cart: true,
    product: true,
    discount: true,
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<PromotionFormData>({
    defaultValues: {
      status: "draft",
      method: "promotion_code",
      code: "22323",
      promotionValue: "32",
      maximumQuantity: "1",
      ...initialData,
    },
    mode: "onChange",
  })

  // Watch form values
  const status = watch("status")
  const method = watch("method")

  const handleFormSubmit = useCallback(
    (data: PromotionFormData) => {
      const formData = {
        ...data,
        customerConditions,
        itemConditions,
        cartRequirements,
      }
      onSubmit(formData)
    },
    [onSubmit, customerConditions, itemConditions, cartRequirements],
  )

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
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
          valuePrefix: "$",
          valueSuffix: "USD",
          valuePlaceholder: "100",
          valueDescription: "The amount to be discounted, eg. 100",
        }
      case "amount_off_order":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
          valuePrefix: "$",
          valueSuffix: "USD",
          valuePlaceholder: "100",
          valueDescription: "The amount to be discounted from order total, eg. 100",
        }
      case "percentage_off_product":
        return {
          showMaximumQuantity: true,
          showCustomerConditions: true,
          showItemConditions: true,
          showCartRequirements: false,
          valuePrefix: "",
          valueSuffix: "%",
          valuePlaceholder: "10",
          valueDescription: "The percentage to discount off the amount, eg. 10%",
        }
      case "percentage_off_order":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
          valuePrefix: "",
          valueSuffix: "%",
          valuePlaceholder: "10",
          valueDescription: "The percentage to discount off order total, eg. 10%",
        }
      case "buy_x_get_y":
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: true,
          showCartRequirements: true,
          valuePrefix: "",
          valueSuffix: "%",
          valuePlaceholder: "100",
          valueDescription: "Percentage discount for Y items (100% = free)",
        }
      default:
        return {
          showMaximumQuantity: false,
          showCustomerConditions: true,
          showItemConditions: false,
          showCartRequirements: false,
          valuePrefix: "$",
          valueSuffix: "USD",
          valuePlaceholder: "100",
          valueDescription: "The amount to be discounted, eg. 100",
        }
    }
  }

  const fieldConfig = getFieldConfig()

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
    {
      value: "inactive",
      label: "Inactive",
      description: "Customers will no longer be able to use the code",
    },
  ]

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

  const CollapsibleSection = ({
    title,
    sectionKey,
    children,
    level,
    bgColor = "bg-gray-50",
  }: {
    title: string
    sectionKey: keyof typeof expandedSections
    children: React.ReactNode
    level: number
    bgColor?: string
  }) => (
    <div className={`${bgColor} rounded-lg overflow-hidden`}>
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
      >
        <h3 className="text-sm font-medium text-gray-900">
          {level}. {title}
        </h3>
        {expandedSections[sectionKey] ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && <div className="px-4 pb-4">{children}</div>}
    </div>
  )

  return (
    <Card className="w-full bg-white border-gray-200 rounded-xl shadow-lg">
      <CardHeader className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Edit Promotion Details</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Level 1: Basic Configuration */}
          <CollapsibleSection title="Basic Configuration" sectionKey="basic" level={1} bgColor="bg-gray-50">
            <div className="space-y-4">
              {/* Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        status === option.value
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={status === option.value}
                        onChange={(e) => setValue("status", e.target.value)}
                        className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Method */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Method</h4>
                <div className="space-y-2">
                  {methodOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        method === option.value
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={method === option.value}
                        onChange={(e) => setValue("method", e.target.value)}
                        className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Code */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Code</h4>
                <input
                  {...register("code", { required: "Code is required" })}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">The code your customers will enter during checkout.</p>
                {errors.code && <p className="text-xs text-red-600 mt-1">{errors.code.message}</p>}
              </div>
            </div>
          </CollapsibleSection>

          {/* Level 2: Customer Eligibility */}
          {fieldConfig.showCustomerConditions && (
            <CollapsibleSection title="Customer Eligibility" sectionKey="customer" level={2} bgColor="bg-blue-50">
              <DynamicConditionBuilder
                title="Who can use this code?"
                description="Which customer is allowed to use the promotion code? Promotion code can be used by all customers if left untouched."
                conditions={customerConditions}
                onChange={setCustomerConditions}
                fieldOptions={customerFieldOptions}
                operatorOptions={operatorOptions}
              />
            </CollapsibleSection>
          )}

          {/* Level 3: Cart Requirements (Buy X Get Y only) */}
          {fieldConfig.showCartRequirements && (
            <CollapsibleSection title="Cart Requirements" sectionKey="cart" level={3} bgColor="bg-green-50">
              <DynamicConditionBuilder
                title="What needs to be in the cart to unlock the promotion?"
                description="If these conditions match, we enable the promotion on the target items."
                conditions={cartRequirements}
                onChange={setCartRequirements}
                fieldOptions={cartRequirementFieldOptions}
                operatorOptions={operatorOptions}
              />
            </CollapsibleSection>
          )}

          {/* Level 4: Product Conditions */}
          {fieldConfig.showItemConditions && (
            <CollapsibleSection
              title="Product Conditions"
              sectionKey="product"
              level={fieldConfig.showCartRequirements ? 4 : 3}
              bgColor="bg-purple-50"
            >
              <DynamicConditionBuilder
                title="What items will the promotion be applied to?"
                description="The promotion will be applied to items that match the following conditions."
                conditions={itemConditions}
                onChange={setItemConditions}
                fieldOptions={productFieldOptions}
                operatorOptions={operatorOptions}
              />
            </CollapsibleSection>
          )}

          {/* Level 5: Discount Configuration */}
          <CollapsibleSection
            title="Discount Configuration"
            sectionKey="discount"
            level={
              fieldConfig.showCartRequirements && fieldConfig.showItemConditions
                ? 5
                : fieldConfig.showItemConditions
                  ? 4
                  : 3
            }
            bgColor="bg-orange-50"
          >
            <div className="space-y-4">
              <div className={`grid ${fieldConfig.showMaximumQuantity ? "grid-cols-1" : "grid-cols-1"} gap-4`}>
                {/* Promotion Value */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Promotion Value</h4>
                  <div className="relative">
                    {fieldConfig.valuePrefix && (
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        {fieldConfig.valuePrefix}
                      </span>
                    )}
                    <input
                      {...register("promotionValue", { required: "Promotion value is required" })}
                      placeholder={fieldConfig.valuePlaceholder}
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        fieldConfig.valuePrefix ? "pl-8 pr-12" : "pr-8"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      {fieldConfig.valueSuffix}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{fieldConfig.valueDescription}</p>
                  {errors.promotionValue && (
                    <p className="text-xs text-red-600 mt-1">{errors.promotionValue.message}</p>
                  )}
                </div>

                {/* Maximum Quantity */}
                {fieldConfig.showMaximumQuantity && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Maximum Quantity</h4>
                    <input
                      {...register("maximumQuantity")}
                      placeholder="1"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum quantity of items this promotion applies to.</p>
                    {errors.maximumQuantity && (
                      <p className="text-xs text-red-600 mt-1">{errors.maximumQuantity.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CollapsibleSection>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset(initialData)}
              disabled={!isDirty || isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
