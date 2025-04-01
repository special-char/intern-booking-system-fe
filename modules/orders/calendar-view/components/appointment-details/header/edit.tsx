import { AppointmentDetailsData } from "..";
import { WrenchIcon } from "lucide-react";
import { AppointmentDetailsForm } from "./form";

interface AppointmentDetailsHeaderEditProps {
  data: AppointmentDetailsData
  onExitEditMode: () => void
  onChange: (data: AppointmentDetailsData) => void
}

export function AppointmentDetailsHeaderEdit({ data, onExitEditMode, onChange }: AppointmentDetailsHeaderEditProps) {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <div className="flex justify-between">
        {/* TODO: adjust width to fit the status badge */}
        <div className="flex gap-4 grow max-w-[calc(100%-80px)]">
          <WrenchIcon className="min-h-8 min-w-8 z-2 bg-purple-50" />
          <p className="text-lg">{data.event.title}</p>
        </div>
      </div>
      <AppointmentDetailsForm
        initialValues={data}
        onExitEditMode={onExitEditMode}
        onChange={onChange}
      />
    </div>
  );
}
