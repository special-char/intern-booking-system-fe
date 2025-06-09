"use client"
import { Button } from "@/components/ui/button"
import { SelectField } from "./select-field"
import { X } from "lucide-react"

interface Condition {
  id: string
  field: string
  operator: string
  value: string
}

interface ConditionBuilderProps {
  title: string
  description: string
  conditions: Condition[]
  onChange: (conditions: Condition[]) => void
  fieldOptions: { value: string; label: string }[]
  operatorOptions: { value: string; label: string }[]
}

export function ConditionBuilder({
  title,
  description,
  conditions,
  onChange,
  fieldOptions,
  operatorOptions,
}: ConditionBuilderProps) {
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

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      {conditions.map((condition) => (
        <div key={condition.id} className="flex items-end space-x-3 p-4 bg-gray-800 rounded-lg relative">
          <div className="flex-1">
            <SelectField
              options={fieldOptions}
              value={condition.field}
              onChange={(value) => updateCondition(condition.id, { field: value })}
              placeholder="Select Attribute"
            />
          </div>
          <div className="flex-1">
            <SelectField
              options={operatorOptions}
              value={condition.operator}
              onChange={(value) => updateCondition(condition.id, { operator: value })}
              placeholder="Select Operator"
            />
          </div>
          <div className="flex-1">
            <SelectField
              options={[{ value: "us_dollar", label: "US Dollar" }]}
              value={condition.value}
              onChange={(value) => updateCondition(condition.id, { value })}
              placeholder="Select Values"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeCondition(condition.id)}
            className="text-gray-400 hover:text-red-400 absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={addCondition}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Add condition
        </Button>
        {conditions.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange([])}
            className="text-gray-400 hover:text-red-400"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  )
}
