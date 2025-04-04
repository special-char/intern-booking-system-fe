import { PreInspectionActionCard } from "./common/action-card";
import { PreInspection, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";

interface PreInspectionWheelLocksCheckProps {
  data: PreInspection
  onClick: (checkType: string) => void
  status: PreInspectionCheckStatus
}

export function PreInspectionWheelLocksCheck({ data, onClick, status }: PreInspectionWheelLocksCheckProps) {
  return (
    <PreInspectionActionCard
      checkType="wheelLocks"
      data={data}
      description={<p>Antitheft lugs/sockets</p>}
      onClick={() => onClick("wheelLocks")}
      status={status}
    />
  );
}