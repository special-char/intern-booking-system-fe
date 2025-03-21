"use client"

import { RefObject, useRef } from "react"
import { OnBlurInput, OnBlurInputRefInterface } from "../on-blur-input"
import { secondsToTimeString, timeStringToSeconds } from "@/utils/time";
import { cn } from "@/lib/utils";

interface TimeInputProps {
  className?: string
  min: number,
  max: number,
  onChange: (seconds: number) => void
  value: number
}

export function TimeInput({ className, min, max, onChange, value }: TimeInputProps) {
  const timeString: string = secondsToTimeString(value);
  const inputRef: RefObject<OnBlurInputRefInterface | null> = useRef<OnBlurInputRefInterface>(null)

  function handleInputChange(time: string): void {
    let seconds: number = timeStringToSeconds(time);
    if (seconds < min) {
      seconds = min;
    }
    if (seconds > max) {
      seconds = max;
    }
    onChange(seconds);
    // always sync input local value with validated time
    inputRef.current?.updateLocalValue(secondsToTimeString(seconds));
  }

  return (
    <div className={cn("[&::-webkit-calendar-picker-indicator]:text-text-secondary", className)}>
      <OnBlurInput
        type="time"
        onBlurChange={(e) => handleInputChange(e.target.value)}
        ref={inputRef}
        value={timeString}
      />
    </div>
  )
}