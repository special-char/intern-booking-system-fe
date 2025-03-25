"use client"

import { Slider } from "@/components/shadcn/slider";
import { useDebouncedInput } from "@/hooks/use-debounced-input";
import { cn } from "@/lib/utils";
import { SliderProps } from "@radix-ui/react-slider";

interface DebouncedSliderProps extends Omit<SliderProps, "value" | "onChange"> {
  onChange: (value: number[]) => void;
  value: number[];
  wait: number | "none";
}

export default function DebouncedSlider({
  className,
  disabled,
  wait,
  min,
  max,
  step,
  onChange,
  value,
}: DebouncedSliderProps) {
  const { localValue, onChange: handleChange } = useDebouncedInput<number[]>({
    initialValue: value,
    wait: wait === "none" ? 0 : wait,
    onChange
  })

  return (
    <Slider
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