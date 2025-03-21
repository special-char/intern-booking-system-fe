"use client"

import { Input, type InputProps } from "@/components/shadcn/input"
import { type ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react"

export interface OnBlurInputRefInterface {
  updateLocalValue: (value: InputProps['value']) => void
}

interface OnBlurInputProps extends InputProps {
  onBlurChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const OnBlurInput = forwardRef<OnBlurInputRefInterface, OnBlurInputProps>(({ onBlurChange, ...props }, ref) => {
  const [localValue, setLocalValue] = useState(props.value)

  useEffect(() => {
    setLocalValue(props.value)
  }, [props.value])

  useImperativeHandle(ref, () => ({
    updateLocalValue: (value: InputProps['value']) => {
      setLocalValue(value)
    },
  }))

  return (
    <Input
      {...props}
      onBlur={onBlurChange}
      onChange={(e) => setLocalValue(e.target.value)}
      value={localValue}
    />
  )
})

OnBlurInput.displayName = "OnBlurInput"