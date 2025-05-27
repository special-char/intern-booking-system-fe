import { cn } from "@/lib/utils";
import { Territory } from "@/types/territories/territory";
import moment from "moment";
import { TechnicianGridContentCell } from "../common/content-cell";
import { TerritoryChips } from "../common/territory-chips";

interface TechnicianGridDateCellProps {
  date: string;
  isLoading?: boolean;
  territories?: Territory[];
  variant?: "HoursOfOperation";
}

export function TechnicianGridDateCell({
  date,
  isLoading = false,
  territories,
  variant = "HoursOfOperation",
}: TechnicianGridDateCellProps) {
  const day: string = moment(date).format("DD").toUpperCase();
  const dayLabel: string = moment(date).format("ddd").toUpperCase();
  const isToday: boolean = moment(date).isSame(moment(), "day");
  const isSunday: boolean = moment(date).day() === 0;

  return (
    <TechnicianGridContentCell
      isHighlighted={false}
      className={cn(
        "flex flex-col items-center text-sm gap-2 py-3 border-t-0 cursor-default",
        variant === "HoursOfOperation" && "border-none"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 font-medium items-center border-b w-full pb-2",
          variant === "HoursOfOperation" && "border-none"
        )}
      >
        <span>{dayLabel}</span>
        <span
          className={cn(
            "p-1.5 bg-primary-100 rounded-lg max-h-8",
            isToday && "bg-primary text-white"
          )}
        >
          {day}
        </span>
      </div>

      {territories && (
        <TerritoryChips
          territories={territories}
          className="px-3"
          maxVisibleChipsNum={2}
          showNoZones={isSunday || isLoading || !territories.length}
        />
      )}
    </TechnicianGridContentCell>
  );
}
