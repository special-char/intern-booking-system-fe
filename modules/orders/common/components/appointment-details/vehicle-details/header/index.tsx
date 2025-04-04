import { CarFront, WrenchIcon } from "lucide-react";
import { VehicleDetailsData } from "../../sheets/vehicle-details";
import { Skeleton } from "@/components/shadcn/skeleton";
import { EventStatusIndicator } from "../../common/status-indicator";

export function VehicleDetailsHeader({ data }: VehicleDetailsData) {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <div className="flex justify-between relative">
        <div className="flex gap-4 grow max-w-[calc(100%-9rem)]">
          <CarFront className="mt-1.5 h-8 min-w-8 z-2 bg-purple-50" />
          <div className="flex flex-col">
            <p className="text-lg">{data.vehicleDetail.year} {data.vehicleDetail.name}</p>
            <p className="text-sm text-secondary">Vehicle # {data.vehicleDetail.numberPlate}</p>

          </div>
        </div>
        <div className="absolute left-4 top-3 w-0.5 h-[calc(100%+0.8rem)] border-l-1 border-dashed border-teal-600"></div>
        <Skeleton className="w-33 h-25" />
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex gap-4 grow">
          <WrenchIcon className="mt-3 min-h-8 min-w-8" />
          <div className="flex flex-col">
            <p className="text-lg">{data.title}</p>
            <p className="text-sm text-secondary">{data.subTitle}</p>
          </div>
        </div>
        <EventStatusIndicator status={data.status} className="mr-1 mt-1" />

      </div>
    </div>
  );
}
