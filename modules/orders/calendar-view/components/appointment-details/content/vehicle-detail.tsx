import { Event } from "@/types/orders/event";
import { ActionCard } from "./common/action-card";
import { useScreenCarousel } from "@/components/common/screen-carousel/context";

interface AppointmentDetailsVehicleDetailProps {
  vehicleDetail: Event['vehicleDetail']
}

export function AppointmentDetailsVehicleDetail({ vehicleDetail }: AppointmentDetailsVehicleDetailProps) {
  const { onCurrentScreenChange } = useScreenCarousel()

  return (
    <ActionCard
      title="VEHICLE DETAIL"
      description={<p>{`${vehicleDetail.year} ${vehicleDetail.name}`}</p>}
      onClick={() => onCurrentScreenChange(1)}
    />
  );
}