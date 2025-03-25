"use client"

import { Range } from "@/components/shadcn/slider";
import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { cn } from "@/lib/utils";
import { SliderProps } from "@radix-ui/react-slider";

interface DebouncedRangeProps extends Omit<SliderProps, "value" | "onChange"> {
  onChange: (value: [number, number]) => void;
  value: [number, number];
  wait: number | "none"
}

export default function DebouncedRange({
  className,
  disabled,
  wait,
  min,
  max,
  step,
  onChange,
  value,
}: DebouncedRangeProps) {
  const { localValue, onChange: handleChange } = useDebouncedInput<[number, number]>({
    initialValue: value,
    wait: wait === "none" ? 0 : wait,
    onChange
  })

  return (
    <Range
      className={cn("cursor-pointer", className)}
      disabled={disabled}
      max={max}
      min={min}
      onValueChange={handleChange}
      step={step}
      value={localValue}
    />
  );
}