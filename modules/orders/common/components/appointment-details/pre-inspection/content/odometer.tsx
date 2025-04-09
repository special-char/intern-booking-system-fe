import { ReactElement, useMemo, useState } from "react";
import { PreInspectionActionCard } from "./common/action-card";
import { PreInspection, PreInspectionCheck, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";
import { Input } from "@/components/shadcn/input";
import { ImageIcon, QrCodeIcon } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { getLocalDateString } from "@/utils/date";
import moment from "moment";


interface PreInspectionOdometerCheckProps {
  data: PreInspection
  onClick: (checkType: string) => void
  status: PreInspectionCheckStatus
  onPreInspectionCheckDataChange: (preInspectionCheckData: PreInspectionCheck, type?: keyof PreInspection) => void
}

export function PreInspectionOdometerCheck({ data, onClick, status, onPreInspectionCheckDataChange }: PreInspectionOdometerCheckProps) {
  const [odometerValue, setOdometerValue] = useState<number | string>(data.odometer.odometerValue || "")
  const prevLastScan: string | undefined = useMemo(() => data.odometer.lastScan, [])

  function renderDescription(): ReactElement | undefined {
    const lastScan: string | undefined = data.odometer.lastScan
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
      checkType="odometer"
      data={data}
      description={renderDescription()}
      onClick={() => onClick("odometer")}
      status={status}
    >
      <div className="flex flex-col pl-5.5 mt-2 -mr-1">
        <span className="text-xs text-secondary">Odometer</span>
        <div className="flex flex-row gap-2 items-center mt-1">
          <Input
            wrapperClassName="grow"
            type="number"
            value={odometerValue}
            placeholder="Enter manually or scan"
            onChange={(e) => {
              const newValue: number = Number(e.target.value)
              setOdometerValue(newValue)
            }}
            onBlur={() => {
              const value: number | null = Number(odometerValue) || null
              onPreInspectionCheckDataChange({ ...data.odometer, odometerValue: value, lastScan: value === null ? prevLastScan : getLocalDateString() }, "odometer")
              if (value === null) {
                setOdometerValue("")
              }
            }}
          />
          <div className="flex gap-1">
            <Button type="button" variant="ghost" size="icon">
              <QrCodeIcon />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <ImageIcon />
            </Button>
          </div>
        </div>
      </div>
    </PreInspectionActionCard>
  );
}