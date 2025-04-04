import { WrenchIcon } from "lucide-react";
import { VehicleDetailsData } from "../../sheets/vehicle-details";

export function PreInspectionHeader({ data }: VehicleDetailsData) {
  return (
    <div className="flex gap-4 mt-7">
      <WrenchIcon className="mt-3 min-h-8 min-w-8" />
      <div className="flex flex-col">
        <p className="text-lg">Pre inspection check</p>
        <p className="text-sm text-secondary">{data.vehicleDetail.year} &bull; {data.vehicleDetail.name}</p>
      </div>
    </div>
  );
}