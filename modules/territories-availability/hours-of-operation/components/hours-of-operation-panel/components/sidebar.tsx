"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { Info } from "lucide-react";
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
import { Media, Technician, Territory } from "@/payload-types";
import { territoryColors } from "@/utils/get-random-color";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface HoursOfOperationPanelSidebarProps {
  technician: Technician;
  territories?: Territory[];
}

type TerritoryStyleProps = {
  borderColor?: string;
  color?: string;
}

type TerritoryDragData = {
  type: "territory";
  territory: string;
};

const DraggableTerritory = ({ territory }: { territory: Territory }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `territory-${territory.id}`,
    data: {
      type: "territory",
      territory: territory.name || "",
    } as TerritoryDragData,
  });



  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "p-2 mb-2 rounded-md border cursor-move transition-all duration-200 hover:shadow-md",
        isDragging && "opacity-50"
      )}
      style={{
        borderColor: (territory?.properties as TerritoryStyleProps)?.borderColor,
        backgroundColor: (territory?.properties as TerritoryStyleProps)?.color,
      }}
    >
      {territory.name
        ? territory.name.charAt(0).toUpperCase() + territory.name.slice(1)
        : ""}
    </div>
  );
};

export function HoursOfOperationPanelSidebar({
  technician,
  territories,
}: HoursOfOperationPanelSidebarProps) {
  return (
    <div className="">
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
        <p className="font-inter font-semibold text-base leading-8">
          {technician?.name}
        </p>
      </div>

      {/* Territories */}
      <Accordion type="single" defaultValue="territories" collapsible>
        <AccordionItem value="territories">
          <AccordionTrigger className="flex items-center justify-between w-full mb-2 hover:bg-gray-50 p-1 rounded-md transition-colors">
            <div className="flex items-center font-semibold">
              Territories
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Drag and drop territories to schedule</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm text-gray-500 mb-2">
              Drag and drop territories to schedule
            </div>
            <div className="mb-2">
              {territories?.map((territory) => (
                <DraggableTerritory key={territory.id} territory={territory} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
