import { Skeleton } from "@/components/shadcn/skeleton";
import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TerritoryChips } from "./common/territory-chips";
import { Button } from "@/components/shadcn/button";
import { TechnicianGridContentCell } from "./common/content-cell";
import { Media, Technician } from "@/payload-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";

interface TechnicianGridTechnicianCellProps {
  isDefaultHover: boolean
  onDefaultHover: (technicianId: number) => void
  isLoading?: boolean
  technician: Technician
  weeklyTerritories: TechnicianHoursOfOperationTerritory[]
}

export function TechnicianGridTechnicianCell({ isDefaultHover, isLoading = false, onDefaultHover, technician, weeklyTerritories }: TechnicianGridTechnicianCellProps) {

  return (
    <TechnicianGridContentCell isHighlighted={isDefaultHover} className="sticky left-0 z-10 min-h-46 p-3 py-6 group">
      <div className="flex flex-col gap-3">
        {/* <Skeleton className="w-10 h-10 rounded-lg" /> */}
        <Avatar>
          <AvatarImage src={(technician?.profilePhoto as Media)?.url || ""} alt={(technician?.profilePhoto as Media)?.alt || ""} />
          <AvatarFallback>
            {technician.name?.charAt(0)?.toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
        <p className="font-medium line-clamp-1 overflow-hidden text-ellipsis max-w-full text-[15px]">
          {technician.name}
        </p>
        {!!weeklyTerritories.length && <TerritoryChips className="px-0 justify-start" territories={weeklyTerritories} maxVisibleChipsNum={1} />}
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
            onMouseEnter={() => onDefaultHover(technician.id ?? 0)}
            onMouseLeave={() => onDefaultHover(0)}
            onFocus={() => onDefaultHover(technician.id ?? 0)}
            onBlur={() => onDefaultHover(0)}
          >
            Set as default
          </Button>
        )}
      </div>
    </TechnicianGridContentCell>
  );
}