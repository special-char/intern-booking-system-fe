import TripChargeForm from "../components/form";

import { TripCharge } from "@/types/services/trip-charge";

interface TripChargeTemplateProps {
  tripCharge: TripCharge
}

export function TripChargeTemplate({ tripCharge }: TripChargeTemplateProps) {
  return (
    <TripChargeForm tripCharge={tripCharge} />
  );
}