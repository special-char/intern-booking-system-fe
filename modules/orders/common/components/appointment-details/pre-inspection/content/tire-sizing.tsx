import { PreInspectionActionCard } from "./common/action-card";
import { PreInspection, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";

interface PreInspectionTireSizingCheckProps {
  data: PreInspection
  onClick: (checkType: string) => void
  status: PreInspectionCheckStatus
}

export function PreInspectionTireSizingCheck({ data, onClick, status }: PreInspectionTireSizingCheckProps) {
  return (
    <PreInspectionActionCard
      checkType="tireSizing"
      data={data}
      onClick={() => onClick("tireSizing")}
      status={status}
    />
  );
}