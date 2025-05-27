import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TerritoryChipWrapper } from "../../common/territory-chip-wrapper";
import { getFormattedHour } from "@/modules/orders/calendar-view/utils";
import { cn } from "@/lib/utils";

interface TechnicianGridTerritoryWithHoursChipProps {
  className?: string;
  territory: TechnicianHoursOfOperationTerritory;
}

export function TechnicianGridTerritoryWithHoursChip({
  territory,
  className,
}: TechnicianGridTerritoryWithHoursChipProps) {
  const color: string = territory.color;

  return (
    <TerritoryChipWrapper color={color} className={cn("px-2 py-3", className)}>
      <div className="flex flex-col gap-1 text-xs">
        <span className="text-[0.6875rem] font-semibold line-clamp-1 overflow-hidden text-ellipsis">
          {territory.name.charAt(0).toUpperCase() + territory.name.slice(1)}
        </span>
        <span className="text-[0.625rem]">
          {getFormattedHour(territory.from)} - {getFormattedHour(territory.to)}
        </span>
      </div>
    </TerritoryChipWrapper>
  );
}
