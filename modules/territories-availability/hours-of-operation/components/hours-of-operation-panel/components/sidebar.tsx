"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { ChevronDown, Info, ChevronUp } from "lucide-react";
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
  onTerritorySelect: (territory: string) => void;
  activeTerritory: string;
}

function DraggableTerritory({ territory }: { territory: Territory }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `territory-${territory.id}`,
  });

  // Get color from territoryColors
  const color = territoryColors[territory.name?.toLowerCase() ?? ""];
  const rgbValues = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const r = rgbValues?.[1] || "0";
  const g = rgbValues?.[2] || "0";
  const b = rgbValues?.[3] || "0";
  const bgColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "p-2 mb-2 rounded-md border cursor-move transition-all duration-200 hover:shadow-md",
        isDragging && "opacity-50"
      )}
      style={{
        borderColor: color,
        backgroundColor: bgColor,
        color: color,
      }}
    >
      {territory.name
        ? territory.name.charAt(0).toUpperCase() + territory.name.slice(1)
        : ""}
    </div>
  );
}

export function HoursOfOperationPanelSidebar({
  technician,
  territories,
  onTerritorySelect,
  activeTerritory,
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
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-2 hover:bg-gray-50 p-1 rounded-md transition-colors">
          <div className="flex items-center font-semibold">
            Territories
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to select territory for drawing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ChevronUp className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="text-sm text-gray-500 mb-2">
            Click to select territory for drawing
          </div>
          <div className="mb-2">
            {territories?.map((territory) => (
              <div
                key={territory.id}
                className={`p-2 mb-2 rounded-md border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeTerritory === territory.name
                    ? "ring-2 ring-offset-1 ring-blue-400"
                    : ""
                }`}
                onClick={() => onTerritorySelect(territory.name || "")}
              >
                {territory.name}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
