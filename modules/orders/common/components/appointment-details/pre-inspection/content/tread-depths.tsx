import { ReactElement } from "react";
import { PreInspectionActionCard } from "./common/action-card";
import { PreInspection, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";
import moment from "moment";

interface PreInspectionTreadDepthsCheckProps {
  data: PreInspection
  onClick: (checkType: string) => void
  status: PreInspectionCheckStatus
}

export function PreInspectionTreadDepthsCheck({ data, onClick, status }: PreInspectionTreadDepthsCheckProps) {
  function renderDescription(): ReactElement | undefined {
    const lastScan: string | undefined = data.treadDepths.lastScan
    if (!lastScan) {
      return
    }
    return (
      <p>
        Last scan: {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(moment(lastScan).toDate())}
      </p>
    )
  }
  return (
    <PreInspectionActionCard
      checkType="treadDepths"
      data={data}
      description={renderDescription()}
      onClick={() => onClick("treadDepths")}
      status={status}
    />
  );
}