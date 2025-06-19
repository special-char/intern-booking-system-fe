"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StepIndicator } from "./ui/StepIndicator"
import { BasicDetailsStep } from "./steps/BasicDetailsStep"
import { AddressContactStep } from "./steps/AddressContactStep"
import { OtherDetailsStep } from "./steps/OtherDetailsStep"
import { venueFormSchema, type VenueFormValues, type Venue } from "../types"

interface VenueFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: VenueFormValues) => void
  venue?: Venue
}

const stepLabels = ["Basic Details", "Address & Contact", "Other Details"]

const defaultValues: VenueFormValues = {
  name: "",
  categories: [],
  description: "",
  address: {
    street1: "",
    street2: "",
    city: "",
    pincode: "",
    state: "",
  },
  phoneNumbers: [],
  websiteLinks: [],
  photos: [],
  amenities: [],
  faqs: [],
}

export function VenueFormDialog({ open, onOpenChange, onSubmit, venue }: VenueFormDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: venue || defaultValues,
    mode: "onChange",
  })

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 3)))
  }

  const handleSubmit = (data: VenueFormValues) => {
    onSubmit(data)
    onOpenChange(false)
    setCurrentStep(1)
    methods.reset(defaultValues)
  }

  const handleClose = () => {
    onOpenChange(false)
    setCurrentStep(1)
    methods.reset(defaultValues)
  }

  const renderCurrentStep = () => {
    const stepProps = {
      onNext: nextStep,
      onPrevious: previousStep,
    }

    switch (currentStep) {
      case 1:
        return <BasicDetailsStep {...stepProps} />
      case 2:
        return <AddressContactStep {...stepProps} />
      case 3:
        return <OtherDetailsStep {...stepProps} onSubmit={methods.handleSubmit(handleSubmit)} />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 bg-gray-50 border-b">
          <DialogTitle className="text-3xl font-extrabold text-gray-900">
            {venue ? "Edit Venue" : "Add New Venue"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <div className="p-6 space-y-6">
            <StepIndicator currentStep={currentStep} totalSteps={3} stepLabels={stepLabels} onStepClick={goToStep} />
            {renderCurrentStep()}
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
