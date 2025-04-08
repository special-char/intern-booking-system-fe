import { cn } from "@/lib/utils";
import { Event } from "@/types/orders/event";
import { OrderStatusEnum } from "@/types/orders/order";

interface EventStatusIndicatorProps {
  className?: string;
  status: Event["status"];
}

export function EventStatusIndicator({
  status,
  className,
}: EventStatusIndicatorProps) {
  function getColor(status: Event["status"]) {
    switch (status) {
      case OrderStatusEnum.Completed:
        return "bg-green-100 text-green-700";
      case OrderStatusEnum.Failed:
        return "bg-red-100 text-red-700";
      case OrderStatusEnum.OnHold:
        return "bg-purple-100 text-purple-600";
      case OrderStatusEnum.Refunded:
        return "bg-blue-100 text-blue-600";
      case OrderStatusEnum.Cancelled:
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-300";
    }
  }

  return (
    <div
      className={cn(
        "text-xs px-[10px] h-5 rounded-full flex items-center justify-center bg-purple-500",
        getColor(status),
        className
      )}
    >
      {status}
    </div>
  );
}
