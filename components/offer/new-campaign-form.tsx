"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { FormField } from "./ui/form-field"
import { TextareaField } from "./ui/textarea-field"
import { DatePicker } from "./ui/date-picker"
import { RadioGroup } from "./ui/radio-group"

interface NewCampaignFormData {
  name: string
  identifier: string
  description: string
  startDate: string
  endDate: string
  budgetType: string
  budgetLimit: string
}

interface NewCampaignFormProps {
  onSubmit: (data: NewCampaignFormData) => void
}

const budgetTypeOptions = [
  {
    value: "usage",
    label: "Usage",
    description: "Limit on how many times the promotion can be used.",
  },
  {
    value: "spend",
    label: "Spend",
    description: "Set a limit on the total discounted amount of all promotion usages.",
  },
]

export function NewCampaignForm({ onSubmit }: NewCampaignFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewCampaignFormData>({
    defaultValues: {
      budgetType: "usage",
    },
  })

  const budgetType = watch("budgetType")

  // Watch all form values and call onSubmit when they change
  const formValues = watch()

  React.useEffect(() => {
    // Only submit if we have required fields
    if (formValues.name && formValues.identifier) {
      onSubmit(formValues)
    }
  }, [formValues, onSubmit])

  const handleFormSubmit = (data: NewCampaignFormData) => {
    onSubmit(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-600 bg-gray-800 mb-6">
          <input
            type="radio"
            id="new_campaign"
            name="campaign_option"
            className="h-4 w-4 text-blue-500 border-gray-600 bg-gray-800 focus:ring-blue-500"
            defaultChecked
          />
          <div className="flex-1">
            <label htmlFor="new_campaign" className="text-sm font-medium text-white cursor-pointer">
              New Campaign
            </label>
            <p className="text-xs text-gray-400 mt-1">Create a new campaign for this promotion.</p>
          </div>
        </div>

        <h3 className="text-lg font-medium text-white mb-2">Create Campaign</h3>
        <p className="text-sm text-gray-400 mb-6">Create a promotional campaign.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <FormField
            label="Identifier"
            {...register("identifier", { required: "Identifier is required" })}
            error={errors.identifier?.message}
          />
        </div>

        <TextareaField
          label="Description (Optional)"
          {...register("description")}
          error={errors.description?.message}
        />

        <div className="grid grid-cols-2 gap-6">
          <DatePicker label="Start date (Optional)" {...register("startDate")} error={errors.startDate?.message} />
          <DatePicker label="End date (Optional)" {...register("endDate")} error={errors.endDate?.message} />
        </div>

        <div>
          <h4 className="text-lg font-medium text-white mb-2">Campaign Budget</h4>
          <p className="text-sm text-gray-400 mb-4">Create a budget for the campaign.</p>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-white mb-3">Type</h5>
              <RadioGroup
                options={budgetTypeOptions}
                value={budgetType}
                onChange={(value) => setValue("budgetType", value)}
                name="budgetType"
              />
            </div>

            <div>
              <h5 className="text-sm font-medium text-white mb-2">Limit</h5>
              <FormField
                {...register("budgetLimit", { required: "Limit is required" })}
                error={errors.budgetLimit?.message}
                placeholder={budgetType === "usage" ? "100" : "1000"}
              />
              <p className="text-xs text-gray-400 mt-1">
                {budgetType === "usage"
                  ? "Maximum number of times the promotion can be used."
                  : "Maximum amount that can be discounted across all usages."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
