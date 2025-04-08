import { Territory } from "@/types/territories/territory";
import { TechnicianGridTerritoryChip } from "./territory-chip";
import { TechnicianGridHeaderChip } from "../header/chip";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface TerritoryChipsProps extends PropsWithChildren {
  territories: Territory[]
  className?: string
  isLoading?: boolean
}

export function TerritoryChips({ territories, children, className, isLoading = false }: TerritoryChipsProps) {
  return (
    <div className={cn("flex w-full justify-center gap-1 flex-wrap items-start", className)}>
      {/* only for mock data */}
      {territories.length < 4 && !isLoading ? (
        territories.map((territory) => (
          <TechnicianGridTerritoryChip
            key={territory.id}
            territory={territory}
          />
        ))
      ) : (
        <TechnicianGridHeaderChip label="All zones" textClassName="text-text-success-primary" wrapperClassName="bg-green-100 border-green-100" />
      )}
      {children}
    </div>
  );
}