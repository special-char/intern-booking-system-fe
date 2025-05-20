import { TripChargeTemplate } from "@/modules/service-pricing/trip-charge/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Trip Charge",
  description: "Treadcommand | Trip Charge",
};

export default async function TripChargePage() {
  // const tripCharge: TripCharge | null = await getTripCharge();

  // if (!tripCharge) {
  //   return <div>No trip charge found</div>;
  // }

  return <TripChargeTemplate />;
}
