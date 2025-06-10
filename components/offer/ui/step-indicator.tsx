"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  completed?: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className={cn("flex items-center space-x-4 mb-8", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentIndex
        const isCurrent = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  isCompleted
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isCurrent
                      ? "border-blue-500 text-blue-500 bg-transparent"
                      : "border-gray-600 text-gray-400 bg-transparent",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm font-medium">{index + 1}</span>}
              </div>
              <span className={cn("ml-2 text-sm font-medium", isCurrent ? "text-blue-400" : "text-gray-400")}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && <div className="w-8 h-px bg-gray-600 ml-4" />}
          </div>
        )
      })}
    </div>
  )
}
