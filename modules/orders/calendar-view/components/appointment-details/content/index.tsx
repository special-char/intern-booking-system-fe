import { AppointmentDetailsData } from "..";
import { AppointmentCustomerInfo } from "./customer-info";
import { AppointmentDetailsInfo } from "./info";
import { AppointmentDetailsInvoice } from "./invoice";
import { AppointmentDetailsLocation } from "./location";
import { AppointmentDetailsNotes } from "./notes";
import { AppointmentDetailsVehicleDetail } from "./vehicle-detail";

interface AppointmentDetailsContentProps {
  data: AppointmentDetailsData
}

export function AppointmentDetailsContent({ data }: AppointmentDetailsContentProps) {
  return (
    <div className="flex flex-col">
      <AppointmentDetailsInfo id={data.event.id} createdAt={data.event.createdAt} />
      <AppointmentCustomerInfo customer={data.event.customer} />
      <AppointmentDetailsLocation location={data.event.location} />
      <AppointmentDetailsNotes notes={data.event.notes} />
      <AppointmentDetailsVehicleDetail vehicleDetail={data.event.vehicleDetail} />
      <AppointmentDetailsInvoice invoice={data.event.invoice} />
    </div>
  );
}
