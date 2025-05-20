"use client";

import type React from "react";
import {
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet";
import {
  ChevronDown,
  ChevronUp,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Button } from "@/components/shadcn/button";
import { Technician, Territory } from "@/payload-types";
import { DateRange } from "@/types/date";
import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";
import { HoursOfOperationPanelSidebar } from "./components/sidebar";
import { Header } from "../header";
import { getWeekDays } from "@/utils/date";
import { TechnicianGridDateCell } from "../technician-grid/components/header/date-cell";
import { Moment } from "moment";
import { DndContext } from "@dnd-kit/core";

interface HoursOfOperationFormProps {
  isLoading?: boolean;
  technician: Technician;
  dateRange: DateRange;
  date: string;
  territories?: TechnicianHoursOfOperationTerritory[];
  onSave?: (territories: TechnicianHoursOfOperationTerritory[]) => void;
  territoriesData: Territory[];
}

export function HoursOfOperationPanel({
  isLoading = false,
  technician,
  dateRange,
  date,
  territories = [],
  onSave,
  territoriesData,
}: HoursOfOperationFormProps) {
  const weekDays: string[] = getWeekDays(dateRange.from);

  return (
    <>
      <SheetHeader className="bg-white">
        <SheetTitle>Hours of Operation</SheetTitle>
      </SheetHeader>
      <div className="grid grid-cols-[20%_1fr] h-full px-4 gap-4">
        {/* Sidebar */}
        <HoursOfOperationPanelSidebar technician={technician} territories={territoriesData} />

        {/* Calendar */}
        <div className="py-4 overflow-x-auto bg-white rounded-lg border flex flex-col gap-2">
          {/* Header */}
          <Header dateRange={dateRange} />
          <DndContext>
            <div className="grid grid-cols-[repeat(8,_minmax(6rem,auto))]">
              <div className="border-b h-[81px]" />
              {weekDays.map((day) => (
                <TechnicianGridDateCell
                  key={day}
                  date={day}
                  variant="HoursOfOperation"
                />
              ))}
            </div>
          </DndContext>
        </div>
      </div>

      <SheetFooter className="bg-white">
        <div className="flex justify-between">
          <Button variant="outline">Undo all changes</Button>
          <div className="flex gap-4">
            <Button variant="outline">Save as default week</Button>
            <Button variant="default">Save for this week only</Button>
          </div>
        </div>
      </SheetFooter>
    </>
  );
}
