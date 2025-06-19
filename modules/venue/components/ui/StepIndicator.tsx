"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  onStepClick?: (step: number) => void
}

export function StepIndicator({ currentStep, totalSteps, stepLabels, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isClickable = onStepClick && stepNumber <= currentStep

          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStepClick(stepNumber)}
                disabled={!isClickable}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  isCompleted && "border-indigo-600 bg-indigo-600 text-white",
                  isCurrent && "border-indigo-600 bg-background text-indigo-600",
                  !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background text-muted-foreground",
                  isClickable && "cursor-pointer hover:border-indigo-600/80",
                  !isClickable && "cursor-not-allowed",
                )}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : stepNumber}
              </button>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  isCurrent && "text-indigo-600",
                  !isCurrent && "text-muted-foreground",
                )}
              >
                {stepLabels[index]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
