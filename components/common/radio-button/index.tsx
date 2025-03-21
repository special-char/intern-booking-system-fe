"use client"

import { Label } from "@/components/shadcn/label"
import { RadioGroupItem, RadioGroupItemProps } from "@/components/shadcn/radio-group"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RadioButtonProps {
  id: string
  label: string | ReactNode
  value: string
  variant?: "primary" | "default"
}

export function RadioButton({ id, label, value, variant = "default" }: RadioButtonProps) {
  const radioGroupItemVariant = {
    default: "default",
    primary: "blackFill",
  }[variant]

  return (
    <div
      className={cn(
        "radio-container flex items-center space-x-2 w-max cursor-pointer",
        variant === "primary" && "rounded-lg border border-secondary-border px-3 py-3",
      )}
      data-variant={variant}
    >
      <RadioGroupItem value={value} id={id} variant={radioGroupItemVariant as RadioGroupItemProps["variant"]} />
      <Label htmlFor={id} className="cursor-pointer select-none">
        {label}
      </Label>

      {/* dirty, but the other ways of styling failed */}
      <style jsx>{`
        .radio-container[data-variant="primary"]:has([data-state="checked"]) {
          border-color: var(--primary);
        }
      `}</style>
    </div>
  )
}

