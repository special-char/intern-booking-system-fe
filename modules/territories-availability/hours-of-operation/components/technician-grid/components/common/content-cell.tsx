import { cn } from "@/lib/utils";
import moment from "moment";
import { PropsWithChildren } from "react";

interface TechnicianGridContentCellProps extends PropsWithChildren {
  className?: string
  date?: string
  isHighlighted: boolean
  isLoading?: boolean
}

export function TechnicianGridContentCell({ date, className, children, isHighlighted, isLoading = false }: TechnicianGridContentCellProps) {
  const isTechnicianCell: boolean = !date;
  const isSunday: boolean = !isTechnicianCell && moment(date).day() === 0

  return (
    <div className={
      cn(
        "border-t border-r transition-colors duration-300",
        isSunday ? "bg-gray-100 border-t-0" : "bg-white",
        isHighlighted && !isSunday && "bg-primary-50",
        !isSunday && !isLoading && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}