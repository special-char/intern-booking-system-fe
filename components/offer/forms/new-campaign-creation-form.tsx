"use client"

import { useForm } from "react-hook-form"
import { FormInput } from "./form-input"
import { FormTextarea } from "./form-textarea"
import { FormDatePicker } from "./form-date-picker"
import { FormRadioGroup } from "./form-radio-group"

interface NewCampaignFormData {
  name: string
  identifier: string
  description: string
  startDate: string
  endDate: string
  budgetType: string
  budgetLimit: string
}

interface NewCampaignCreationFormProps {
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

export function NewCampaignCreationForm({ onSubmit }: NewCampaignCreationFormProps) {
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Campaign</h3>
        <p className="text-sm text-gray-500">Create a promotional campaign.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />
          <FormInput
            label="Identifier"
            {...register("identifier", { required: "Identifier is required" })}
            error={errors.identifier?.message}
          />
        </div>

        <FormTextarea label="Description (Optional)" {...register("description")} error={errors.description?.message} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormDatePicker label="Start date (Optional)" {...register("startDate")} error={errors.startDate?.message} />
          <FormDatePicker label="End date (Optional)" {...register("endDate")} error={errors.endDate?.message} />
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Campaign Budget</h4>
          <p className="text-sm text-gray-500 mb-4">Create a budget for the campaign.</p>

          <div className="space-y-4">
            <FormRadioGroup
              label="Type"
              options={budgetTypeOptions}
              value={budgetType}
              onChange={(value) => setValue("budgetType", value)}
              name="budgetType"
            />

            <FormInput label="Limit" {...register("budgetLimit")} error={errors.budgetLimit?.message} />
          </div>
        </div>
      </form>
    </div>
  )
}
