import { AppointmentDetailsData } from "..";
import { WrenchIcon } from "lucide-react";
import { AppointmentDetailsForm } from "./form";
import { EventStatusIndicator } from "../common/status-indicator";

interface AppointmentDetailsHeaderEditProps {
  data: AppointmentDetailsData
  onExitEditMode: () => void
  onChange: (data: AppointmentDetailsData) => void
}

export function AppointmentDetailsHeaderEdit({ data, onExitEditMode, onChange }: AppointmentDetailsHeaderEditProps) {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <div className="flex justify-between gap-4">
        <div className="flex gap-4 grow">
          <WrenchIcon className="mt-2 min-h-8 min-w-8 z-2 bg-purple-50" />
          <p className="text-lg">{data.event.title}</p>
        </div>
        <EventStatusIndicator status={data.event.status} className="mr-1 mt-2" />
      </div>
      <AppointmentDetailsForm
        initialValues={data}
        onExitEditMode={onExitEditMode}
        onChange={onChange}
      />
    </div>
  );
}
