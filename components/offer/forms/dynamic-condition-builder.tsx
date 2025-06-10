"use client"

import { Button } from "@/components/ui/button"
import { FormSelect } from "./form-select"
import { X } from "lucide-react"

interface Condition {
  id: string
  field: string
  operator: string
  value: string
}

interface DynamicConditionBuilderProps {
  title: string
  description: string
  conditions: Condition[]
  onChange: (conditions: Condition[]) => void
  fieldOptions: { value: string; label: string }[]
  operatorOptions: { value: string; label: string }[]
  valueOptions?: { value: string; label: string }[]
  addMultiple?: boolean // New prop to control adding multiple conditions
}

export function DynamicConditionBuilder({
  title,
  description,
  conditions,
  onChange,
  fieldOptions,
  operatorOptions,
  valueOptions = [{ value: "us_dollar", label: "US Dollar" }],
  addMultiple = false,
}: DynamicConditionBuilderProps) {
  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      field: "",
      operator: "",
      value: "",
    }
    onChange([...conditions, newCondition])
  }

  const removeCondition = (id: string) => {
    onChange(conditions.filter((c) => c.id !== id))
  }

  const updateCondition = (id: string, updates: Partial<Condition>) => {
    onChange(conditions.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  // Get dynamic value options based on selected field
  const getValueOptions = (field: string) => {
    switch (field) {
      case "customer_group":
        return [
          { value: "vip", label: "VIP Customers" },
          { value: "regular", label: "Regular Customers" },
          { value: "new", label: "New Customers" },
          { value: "wholesale", label: "Wholesale" },
        ]
      case "region":
        return [
          { value: "north_america", label: "North America" },
          { value: "europe", label: "Europe" },
          { value: "asia_pacific", label: "Asia Pacific" },
          { value: "latin_america", label: "Latin America" },
          { value: "middle_east_africa", label: "Middle East & Africa" },
        ]
      case "country":
        return [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
          { value: "jp", label: "Japan" },
          { value: "au", label: "Australia" },
        ]
      case "sales_channel":
        return [
          { value: "online", label: "Online Store" },
          { value: "retail", label: "Retail Store" },
          { value: "mobile_app", label: "Mobile App" },
          { value: "marketplace", label: "Marketplace" },
          { value: "wholesale", label: "Wholesale" },
        ]
      default:
        return valueOptions
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {conditions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No conditions set. Click "Add condition" to get started.</p>
        </div>
      )}

      {conditions.map((condition, index) => (
        <div
          key={condition.id}
          className="flex items-end space-x-3 p-4 bg-white rounded-lg border border-gray-300 relative shadow-sm"
        >
          <div className="flex-1">
            <FormSelect
              label={index === 0 ? "Attribute" : undefined}
              options={fieldOptions}
              value={condition.field}
              onChange={(value) => updateCondition(condition.id, { field: value, value: "" })} // Reset value when field changes
              placeholder="Select Attribute"
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label={index === 0 ? "Operator" : undefined}
              options={operatorOptions}
              value={condition.operator}
              onChange={(value) => updateCondition(condition.id, { operator: value })}
              placeholder="Select Operator"
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label={index === 0 ? "Values" : undefined}
              options={getValueOptions(condition.field)}
              value={condition.value}
              onChange={(value) => updateCondition(condition.id, { value })}
              placeholder="Select Values"
              disabled={!condition.field}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeCondition(condition.id)}
            className="text-gray-500 hover:text-red-700 absolute top-2 right-2"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={addCondition}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          Add condition
        </Button>
        {conditions.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange([])}
            className="text-gray-500 hover:text-red-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {conditions.length > 0 && (
        <div className="text-xs text-gray-500">
          {conditions.length} condition{conditions.length !== 1 ? "s" : ""} configured
        </div>
      )}
    </div>
  )
}
