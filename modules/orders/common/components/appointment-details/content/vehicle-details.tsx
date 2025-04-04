import { Event } from "@/types/orders/event";
import { ActionCard } from "./common/action-card";
import { useScreenCarousel } from "@/components/common/screen-carousel/context";

interface AppointmentDetailsVehicleDetailsProps {
  vehicleDetail: Event['vehicleDetail']
}

export function AppointmentDetailsVehicleDetails({ vehicleDetail }: AppointmentDetailsVehicleDetailsProps) {
  const { onCurrentScreenChange } = useScreenCarousel()

  return (
    <ActionCard
      title="VEHICLE DETAILS"
      description={<p>{`${vehicleDetail.year} ${vehicleDetail.name}`}</p>}
      onClick={() => onCurrentScreenChange(1)}
    />
  );
}