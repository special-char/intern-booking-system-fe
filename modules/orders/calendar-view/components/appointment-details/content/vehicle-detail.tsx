import { Event } from "@/types/orders/event";
import { ActionCard } from "./common/action-card";

interface AppointmentDetailsVehicleDetailProps {
  vehicleDetail: Event['vehicleDetail']
}

export function AppointmentDetailsVehicleDetail({ vehicleDetail }: AppointmentDetailsVehicleDetailProps) {
  return (
    <ActionCard
      title="VEHICLE DETAIL"
      description={<p>{`${vehicleDetail.year} ${vehicleDetail.name}`}</p>}
    />
  );
}