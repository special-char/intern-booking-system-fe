import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { TechnicianGridTerritoryWithHoursChip } from "./territory-chip";
import { Button } from "@/components/shadcn/button";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent } from "@/components/shadcn/sheet";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import { HoursOfOperationPanel } from "../../../../hours-of-operation-panel";
import useToggleState from "@/hooks/use-toggle-state";
import moment from "moment";
import { filterTerritoriesByDate } from "@/modules/territories-availability/hours-of-operation/lib/utils";

interface TechnicianTerritoryFilledCellContentProps {
  isLoading?: boolean;
  technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[];
  technician: Technician;
  dateRange: DateRange;
  territories: Territory[];
  date: string;
}

export function TechnicianTerritoryFilledCellContent({
  isLoading = false,
  technicianAllWeekTerritories,
  technician,
  dateRange,
  territories,
  date,
}: TechnicianTerritoryFilledCellContentProps) {
  const [isOpen, openSheet, closeSheet] = useToggleState(false);
  const technicianDateTerritories = filterTerritoriesByDate(
    technicianAllWeekTerritories,
    date
  );

  const fixedTerritories = technicianDateTerritories.map((t) => ({
    ...t,
    from: t.from.replace(/T(\d):/, "T0$1:"),
    to: t.to.replace(/T(\d):/, "T0$1:"),
  }));

  const sortedTerritories = fixedTerritories.sort((a, b) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime();
  });

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openSheet() : closeSheet())}
    >
      <div className={cn("w-full h-full gap-1 flex py-2")}>
        <div className="flex flex-col w-full relative gap-1">
          {sortedTerritories.map((territory) => (
            <TechnicianGridTerritoryWithHoursChip
              className="grow"
              key={`${territory.id}-${territory.from}-${territory.to}`}
              territory={territory}
            />
          ))}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="bg-white h-8 w-8 p-0 absolute top-2 right-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-3"
              disabled={isLoading}
            >
              <PencilIcon />
            </Button>
          </SheetTrigger>
        </div>
      </div>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[80vw] lg:max-w-[70vw] bg-background"
      >
        <HoursOfOperationPanel
          isLoading={isLoading}
          technician={technician}
          dateRange={dateRange}
          territories={territories}
          onClose={closeSheet}
          technicianAllWeekTerritories={technicianAllWeekTerritories}
        />
      </SheetContent>
    </Sheet>
  );
}
