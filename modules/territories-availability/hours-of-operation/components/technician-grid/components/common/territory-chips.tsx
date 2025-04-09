import { Territory } from "@/types/territories/territory";
import { TechnicianGridTerritoryChip } from "./territory-chip";
import { GridChip } from "./chip";
import { cn } from "@/lib/utils";

interface TerritoryChipsProps {
  territories: Territory[]
  className?: string
  maxVisibleChipsNum: number
  showNoZones?: boolean
}

export function TerritoryChips({ territories, className, showNoZones = false, maxVisibleChipsNum }: TerritoryChipsProps) {
  function renderChips() {
    if (showNoZones) {
      return <GridChip label="no zones" textClassName="text-secondary" wrapperClassName="bg-gray-50 border-gray-300" />
    }

    // condition valid only for mock data
    if (territories.length === 4) {
      return <GridChip label="All zones" textClassName="text-text-success-primary" wrapperClassName="bg-green-100 border-green-100" />
    }

    const visibleTerritories: Territory[] = territories.slice(0, maxVisibleChipsNum);
    const remainingTerritoriesNum: number = territories.length - visibleTerritories.length;

    return [
      visibleTerritories.map((territory) => (
        <TechnicianGridTerritoryChip
          key={territory.id}
          territory={territory}
        />
      )),
      remainingTerritoriesNum
        ? <GridChip
          key={remainingTerritoriesNum}
          label={`+${remainingTerritoriesNum}`}
          showIcon={false}
          textClassName="text-secondary"
          wrapperClassName="bg-gray-50 border-gray-300"
        />
        : null
    ]
  }


  return (
    <div className={cn("flex w-full justify-center gap-1 flex-wrap items-start", className)}>
      {renderChips()}
    </div>
  );
}