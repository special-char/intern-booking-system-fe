import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TechnicianGridTerritoryWithHoursChip } from "./territory-chip";
import { Button } from "@/components/shadcn/button";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";

interface TechnicianTerritoryFilledCellContentProps {
  isLoading?: boolean
  onButtonFocus: (isFocused: boolean) => void
  onClick: () => void
  territories: TechnicianHoursOfOperationTerritory[]
}

export function TechnicianTerritoryFilledCellContent({ isLoading = false, onButtonFocus, onClick, territories }: TechnicianTerritoryFilledCellContentProps) {
  return (
    <div className={cn(
      "w-full h-full gap-1 flex items-center py-2",
    )}>
      <div className="flex flex-col w-full relative gap-1 min-h-[70%]">
        {territories.sort((a, b) => moment(a.from).isBefore(moment(b.from)) ? -1 : 1).map((territory) => (
          <TechnicianGridTerritoryWithHoursChip
            className={territories.length === 1 ? "min-h-20" : undefined}
            key={`${territory.id}-${territory.from}-${territory.to}`}
            territory={territory}
          />
        ))}
        <Button
          variant="ghost"
          className="bg-white h-8 w-8 p-0 absolute -top-4 right-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-3"
          onFocus={() => onButtonFocus(true)}
          onBlur={() => onButtonFocus(false)}
          onClick={onClick}
          disabled={isLoading}
        >
          <PencilIcon />
        </Button>
      </div>
    </div>
  );
}

