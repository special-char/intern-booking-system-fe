import { cn } from "@/lib/utils";
import { Event } from "@/types/orders/event";

interface EventStatusIndicatorProps {
  className?: string
  status: Event["status"]
}

export function EventStatusIndicator({ status, className }: EventStatusIndicatorProps) {
  const color = {
    success: "bg-text-success-primary",
    failure: "bg-destructive",
    pending: "bg-gray-300"
  }[status]

  return (
    <div className={cn("rounded-full min-w-3 min-h-3 max-w-3 max-h-3 border-[1px] border-white", color, className)}></div>
  );
}