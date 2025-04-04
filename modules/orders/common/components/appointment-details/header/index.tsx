import { useState } from "react";
import { AppointmentDetailsData } from "..";
import { AppointmentDetailsHeaderPreview } from "./preview";
import { AppointmentDetailsHeaderEdit } from "./edit";

interface AppointmentDetailsHeaderProps {
  data: AppointmentDetailsData
  onChange: (data: AppointmentDetailsData) => void
}

export function AppointmentDetailsHeader({ data, onChange }: AppointmentDetailsHeaderProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (!isEditMode) {
    return (
      <AppointmentDetailsHeaderPreview
        data={data}
        isEditMode={isEditMode}
        onEditModeChange={setIsEditMode}
      />
    )
  }

  return (
    <AppointmentDetailsHeaderEdit
      data={data}
      onExitEditMode={() => setIsEditMode(false)}
      onChange={(data: AppointmentDetailsData) => {
        onChange(data)
        setIsEditMode(false)
      }}
    />)
}
