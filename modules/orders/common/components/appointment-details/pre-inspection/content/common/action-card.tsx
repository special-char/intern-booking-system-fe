import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { PropsWithChildren, ReactElement } from "react";
import { cn } from "@/lib/utils";
import { AppointmentDetailsInfoWrapper } from "../../../content/common/info-wrapper";
import { PreInspectionStatusIndicator } from "./status-indicator";
import { PreInspection, PreInspectionCheck, PreInspectionCheckStatus } from "@/types/orders/pre-inspection";
import { PreInspectionNotificationIndicator } from "./notification-indicator";
import { getPreInspectionTitle } from "@/modules/orders/calendar-view/utils";

export interface PreInspectionActionCardProps extends PropsWithChildren {
  data: PreInspection
  description?: string | ReactElement;
  onClick: () => void;
  checkType: keyof PreInspection
  status: PreInspectionCheckStatus
}

export function PreInspectionActionCard({ checkType, data, description, onClick, status, children }: PreInspectionActionCardProps) {
  function getNotificationsAmount() {
    const preinspectionCheck: PreInspectionCheck = data[checkType as keyof PreInspection] as PreInspectionCheck
    const remarksAmount: number = preinspectionCheck?.remarks?.length ?? 0
    const photosAmount: number = preinspectionCheck?.remarks?.reduce((acc, remark) => acc + (remark.photos?.length ?? 0), 0) ?? 0
    return { remarksAmount, photosAmount }
  }

  const { remarksAmount, photosAmount } = getNotificationsAmount()

  return (
    <AppointmentDetailsInfoWrapper className={cn(!description && "min-h-0")}>
      <div className="flex flex-col w-full">
        <div className="flex justify-between relative">
          <div className="flex gap-3 max-w-[calc(100%-7.25rem)]">
            <PreInspectionStatusIndicator status={status} />
            <p className="text-sm text-secondary">{getPreInspectionTitle(checkType)}</p>
          </div>
          <div className="flex items-center gap-1 absolute -right-2 -top-2">
            <PreInspectionNotificationIndicator amount={remarksAmount} type="remarks" />
            <PreInspectionNotificationIndicator amount={photosAmount} type="photos" />
            <Button variant="ghost" size="icon" onClick={onClick}>
              <ChevronRight />
            </Button>
          </div>
        </div>

        {description && (
          <div className="line-clamp-2 pl-6 pr-4">
            {description}
          </div>
        )}

        {children}
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}