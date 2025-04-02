import { AppointmentDetailsNotes } from "../../content/notes";
import { AppointmentDetailsSheetContentWrapper } from "../../sheets/common/content-wrapper";
import { VehicleDetailsData } from "../../sheets/vehicle-details";
import { VehicleDetailsPreInspectionCheckDetails } from "./pre-inspection-check-details";
import { VehicleDetailsSignOff } from "./sign-off";
import { VehicleDetailsTasks } from "./tasks";
import { VehicleDetailsTireDetails } from "./tire-details";

export function VehicleDetailsContent({ data }: VehicleDetailsData) {
  return (
    <AppointmentDetailsSheetContentWrapper>
      <VehicleDetailsTireDetails
        data={{
          tireDetails: data.vehicleDetail.tireDetails,
          wheels: data.vehicleDetail.wheels
        }}
      />
      <AppointmentDetailsNotes notes={data.notes} />
      <VehicleDetailsPreInspectionCheckDetails />
      <VehicleDetailsTasks />
      <VehicleDetailsSignOff />
    </AppointmentDetailsSheetContentWrapper>
  );
}