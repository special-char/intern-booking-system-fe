import { PreInspectionActionCard } from "./common/action-card";
import { PreInspection, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";

interface PreInspectionDamageCheck {
  data: PreInspection
  onClick: (checkType: string) => void
  status: PreInspectionCheckStatus
}

export function PreInspectionDamageCheck({ data, onClick, status }: PreInspectionDamageCheck) {
  return (
    <PreInspectionActionCard
      checkType="damage"
      data={data}
      description={<p>Scratches, dents, etc</p>}
      onClick={() => onClick("damage")}
      status={status}
    />
  );
}