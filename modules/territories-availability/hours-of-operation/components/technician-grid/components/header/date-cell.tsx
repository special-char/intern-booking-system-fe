import { cn } from "@/lib/utils";
import { Territory } from "@/types/territories/territory";
import moment from "moment";
import { TechnicianGridHeaderChip } from "./chip";
import { TerritoryChips } from "../common/territory-chips";
import { TechnicianGridContentCell } from "../common/content-cell";

interface TechnicianGridDateCellProps {
  date: string,
  isLoading?: boolean
  territories: Territory[]
}

export function TechnicianGridDateCell({ date, isLoading = false, territories }: TechnicianGridDateCellProps) {
  const day: string = moment(date).format("DD").toUpperCase();
  const dayLabel: string = moment(date).format("ddd").toUpperCase();
  const isToday: boolean = moment(date).isSame(moment(), "day");
  const isSunday: boolean = moment(date).day() === 0;

  return (
    <TechnicianGridContentCell
      isHighlighted={false}
      className="flex flex-col items-center justify-center text-sm gap-2 py-6 border-t-0 cursor-default"
    >
      <div className="flex gap-3 font-medium items-center">
        <span>{dayLabel}</span>
        <span className={cn("p-1.5 bg-primary-100 rounded-lg max-h-8", isToday && "bg-transparent border border-dashed border-black")}>
          {day}
        </span>
      </div>

      <TerritoryChips
        territories={territories}
        className="px-3"
        isLoading={isLoading && !isSunday}
      >
        {isSunday && (
          <TechnicianGridHeaderChip
            label="no zones"
            textClassName="text-secondary"
            wrapperClassName="bg-gray-50 border-gray-100"
          />
        )}
      </TerritoryChips>
    </TechnicianGridContentCell>
  );
}