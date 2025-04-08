import { Territory } from "@/types/territories/territory";
import { TerritoryChipWrapper } from "./territory-chip-wrapper";

interface TechnicianGridTerritoryChipProps {
  territory: Territory
}

export function TechnicianGridTerritoryChip({ territory }: TechnicianGridTerritoryChipProps) {
  const color: string = territory.color

  return (
    <TerritoryChipWrapper color={color}>
      <div className="flex items-center gap-1">
        <div className="rounded-full min-w-1 min-h-1 max-w-1 max-h-1" style={{ backgroundColor: color }}></div>
        <span className="text-[0.5625rem]">{territory.name}</span>
      </div>
    </TerritoryChipWrapper>
  );
}