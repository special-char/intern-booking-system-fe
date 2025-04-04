import { AppointmentDetailsData } from "..";
import { WrenchIcon } from "lucide-react";
import { Skeleton } from "@/components/shadcn/skeleton";
import { AppointmentDetailsHeaderDropdown } from "./dropdown";
import { EventStatusIndicator } from "../common/status-indicator";
import { getFormattedDate, getFormattedHour } from "@/modules/orders/calendar-view/utils";


interface AppointmentDetailsHeaderPreviewProps {
  data: AppointmentDetailsData
  onEditModeChange: (isEditMode: boolean) => void
  isEditMode: boolean
}

export function AppointmentDetailsHeaderPreview({ data, isEditMode, onEditModeChange }: AppointmentDetailsHeaderPreviewProps) {
  const formattedDate: string = getFormattedDate(data.event.start)
  const formattedStartHour: string = getFormattedHour(data.event.start)
  const formattedEndHour: string = getFormattedHour(data.event.end)

  return (
    <div className="flex flex-col gap-4 mt-7">
      <div className="flex justify-between relative">
        <div className="flex gap-4 grow max-w-[calc(100%-2.25rem)]">
          <WrenchIcon className="mt-2 min-h-8 min-w-8 z-2 bg-purple-50" />
          <div className="flex flex-col">
            <p className="text-lg">{data.event.title}</p>
            <p className="text-sm text-secondary">{formattedDate} &bull; {formattedStartHour} - {formattedEndHour}</p>
          </div>
        </div>
        <div className="absolute left-4 top-3 w-0.5 h-full border-l-1 border-dashed border-teal-600"></div>

        {!isEditMode && <AppointmentDetailsHeaderDropdown onEdit={() => onEditModeChange(true)} />}
      </div>


      <div className="flex justify-between gap-4">
        <div className="flex gap-4 grow items-center">
          <Skeleton className="min-w-8 min-h-8 rounded-full" />
          <p className="text-lg">{data.technician.name}</p>
        </div>
        <EventStatusIndicator status={data.event.status} className="mt-1 mr-1" />
      </div>
    </div>
  );
}
