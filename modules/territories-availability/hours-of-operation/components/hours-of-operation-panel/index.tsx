"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  PencilIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { Media, Technician } from "@/payload-types";
import { DateRange } from "@/types/date";
import { ReactNode, useRef } from "react";
import { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";

interface HoursOfOperationFormProps {
  isLoading?: boolean;
  technician: Technician;
  dateRange: DateRange;
  date: string;
  territories?: TechnicianHoursOfOperationTerritory[];
  onSave?: (territories: TechnicianHoursOfOperationTerritory[]) => void;
}

export function HoursOfOperationPanel({
  isLoading = false,
  technician,
  dateRange,
  date,
  territories = [],
  onSave,
}: HoursOfOperationFormProps) {
  return (
    <>
      <SheetHeader className="bg-white">
        <SheetTitle>Hours of Operation</SheetTitle>
      </SheetHeader>
      <div className="grid grid-cols-[20%_1fr] h-full">
        {/* Sidebar */}
        <div className="w-full p-4 border-b md:border-b-0 md:border-r flex flex-col">
          {/* User Info */}
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="w-12 h-12 border ">
              <AvatarImage
                src={
                  (technician?.profilePhoto as Media)?.url ||
                  "/placeholder.svg?height=48&width=48"
                }
                alt={technician?.name || "Technician"}
              />
              <AvatarFallback>
                {technician?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">{technician?.name}</p>
          </div>
          {/* Territories */}

          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-2 hover:bg-gray-50 p-1 rounded-md transition-colors">
              <div className="flex items-center font-semibold gap-2">
                <p>Territories</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Drag & drop territories to the calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mb-2">
                <div className="p-2 mb-2 rounded-md border border-pink-400 bg-pink-50 text-pink-900 cursor-move transition-all duration-200 hover:shadow-md">
                  South
                </div>
                <div className="p-2 mb-2 rounded-md border border-purple-400 bg-purple-50 text-purple-900 cursor-move transition-all duration-200 hover:shadow-md">
                  East
                </div>
                <div className="p-2 mb-2 rounded-md border border-teal-400 bg-teal-50 text-teal-900 cursor-move transition-all duration-200 hover:shadow-md">
                  West
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex-1 p-4 overflow-x-auto">calendar</div>
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
