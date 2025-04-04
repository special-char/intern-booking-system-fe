import { VehicleDetail } from "@/types/orders/vehicle-detail";
import { AppointmentDetailsInfoWrapper } from "../../../content/common/info-wrapper";
import { CarDiagram } from "./car-diagram";
import { TruckIcon } from "lucide-react";

interface VehicleDetailsTireDetailsProps {
  data: Pick<VehicleDetail, 'tireDetails' | 'wheels'>
}

export function VehicleDetailsTireDetails({ data }: VehicleDetailsTireDetailsProps) {
  return (
    <AppointmentDetailsInfoWrapper className="pr-4">
      <div className="flex flex-col">
        <p className="text-sm text-secondary">TIRE DETAILS</p>
        <p>{`${data.tireDetails.size} ${data.tireDetails.brand} ${data.tireDetails.model}`}</p>
        <div className="flex mt-3 gap-4 items-center">
          <TruckIcon />
          <p className="text-sm">In van</p>
        </div>
      </div>
      <CarDiagram wheels={data.wheels} />
    </AppointmentDetailsInfoWrapper>
  );
}