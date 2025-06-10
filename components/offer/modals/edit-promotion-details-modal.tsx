"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DynamicConditionBuilder } from "../forms/dynamic-condition-builder"
import { useState } from "react"

interface EditPromotionFormData {
  status: string
  method: string
  code: string
  valueType: string
  amount: string
  allocation: string
  minimumAmount: string
  maximumDiscount: string
  usageLimit: string
}

interface EditPromotionDetailsModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: any) => void
  promotion: any
  isLoading?: boolean
}

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

const valueTypeOptions = [
  {
    value: "fixed_amount",
    label: "Fixed amount",
    description: "The amount to be discounted, eg. 100",
  },
  {
    value: "percentage",
    label: "Percentage",
    description: "The percentage to discount off the amount, eg. 8%",
  },
]

const allocationOptions = [
  {
    value: "each",
    label: "Each",
    description: "Applies value on each item",
  },
  {
    value: "across",
    label: "Across",
    description: "Applies value across items",
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

const operatorOptions = [
  { value: "in", label: "In" },
  { value: "equals", label: "Equals" },
  { value: "not_in", label: "Not In" },
]

export function EditPromotionDetailsModal({
  open,
  onClose,
  onSave,
  promotion,
  isLoading = false,
}: EditPromotionDetailsModalProps) {
  const [customerConditions, setCustomerConditions] = useState<any[]>(promotion?.conditions || [])
  const [itemConditions, setItemConditions] = useState<any[]>(promotion?.itemConditions || [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditPromotionFormData>({
    defaultValues: {
      status: promotion?.status?.toLowerCase() || "draft",
      method: "promotion_code",
      code: promotion?.code || "",
      valueType: "fixed_amount",
      amount: "32",
      allocation: "each",
      minimumAmount: "",
      maximumDiscount: "",
      usageLimit: "",
    },
  })

  const status = watch("status")
  const method = watch("method")
  const valueType = watch("valueType")
  const allocation = watch("allocation")

  const onSubmit = (data: EditPromotionFormData) => {
    const updatedData = {
      ...data,
      customerConditions,
      itemConditions,
      // Format the data for consistency
      status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
      value: valueType === "percentage" ? `${data.amount}%` : `$${data.amount} USD`,
      type: valueType === "percentage" ? "Percentage Off" : "Fixed Amount",
    }
    onSave(updatedData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Edit Promotion Details</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400">
              esc
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Status</h3>
            <div className="space-y-3">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    status === option.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={status === option.value}
                    onChange={(e) => setValue("status", e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{option.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Method */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Method</h3>
            <div className="space-y-3">
              {methodOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    method === option.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={method === option.value}
                    onChange={(e) => setValue("method", e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{option.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Code */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Code</h3>
            <input
              {...register("code", { required: "Code is required" })}
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">The code your customers will enter during checkout.</p>
            {errors.code && <p className="text-xs text-red-400 mt-1">{errors.code.message}</p>}
          </div>

          {/* Value Type */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Value Type</h3>
            <div className="space-y-3">
              {valueTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    valueType === option.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={valueType === option.value}
                    onChange={(e) => setValue("valueType", e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{option.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Amount</h3>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                {valueType === "fixed_amount" ? "USD" : ""}
              </span>
              <input
                {...register("amount", { required: "Amount is required" })}
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                {valueType === "percentage" ? "%" : "$"}
              </span>
            </div>
            {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount.message}</p>}
          </div>

          {/* Allocation */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Allocation</h3>
            <div className="space-y-3">
              {allocationOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    allocation === option.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={allocation === option.value}
                    onChange={(e) => setValue("allocation", e.target.value)}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{option.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional fields based on value type */}
          {valueType === "percentage" && (
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Maximum Discount</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">USD</span>
                <input
                  {...register("maximumDiscount")}
                  placeholder="100"
                  className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-8"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Maximum discount amount for percentage-based promotions.</p>
            </div>
          )}

          {/* Minimum Amount */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Minimum Amount</h3>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">USD</span>
              <input
                {...register("minimumAmount")}
                placeholder="50"
                className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Minimum order amount required to use this promotion.</p>
          </div>

          {/* Usage Limit */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Usage Limit</h3>
            <input
              {...register("usageLimit")}
              placeholder="100"
              className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">Maximum number of times this promotion can be used.</p>
          </div>

          {/* Customer Conditions */}
          <div className="border-t border-gray-700 pt-6">
            <DynamicConditionBuilder
              title="Customer Eligibility"
              description="Define which customers can use this promotion."
              conditions={customerConditions}
              onChange={setCustomerConditions}
              fieldOptions={customerFieldOptions}
              operatorOptions={operatorOptions}
            />
          </div>

          {/* Product Conditions */}
          <div className="border-t border-gray-700 pt-6">
            <DynamicConditionBuilder
              title="Product Conditions"
              description="Define which products this promotion applies to."
              conditions={itemConditions}
              onChange={setItemConditions}
              fieldOptions={productFieldOptions}
              operatorOptions={operatorOptions}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
