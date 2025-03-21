"use client"

import { getTimeMarkers } from "@/utils/time"
import { TimeMarker, TimeMarkers } from "./time-markers"
import DebouncedSlider from "../debounced-slider"

export interface TimeSliderProps {
  disabled?: boolean
  isLoading?: boolean
  markersClassname?: string
  maxSeconds?: number
  minSeconds?: number
  onChange?: (time: number) => void
  onChangeDebounce?: number
  step?: number
  markerEverySecond?: number
  value: number
}

export function TimeSlider({
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
}: TimeSliderProps) {
  function handleChange(value: number[]): void {
    onChange?.(value[0])
  }

  const markers: TimeMarker[] | undefined = markerEverySecond ? getTimeMarkers({ minSeconds, maxSeconds, step: markerEverySecond }) : undefined

  return (
    <>
      <DebouncedSlider
        disabled={disabled}
        max={maxSeconds}
        min={minSeconds}
        onChange={handleChange}
        step={step}
        value={[value]}
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

