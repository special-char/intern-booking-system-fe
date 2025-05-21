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
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState, useRef, useEffect } from "react";

// Add new types
type OpenHours = {
  id: string;
  days: number;
  start: number;
  end: number;
  territory: string;
};

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
  const [hours, setHours] = useState(
    Array.from({ length: 12 }, (_, i) => 6 + i)
  );

  // Add new state variables
  const [openHours, setOpenHours] = useState<OpenHours[]>([]);
  const [originalOpenHours, setOriginalOpenHours] = useState<OpenHours[]>([]);
  const [drawing, setDrawing] = useState<null | {
    days: number;
    start: number;
    territory: string;
  }>(null);
  const [drawPreview, setDrawPreview] = useState<null | {
    days: number;
    start: number;
    end: number;
    territory: string;
  }>(null);
  const [activeTerritoryForDraw, setActiveTerritoryForDraw] =
    useState<string>("");
  const [isDraggingOverDeleteZone, setIsDraggingOverDeleteZone] =
    useState(false);
  const [currentDraggedBlock, setCurrentDraggedBlock] = useState<string | null>(
    null
  );
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    blockId: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add helper functions
  const getBlockId = (days: number, start: number, end: number) => {
    return `${days}-${start}-${end}-${Math.random().toString(36).slice(2, 7)}`;
  };

  const formatTime = (hour: number): string => {
    const date = new Date();
    date.setHours(hour, 0, 0);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  // Add event handlers
  const handleMouseDown = (days: number, hour: number) => {
    if (!activeTerritoryForDraw) return;
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
      setDrawPreview({
        days,
        start: Math.min(drawing.start, hour),
        end: Math.max(drawing.start, hour),
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

  const handleBlockContextMenu = (e: React.MouseEvent, blockId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      blockId,
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    setOpenHours(openHours.filter((oh) => oh.id !== blockId));
    setContextMenu(null);
  };

  const handleUndoAllChanges = () => {
    setOpenHours([...originalOpenHours]);
  };

  const handleSaveAsDefault = async () => {
    try {
      if (onSave) {
        await onSave(openHours as any);
        setOriginalOpenHours([...openHours]);
      }
    } catch (error) {
      console.error("Failed to save default schedule:", error);
    }
  };

  const handleSaveWeek = async () => {
    try {
      if (onSave) {
        await onSave(openHours as any);
      }
    } catch (error) {
      console.error("Failed to save week schedule:", error);
    }
  };

  // Add drag and drop handlers
  const handleDragStart = (event: any) => {
    const { active } = event;
    if (active) {
      setCurrentDraggedBlock(active.id);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setCurrentDraggedBlock(null);
    setIsDraggingOverDeleteZone(false);

    if (!active || !over) return;

    if (over.id === "delete-zone") {
      setOpenHours((prev) => prev.filter((block) => block.id !== active.id));
      return;
    }

    const block: OpenHours = active.data.current;
    const { day, hour } = over.data.current;
    const duration = block.end - block.start;

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

  // Add components for drag and drop
  function BlockDraggable({ block }: { block: OpenHours }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: block.id,
      data: block,
    });

    const top = (block.start - hours[0]) * 56; // 56px height for each hour
    const height = (block.end - block.start) * 56 - 4;

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`absolute left-0 right-0 mx-1 rounded-lg bg-blue-100 text-blue-800 text-xs flex flex-col justify-center px-2 shadow-md z-20 transition-all duration-200 ${
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

  function CellDroppable({ day, hour, children }: any) {
    const { setNodeRef, isOver } = useDroppable({
      id: `cell-${day}-${hour}`,
      data: { day, hour },
    });

    return (
      <div
        ref={setNodeRef}
        className={`h-14 border-t  relative ${isOver ? "bg-blue-100" : ""}`}
      >
        {children}
      </div>
    );
  }

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

  // Render blocks for a day
  const renderBlocks = (days: number) =>
    openHours
      .filter((oh) => oh.days === days)
      .map((oh) => <BlockDraggable key={oh.id} block={oh} />);

  // Render draw preview
  const renderDrawPreview = (days: number) => {
    if (!drawPreview || drawPreview.days !== days) return null;

    const top = (drawPreview.start - hours[0]) * 56;
    const height = (drawPreview.end - drawPreview.start + 1) * 56 - 4;

    return (
      <div
        className="absolute left-0 right-0 mx-1 rounded-lg bg-blue-100 text-blue-800 opacity-60 text-xs flex flex-col justify-center px-2 pointer-events-none z-10"
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
    <>
      <SheetHeader className="bg-white">
        <SheetTitle>Hours of Operation</SheetTitle>
      </SheetHeader>
      <div className="grid grid-cols-[20%_1fr] h-full px-4 gap-4 overflow-hidden">
        {/* Sidebar */}
        <HoursOfOperationPanelSidebar
          technician={technician}
          territories={territoriesData}
          onTerritorySelect={setActiveTerritoryForDraw}
          activeTerritory={activeTerritoryForDraw}
        />
        {/* Calendar */}
        <div className="py-4 overflow-auto bg-white rounded-lg border h-full">
          {/* Header */}
          <Header dateRange={dateRange} />
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex flex-col">
              {/* Days Header */}
              <div className="grid grid-cols-[repeat(8,_minmax(6rem,auto))] ">
                <div /> {/* Empty cell for time column */}
                {weekDays.map((day) => (
                  <TechnicianGridDateCell
                    key={day}
                    date={day}
                    variant="HoursOfOperation"
                  />
                ))}
              </div>

              {/* Hours Grid */}
              <div className="grid grid-cols-[repeat(8,_minmax(6rem,auto))]">
                {/* Time Column */}
                <div className="relative">
                  <DeleteZoneDroppable />
                  {hours.map((h) => (
                    <div key={`time-${h}`} className="h-14 relative">
                      <div className="absolute text-sm text-muted-foreground left-10 -translate-y-1/2">
                        {h < 12 ? h : h === 12 ? 12 : h - 12}
                        {h < 12 ? "AM" : "PM"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => (
                  <div key={`day-${day}`} className="border-r relative">
                    {renderBlocks(dayIndex)}
                    {renderDrawPreview(dayIndex)}
                    {hours.map((h) => (
                      <CellDroppable key={h} day={dayIndex} hour={h}>
                        <div
                          className={`absolute inset-0 ${
                            drawing &&
                            drawing.days === dayIndex &&
                            drawPreview &&
                            h >= Math.min(drawPreview.start, drawPreview.end) &&
                            h <= Math.max(drawPreview.start, drawPreview.end)
                              ? "bg-blue-100"
                              : "hover:bg-blue-50"
                          } transition-colors duration-150`}
                          onMouseDown={() => handleMouseDown(dayIndex, h)}
                          onMouseEnter={() => handleMouseEnter(dayIndex, h)}
                          onMouseUp={() => handleMouseUp(dayIndex, h)}
                        />
                      </CellDroppable>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </DndContext>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && contextMenu.visible && (
        <div
          ref={dropdownRef}
          className="fixed bg-white shadow-lg rounded-lg p-1 z-50  animate-in fade-in-0 zoom-in-95 duration-100"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <span>Replace territory</span>
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {territoriesData.map((territory) => (
                <DropdownMenuItem
                  key={territory.id}
                  onClick={() => {
                    const blockToReplace = openHours.find(
                      (block) => block.id === contextMenu.blockId
                    );
                    if (blockToReplace) {
                      setOpenHours((prev) =>
                        prev.map((block) =>
                          block.id === contextMenu.blockId
                            ? { ...block, territory: territory.name || "" }
                            : block
                        )
                      );
                    }
                    setContextMenu(null);
                  }}
                >
                  {territory.name}
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

      <SheetFooter className="bg-white">
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleUndoAllChanges}>
            Undo all changes
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSaveAsDefault}>
              Save as default week
            </Button>
            <Button variant="default" onClick={handleSaveWeek}>
              Save for this week only
            </Button>
          </div>
        </div>
      </SheetFooter>

      {/* Drag-to-delete instruction tooltip */}
      {currentDraggedBlock && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          Drag to time column to delete
        </div>
      )}
    </>
  );
}
