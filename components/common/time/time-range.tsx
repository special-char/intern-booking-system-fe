"use client"

import { getTimeMarkers } from "@/utils/time"
import { TimeMarker, TimeMarkers } from "./time-markers"
import DebouncedRange from "../debounced-range"
import { TimeSliderProps } from "./time-slider"

interface TimeRangeProps extends Omit<TimeSliderProps, "value" | "onChange"> {
  onChange?: (time: [number, number]) => void
  value: [number, number]
}

export function TimeRange({
  disabled,
  isLoading,
  markersClassname,
  maxSeconds = 86360, // 11:59PM
  minSeconds = 0,
  onChange,
  onChangeDebounce,
  step = 60, // 1min
  markerEverySecond,
  value,
}: TimeRangeProps) {
  function handleChange(value: [number, number]): void {
    onChange?.(value)
  }

  const markers: TimeMarker[] | undefined = markerEverySecond ? getTimeMarkers({ minSeconds, maxSeconds, step: markerEverySecond }) : undefined

  return (
    <>
      <DebouncedRange
        disabled={disabled}
        max={maxSeconds}
        min={minSeconds}
        onChange={handleChange}
        step={step}
        value={value}
        wait={onChangeDebounce ?? "none"}
      />
      {markers && (
        <TimeMarkers
          className={markersClassname}
          isLoading={isLoading}
          markers={markers}
          maxSeconds={maxSeconds}
          minSeconds={minSeconds}
        />
      )}
    </>
  )
}

