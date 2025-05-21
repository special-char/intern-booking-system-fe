"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/shadcn/sheet";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import { HoursOfOperationPanel } from "../../../../hours-of-operation-panel";
interface TechnicianTerritoryEmptyCellContentProps {
  isLoading?: boolean;
  onButtonFocus: (isFocused: boolean) => void;
  technician: Technician;
  dateRange: DateRange;
  date: string;
  territoriesData: Territory[];
}

export function TechnicianTerritoryEmptyCellContent({
  isLoading = false,
  onButtonFocus,
  technician,
  dateRange,
  date,
  territoriesData,
}: TechnicianTerritoryEmptyCellContentProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center gap-2 min-h-fit max-w-full transition-all duration-300"
          onFocus={() => onButtonFocus(true)}
          onBlur={() => onButtonFocus(false)}
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
        className="w-full md:max-w-[900px] lg:max-w-[1200px] bg-background"
      >
        <HoursOfOperationPanel
          isLoading={isLoading}
          technician={technician}
          dateRange={dateRange}
          date={date}
          territoriesData={territoriesData}
        />
      </SheetContent>
    </Sheet>
  );
}
