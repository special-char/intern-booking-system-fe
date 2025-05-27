"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/shadcn/sheet";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import { HoursOfOperationPanel } from "../../../../hours-of-operation-panel";
import { useState } from "react";
import useToggleState from "@/hooks/use-toggle-state";

import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import moment from "moment";
interface TechnicianTerritoryEmptyCellContentProps {
  isLoading?: boolean;
  technician: Technician;
  dateRange: DateRange;
  territories: Territory[];
  technicianAllWeekTerritories: TechnicianHoursOfOperationTerritory[];
}

export function TechnicianTerritoryEmptyCellContent({
  isLoading = false,
  technician,
  dateRange,
  territories,
  technicianAllWeekTerritories,
}: TechnicianTerritoryEmptyCellContentProps) {
  const [isOpen, openSheet, closeSheet] = useToggleState(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openSheet() : closeSheet())}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-2 min-h-fit max-w-full transition-all duration-300"
          disabled={isLoading}
        >
          <Plus className="min-h-6 min-w-6" />
          <span className="text-[0.8125rem]">
            Add <br />
            Hours of Operation
          </span>
        </Button>
      </SheetTrigger>
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
