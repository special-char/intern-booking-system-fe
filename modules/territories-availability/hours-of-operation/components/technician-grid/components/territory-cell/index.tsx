import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TechnicianGridContentCell } from "../common/content-cell";
import { ReactElement, useState } from "react";
import { cn } from "@/lib/utils";
import moment from "moment";
import { TechnicianTerritoryEmptyCellContent } from "./content/empty";
import { TechnicianTerritoryFilledCellContent } from "./content/filled";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import { filterTerritoriesByDate } from "@/modules/territories-availability/hours-of-operation/lib/utils";

interface TechnicianTerritoryCellProps {
  date: string;
  isDefaultHover: boolean;
  isLoading?: boolean;
  technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[];
  technician: Technician;
  dateRange: DateRange;
  territories: Territory[];
}

export function TechnicianTerritoryCell({
  date,
  isDefaultHover,
  isLoading = false,
  technicianAllWeekTerritories,
  technician,
  dateRange,
  territories,
}: TechnicianTerritoryCellProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSunday: boolean = moment(date).day() === 0;

  const technicianDateTerritories: TechnicianHoursOfOperationTerritory[] =
    filterTerritoriesByDate(technicianAllWeekTerritories, date);

  const isFilled: boolean = !!technicianDateTerritories?.length;

  function renderContent(): ReactElement | null {
    if (isSunday) {
      return null;
    }

    if (isFilled) {
      return (
        <TechnicianTerritoryFilledCellContent
          isLoading={isLoading}
          technician={technician}
          dateRange={dateRange}
          territories={territories}
          technicianAllWeekTerritories={technicianAllWeekTerritories}
          date={date}
        />
      );
    }

    return (
      <TechnicianTerritoryEmptyCellContent
        isLoading={isLoading}
        technician={technician}
        dateRange={dateRange}
        territories={territories}
        technicianAllWeekTerritories={technicianAllWeekTerritories}
      />
    );
  }

  return (
    <TechnicianGridContentCell
      isHighlighted={isDefaultHover}
      date={date}
      className="group"
      isLoading={isLoading}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center px-2 opacity-0 transition-all duration-300",
          isFilled && "opacity-100",
          isFocused && "bg-primary-50 opacity-100",
          !isSunday &&
            !isLoading &&
            "group-hover:opacity-100 group-hover:bg-primary-50"
        )}
      >
        {renderContent()}
      </div>
    </TechnicianGridContentCell>
  );
}
