import { Skeleton } from "@/components/shadcn/skeleton";
import { Technician } from "@/types/technicians";
import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TerritoryChips } from "./common/territory-chips";
import { Button } from "@/components/shadcn/button";
import { TechnicianGridContentCell } from "./common/content-cell";

interface TechnicianGridTechnicianCellProps {
  isDefaultHover: boolean
  onDefaultHover: (technicianId: string) => void
  isLoading?: boolean
  technician: Partial<Technician>
  weeklyTerritories: TechnicianHoursOfOperationTerritory[]
}

export function TechnicianGridTechnicianCell({ isDefaultHover, isLoading = false, onDefaultHover, technician, weeklyTerritories }: TechnicianGridTechnicianCellProps) {
  return (
    <TechnicianGridContentCell isHighlighted={isDefaultHover} className="sticky left-0 z-10 min-h-46 p-3 py-6 group">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <p className="font-medium line-clamp-1 overflow-hidden text-ellipsis max-w-full">
          {technician.name}
        </p>
        {!!weeklyTerritories.length && <TerritoryChips className="px-0 justify-start" territories={weeklyTerritories} />}
        {isLoading && (
          <div className="flex flex-col gap-1.5">
            <Skeleton className="w-[80%] h-7 mb-0" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        )}
        {!isLoading && (
          <Button
            variant="outline"
            className="max-w-fit opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100"
            onMouseEnter={() => onDefaultHover(technician.id ?? "")}
            onMouseLeave={() => onDefaultHover("")}
            onFocus={() => onDefaultHover(technician.id ?? "")}
            onBlur={() => onDefaultHover("")}
          >
            Set as default
          </Button>
        )}
      </div>
    </TechnicianGridContentCell>
  );
}