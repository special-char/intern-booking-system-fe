import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TechnicianGridContentCell } from "../common/content-cell";
import { ReactElement, useState } from "react";
import { cn } from "@/lib/utils";
import moment from "moment";
import { TechnicianTerritoryEmptyCellContent } from "./content/empty";
import { TechnicianTerritoryFilledCellContent } from "./content/filled";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";

interface TechnicianTerritoryCellProps {
  date: string;
  isDefaultHover: boolean;
  isLoading?: boolean;
  territories: TechnicianHoursOfOperationTerritory[];
  technician: Technician;
  dateRange: DateRange;
  territoriesData: Territory[];
}

export function TechnicianTerritoryCell({
  date,
  isDefaultHover,
  isLoading = false,
  territories,
  technician,
  dateRange,
  territoriesData,
}: TechnicianTerritoryCellProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSunday: boolean = moment(date).day() === 0;

  const technicianDateTerritories: TechnicianHoursOfOperationTerritory[] =
    territories.filter((territory) => {
      return moment(territory.from).isSame(moment(date), "day");
    });

  const isFilled: boolean = !!technicianDateTerritories.length;

  function renderContent(): ReactElement | null {
    if (isSunday) {
      return null;
    }

    if (isFilled) {
      return (
        <TechnicianTerritoryFilledCellContent
          isLoading={isLoading}
          onButtonFocus={setIsFocused}
          territories={technicianDateTerritories}
        />
      );
    }

    return (
      <TechnicianTerritoryEmptyCellContent
        isLoading={isLoading}
        onButtonFocus={setIsFocused}
        technician={technician}
        dateRange={dateRange}
        date={date}
        territoriesData={territoriesData}
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
