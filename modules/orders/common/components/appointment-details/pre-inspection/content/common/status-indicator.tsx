import { cn } from "@/lib/utils";
import { PreInspectionCheckStatus } from "@/types/orders/pre-inspection";

interface PreInspectionStatusIndicatorProps {
  className?: string
  status: PreInspectionCheckStatus
}

export function PreInspectionStatusIndicator({ status, className }: PreInspectionStatusIndicatorProps) {
  const color = {
    done: "bg-text-success-primary",
    notDone: "bg-destructive",
    pending: "bg-gray-300"
  }[status]

  return (
    <div className={cn("mt-1 rounded-full min-w-3 min-h-3 max-w-3 max-h-3 border-[1px] border-white", color, className)}></div>
  );
}