"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

// Territory colors
const TERRITORY_COLORS: Record<string, TerritoryConfig> = {
  West: {
    name: "West",
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    text: "text-cyan-800",
  },
  East: {
    name: "East",
    bg: "bg-purple-50",
    border: "border-purple-300",
    text: "text-purple-800",
  },
  South: {
    name: "South",
    bg: "bg-pink-50",
    border: "border-pink-300",
    text: "text-pink-800",
  },
};

// Update the Territory type to be more dynamic
type Territory = string;

// Update the OpenHours type
type OpenHours = {
  id: string;
  days: number; // 0-6 (Sunday-Saturday)
  start: number;
  end: number;
  territory: Territory;
  metadata?: Record<string, any>;
};

// Add a type for the territory configuration
type TerritoryConfig = {
  name: string;
  bg: string;
  border: string;
  text: string;
};

// Add a type for the save response
type SaveResponse = {
  success: boolean;
  data?: OpenHours[];
  error?: string;
};

// Define the default territory configs type
type DefaultTerritoryConfigs = {
  [key in "West" | "East" | "South"]: TerritoryConfig;
};

function getBlockId(days: number, start: number, end: number) {
  return `${days}-${start}-${end}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(hour: number): string {
  const date = new Date();
  date.setHours(hour, 0, 0); // Set minutes and seconds to 0
  return format(date, "h:mm a");
}

export interface HoursOfOperationPanelProps {
  initialOpenHours?: OpenHours[];
  territories?: Territory[];
  territoryConfigs?: Record<string, TerritoryConfig>;
  onSaveDefault?: (openHours: OpenHours[]) => Promise<SaveResponse>;
  onSaveWeek?: (
    openHours: OpenHours[],
    weekStart: Date,
    weekEnd: Date
  ) => Promise<SaveResponse>;
  onError?: (error: string) => void;
}

export const HoursOfOperationPanel: React.FC<HoursOfOperationPanelProps> = ({
  initialOpenHours = [],
  territories: propTerritories = ["West", "East", "South"],
  territoryConfigs = TERRITORY_COLORS as Record<string, TerritoryConfig>,
  onSaveDefault,
  onSaveWeek,
  onError,
}) => {
  // Dynamic date state
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 15)); // July 15, 2024
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Sunday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }); // End on Saturday

  // Generate days dynamically
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      name: format(date, "EEE").toUpperCase(),
      date: format(date, "d"),
      fullDate: date,
      dayOfWeek: date.getDay(), // Add day of week (0 = Sunday, 6 = Saturday)
    };
  });

  // Dynamic hours (can be customized)
  const [hours, setHours] = useState(
    Array.from({ length: 13 }, (_, i) => 6 + i)
  );

  // Remove the regions structure and keep only the territories from props
  const [territories] = useState<Territory[]>(propTerritories);

  // Initialize with empty open hours (no default schedule)
  const [openHours, setOpenHours] = useState<OpenHours[]>(initialOpenHours);

  // Store original open hours for undo functionality
  const [originalOpenHours, setOriginalOpenHours] =
    useState<OpenHours[]>(initialOpenHours);

  const [drawing, setDrawing] = useState<null | {
    days: number;
    start: number;
    territory: Territory;
  }>(null);

  const [drawPreview, setDrawPreview] = useState<null | {
    days: number;
    start: number;
    end: number;
    territory: Territory;
  }>(null);

  const [activeTerritoryForDraw, setActiveTerritoryForDraw] =
    useState<Territory>("South");

  // Track if we're dragging over the delete zone
  const [isDraggingOverDeleteZone, setIsDraggingOverDeleteZone] =
    useState(false);
  const [currentDraggedBlock, setCurrentDraggedBlock] = useState<string | null>(
    null
  );

  // Ref for dropdown menu
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Context menu state with more properties
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    blockId: string;
  } | null>(null);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu && !dropdownRef.current?.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  // Draw-to-create
  const handleMouseDown = (days: number, hour: number) => {
    setDrawing({ days, start: hour, territory: activeTerritoryForDraw });
    setDrawPreview({
      days,
      start: hour,
      end: hour,
      territory: activeTerritoryForDraw,
    });
  };

  const handleMouseEnter = (days: number, hour: number) => {
    if (drawing && drawing.days === days) {
      const adjustedHour = hour < 6 ? hour + 12 : hour;
      setDrawPreview({
        days,
        start: Math.min(drawing.start, adjustedHour),
        end: Math.max(drawing.start, adjustedHour),
        territory: drawing.territory,
      });
    }
  };

  const handleMouseUp = (days: number, hour: number) => {
    if (drawing && drawPreview) {
      let minHour = Math.min(drawing.start, hour);
      let maxHour = Math.max(drawing.start, hour) + 1;

      minHour = Math.max(6, minHour);
      maxHour = Math.min(18, maxHour);

      if (maxHour > minHour) {
        setOpenHours((prev) => [
          ...prev.filter(
            (oh) =>
              !(
                oh.days === days &&
                ((minHour >= oh.start && minHour < oh.end) ||
                  (maxHour > oh.start && maxHour <= oh.end) ||
                  (minHour <= oh.start && maxHour >= oh.end))
              )
          ),
          {
            id: getBlockId(days, minHour, maxHour),
            days,
            start: minHour,
            end: maxHour,
            territory: drawing.territory,
          },
        ]);
      }
    }
    setDrawing(null);
    setDrawPreview(null);
  };

  // Handle right-click on block
  const handleBlockContextMenu = (e: React.MouseEvent, blockId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      blockId,
    });
  };

  // Modify the handleReplaceTerritoryClick function to handle overlapping territories
  const handleReplaceTerritoryClick = (
    blockId: string,
    newTerritory: Territory
  ) => {
    const blockToReplace = openHours.find((block) => block.id === blockId);
    if (!blockToReplace) return;

    const overlappingBlocks = openHours.filter(
      (block) =>
        block.days === blockToReplace.days &&
        block.territory === newTerritory &&
        ((block.start >= blockToReplace.start &&
          block.start < blockToReplace.end) ||
          (block.end > blockToReplace.start &&
            block.end <= blockToReplace.end) ||
          (block.start <= blockToReplace.start &&
            block.end >= blockToReplace.end))
    );

    if (overlappingBlocks.length > 0) {
      const confirmMessage = `This will delete ${overlappingBlocks.length} overlapping block(s) for ${newTerritory}. Do you want to continue?`;

      if (window.confirm(confirmMessage)) {
        setOpenHours((prev) => [
          ...prev.filter(
            (block) =>
              block.id !== blockId &&
              !overlappingBlocks.some(
                (overlapping) => overlapping.id === block.id
              )
          ),
          { ...blockToReplace, territory: newTerritory },
        ]);
      }
    } else {
      setOpenHours((prev) =>
        prev.map((block) =>
          block.id === blockId ? { ...block, territory: newTerritory } : block
        )
      );
    }
    setContextMenu(null);
  };

  // Delete block
  const handleDeleteBlock = (blockId: string) => {
    setOpenHours(openHours.filter((oh) => oh.id !== blockId));
    setContextMenu(null);
  };

  // Undo all changes
  const handleUndoAllChanges = () => {
    setOpenHours([...originalOpenHours]);
  };

  // Update the save handlers
  const handleSaveAsDefault = async () => {
    try {
      if (onSaveDefault) {
        const response = await onSaveDefault(openHours);
        if (response.success) {
          setOriginalOpenHours([...openHours]);
          console.log("Default schedule saved:", response.data);
        } else {
          onError?.(response.error || "Failed to save default schedule");
        }
      } else {
        console.log("Default schedule (mock save):", openHours);
        setOriginalOpenHours([...openHours]);
      }
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : "Failed to save default schedule"
      );
    }
  };

  const handleSaveWeek = async () => {
    try {
      if (onSaveWeek) {
        const response = await onSaveWeek(openHours, weekStart, weekEnd);
        if (response.success) {
          console.log("Week schedule saved:", response.data);
        } else {
          onError?.(response.error || "Failed to save week schedule");
        }
      } else {
        console.log("Week schedule (mock save):", {
          openHours,
          weekStart,
          weekEnd,
        });
      }
    } catch (error) {
      onError?.(
        error instanceof Error ? error.message : "Failed to save week schedule"
      );
    }
  };

  // Handle drag start
  const handleDragStart = (event: any) => {
    const { active } = event;
    if (active) {
      setCurrentDraggedBlock(active.id);
    }
  };

  // Update the BlockDraggable component
  function BlockDraggable({ block }: { block: OpenHours }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: block.id,
        data: block,
      });

    const top = (block.start - hours[0]) * 40;
    const height = (block.end - block.start) * 40 - 4;
    const colors = (territoryConfigs[block.territory] as TerritoryConfig) || {
      bg: "bg-gray-50",
      border: "border-gray-300",
      text: "text-gray-800",
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`absolute left-0 right-0 mx-1 rounded-lg ${colors.bg} ${colors.text} text-xs flex flex-col justify-center px-2 shadow-md z-20 transition-all duration-200 ${
          isDragging ? "opacity-60 scale-105" : ""
        } hover:shadow-lg hover:brightness-95 active:brightness-90`}
        style={{
          top,
          height,
          cursor: "grab",
        }}
        onContextMenu={(e) => handleBlockContextMenu(e, block.id)}
      >
        <div className="font-medium">{block.territory}</div>
        <div className="text-xs">
          {formatTime(block.start)} - {formatTime(block.end)}
        </div>
      </div>
    );
  }

  // Drop target for each cell
  function CellDroppable({ day, hour, children }: any) {
    const { setNodeRef, isOver } = useDroppable({
      id: `cell-${day}-${hour}`,
      data: { day, hour },
    });

    return (
      <div
        ref={setNodeRef}
        className={`h-10 border-b border-l relative ${isOver ? "bg-blue-100" : ""}`}
      >
        {children}
      </div>
    );
  }

  // Delete zone drop target
  function DeleteZoneDroppable() {
    const { setNodeRef, isOver } = useDroppable({
      id: "delete-zone",
      data: { isDeleteZone: true },
    });

    useEffect(() => {
      setIsDraggingOverDeleteZone(isOver);
    }, [isOver]);

    return (
      <div
        ref={setNodeRef}
        className={`absolute inset-0 z-10 transition-colors duration-200 ${
          isOver && currentDraggedBlock ? "bg-red-100" : ""
        }`}
      >
        {isOver && currentDraggedBlock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-2 rounded-full shadow-md">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // Reset drag state
    setCurrentDraggedBlock(null);
    setIsDraggingOverDeleteZone(false);

    if (!active || !over) return;

    // Check if dropped in delete zone
    if (over.id === "delete-zone") {
      // Delete the block
      setOpenHours((prev) => prev.filter((block) => block.id !== active.id));
      return;
    }

    // Normal drop in calendar
    const block: OpenHours = active.data.current;
    const { day, hour } = over.data.current;
    const duration = block.end - block.start;

    // Remove old, add new at drop position
    setOpenHours((prev) => [
      ...prev.filter((b) => b.id !== block.id),
      {
        ...block,
        days: day,
        start: hour,
        end: hour + duration,
        id: getBlockId(day, hour, hour + duration),
      },
    ]);
  };

  // Render blocks for a day
  const renderBlocks = (days: number) =>
    openHours
      .filter((oh) => oh.days === days)
      .map((oh) => <BlockDraggable key={oh.id} block={oh} />);

  // Render draw preview
  const renderDrawPreview = (days: number) => {
    if (!drawPreview || drawPreview.days !== days) return null;

    const top = (drawPreview.start - hours[0]) * 40;
    const height = (drawPreview.end - drawPreview.start + 1) * 40 - 4;
    const colors = (territoryConfigs[
      drawPreview.territory
    ] as TerritoryConfig) || {
      bg: "bg-gray-50",
      border: "border-gray-300",
      text: "text-gray-800",
    };

    return (
      <div
        className={`absolute left-0 right-0 mx-1 rounded-lg ${colors.bg} ${colors.text} opacity-60 text-xs flex flex-col justify-center px-2 pointer-events-none z-10`}
        style={{
          top,
          height,
        }}
      >
        <div className="font-medium">{drawPreview.territory}</div>
        <div className="text-xs">
          {formatTime(drawPreview.start)} - {formatTime(drawPreview.end)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-auto">
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full md:w-64 p-4 border-b md:border-b-0 md:border-r bg-white flex flex-col">
          {/* User Info */}
          <div className="flex items-center mb-6">
            <Avatar className="w-12 h-12 mr-3 border">
              <AvatarImage
                src="/placeholder.svg?height=48&width=48"
                alt="Profile"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">Johnathan Scott</div>
            </div>
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
                      <p>
                        Drag territories to the calendar or click to select for
                        drawing
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ChevronUp className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="text-sm text-gray-500 mb-2">
                Drag & drop territories to the calendar.
              </div>
              <div className="mb-2">
                {territories.map((territory) => (
                  <div
                    key={territory}
                    className={`p-2 mb-2 rounded-md border ${territoryConfigs[territory]?.border} ${territoryConfigs[territory]?.bg} ${territoryConfigs[territory]?.text} cursor-move transition-all duration-200 hover:shadow-md ${activeTerritoryForDraw === territory ? "ring-2 ring-offset-1 ring-blue-400" : ""}`}
                    onClick={() => setActiveTerritoryForDraw(territory)}
                  >
                    {territory}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Calendar */}
        <div className="flex-1 p-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousWeek}
              className="rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="text-center text-xl font-semibold">
              {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d")}{" "}
              <span className="text-gray-500">{format(weekStart, "yyyy")}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextWeek}
              className="rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="border rounded-lg overflow-hidden select-none shadow-sm">
              {/* Days Header */}
              <div className="grid grid-cols-8 bg-gray-50">
                <div className="h-14 flex items-center justify-center font-medium border-b"></div>
                {days.map((day, i) => (
                  <div
                    key={i}
                    className="h-14 flex flex-col items-center justify-center font-medium border-l border-b"
                  >
                    <div className="text-gray-600">{day.name}</div>
                    <div
                      className={`text-sm mt-1 w-7 h-7 flex items-center justify-center rounded-full ${
                        format(day.fullDate, "yyyy-MM-dd") ===
                        format(new Date(), "yyyy-MM-dd")
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="relative">
                <div className="grid grid-cols-8">
                  {/* Time Labels Column with Delete Zone */}
                  <div className="flex flex-col bg-gray-50 border-r relative">
                    {/* Delete zone overlay */}
                    <DeleteZoneDroppable />

                    {/* Time labels */}
                    {hours.map((h) => (
                      <div
                        key={h}
                        className="h-10 flex items-center justify-center text-xs border-b font-medium text-gray-600 relative z-0"
                      >
                        {h < 12 ? h : h === 12 ? 12 : h - 12}{" "}
                        {h < 12 ? "AM" : "PM"}
                      </div>
                    ))}
                  </div>

                  {/* Days Columns */}
                  {days.map((day, dayIdx) => (
                    <div key={dayIdx} className="relative">
                      {/* Blocks */}
                      {renderBlocks(day.dayOfWeek)}
                      {renderDrawPreview(day.dayOfWeek)}

                      {/* Grid Cells */}
                      {hours.map((hour) => (
                        <CellDroppable
                          key={hour}
                          day={day.dayOfWeek}
                          hour={hour}
                        >
                          <div
                            className={`absolute inset-0 ${
                              drawing &&
                              drawing.days === day.dayOfWeek &&
                              drawPreview &&
                              isInDrawRange(drawPreview, hour)
                                ? "bg-blue-100"
                                : "hover:bg-blue-50"
                            } transition-colors duration-150`}
                            onMouseDown={() =>
                              handleMouseDown(day.dayOfWeek, hour)
                            }
                            onMouseEnter={() =>
                              handleMouseEnter(day.dayOfWeek, hour)
                            }
                            onMouseUp={() => handleMouseUp(day.dayOfWeek, hour)}
                          />
                        </CellDroppable>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DndContext>

          {/* Context Menu */}
          {contextMenu && contextMenu.visible && (
            <div
              ref={dropdownRef}
              className="fixed bg-white shadow-lg rounded-lg p-1 z-50 border animate-in fade-in-0 zoom-in-95 duration-100"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <span>Replace the territory</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {territories.map((territory) => (
                    <DropdownMenuItem
                      key={territory}
                      onClick={() =>
                        handleReplaceTerritoryClick(
                          contextMenu.blockId,
                          territory
                        )
                      }
                      className={`flex items-center gap-2 ${territoryConfigs[territory]?.text}`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${territoryConfigs[territory]?.bg} ${territoryConfigs[territory]?.border}`}
                      ></div>
                      {territory}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div
                className="flex items-center p-2 hover:bg-red-50 text-red-600 rounded-md cursor-pointer mt-1"
                onClick={() => handleDeleteBlock(contextMenu.blockId)}
              >
                <span>Delete</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              className="md:w-auto rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleUndoAllChanges}
            >
              Undo all changes
            </Button>
            <Button
              variant="outline"
              className="md:w-auto rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleSaveAsDefault}
            >
              Save as default week
            </Button>
            <Button
              className="md:w-auto bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
              onClick={handleSaveWeek}
            >
              Save for this week only
            </Button>
          </div>
        </div>
      </div>

      {/* Drag-to-delete instruction tooltip */}
      {currentDraggedBlock && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          Drag to time column to delete
        </div>
      )}
    </div>
  );
};

function isInDrawRange(
  drawPreview: { start: number; end: number },
  hour: number
) {
  const min = Math.min(drawPreview.start, drawPreview.end);
  const max = Math.max(drawPreview.start, drawPreview.end);
  return hour >= min && hour <= max;
}

export default function HoursOfOperation({
  initialOpenHours,
  territories,
  territoryConfigs,
  onSaveDefault,
  onSaveWeek,
  onError,
}: HoursOfOperationPanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md w-full md:w-auto transition-colors">
          Edit Hours of Operation
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-[98vw] sm:max-w-[90vw] md:max-w-[900px] lg:max-w-[1200px] p-0"
      >
        <SheetHeader className="w-full bg-white">
          <SheetTitle className="text-xl font-semibold">
            Hours of Operation
          </SheetTitle>
        </SheetHeader>
        <HoursOfOperationPanel
          initialOpenHours={initialOpenHours}
          territories={territories}
          territoryConfigs={territoryConfigs}
          onSaveDefault={onSaveDefault}
          onSaveWeek={onSaveWeek}
          onError={onError}
        />
      </SheetContent>
    </Sheet>
  );
}
