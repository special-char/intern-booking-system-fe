import { PreInspection, PreInspectionCheck } from "@/types/orders/pre-inspection";
import { AppointmentDetailsSheetContentWrapper } from "../../sheets/common/content-wrapper";
import { PreInspectionDamageCheck } from "./damage-check";
import { PreInspectionTireSizingCheck } from "./tire-sizing";
import { PreInspectionWheelLocksCheck } from "./wheel-locks";
import { PreInspectionOdometerCheck } from "./odometer";
import { PreInspectionTreadDepthsCheck } from "./tread-depths";

interface PreInspectionCheckContentProps {
  data: PreInspection
  onClick: (checkType: string) => void
  onPreInspectionCheckDataChange: (preInspectionCheckData: PreInspectionCheck, type?: keyof PreInspection) => void
}

export function PreInspectionContent({ data, onClick, onPreInspectionCheckDataChange }: PreInspectionCheckContentProps) {
  return (
    <AppointmentDetailsSheetContentWrapper>
      <PreInspectionDamageCheck
        data={data}
        onClick={onClick}
        status={data.damage.status}
      />
      <PreInspectionTireSizingCheck
        data={data}
        onClick={onClick}
        status={data.tireSizing.status}
      />
      <PreInspectionWheelLocksCheck
        data={data}
        onClick={onClick}
        status={data.wheelLocks.status}
      />
      <PreInspectionOdometerCheck
        data={data}
        onClick={onClick}
        status={data.odometer.status}
        onPreInspectionCheckDataChange={onPreInspectionCheckDataChange}
      />
      <PreInspectionTreadDepthsCheck
        data={data}
        onClick={onClick}
        status={data.treadDepths.status}
      />
    </AppointmentDetailsSheetContentWrapper>
  );
}