import { AppointmentDetailsData } from "..";
import { AppointmentDetailsSheetContentWrapper } from "../sheets/common/content-wrapper";
import { AppointmentCustomerInfo } from "./customer-info";
import { AppointmentDetailsInfo } from "./info";
import { AppointmentDetailsInvoice } from "./invoice";
import { AppointmentDetailsLocation } from "./location";
import { AppointmentDetailsNotes } from "./notes";
import { AppointmentDetailsVehicleDetails } from "./vehicle-details";

interface AppointmentDetailsContentProps {
  data: AppointmentDetailsData
}

export function AppointmentDetailsContent({ data }: AppointmentDetailsContentProps) {
  return (
    <AppointmentDetailsSheetContentWrapper>
      <AppointmentDetailsInfo id={data.event.id} createdAt={data.event.createdAt} />
      <AppointmentCustomerInfo customer={data.event.customer} />
      <AppointmentDetailsLocation location={data.event.location} />
      <AppointmentDetailsNotes notes={data.event.notes} />
      <AppointmentDetailsVehicleDetails vehicleDetail={data.event.vehicleDetail} />
      <AppointmentDetailsInvoice invoice={data.event.invoice} />
    </AppointmentDetailsSheetContentWrapper>
  );
}
