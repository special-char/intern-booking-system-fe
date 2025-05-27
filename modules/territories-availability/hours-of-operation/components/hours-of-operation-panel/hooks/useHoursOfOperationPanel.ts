import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useToggleState from "@/hooks/use-toggle-state";
import { useResizableBlock } from "../hooks/useResizableBlock";
import {
  getBlockId,
  formatTime,
  transformOpenHoursToTerritorySchedule,
  getDayIndex,
  parseTerritoryDateTime,
} from "../../../lib/utils";
import { saveHoursOfOperation } from "@/modules/territories-availability/hours-of-operation/lib/action";
import type {
  OpenHours,
  TerritoryDragData,
  HoursOfOperationFormProps,
} from "../types";
import { TerritorySchedule } from "@/lib/data/configuration";

export function useHoursOfOperationPanel({
  technician,
  dateRange,
  territories,
  onClose,
  technicianAllWeekTerritories,
}: HoursOfOperationFormProps) {
  const [hours, setHours] = useState(
    Array.from({ length: 18 }, (_, i) => 6 + i)
  );
  const [cellHeight, setCellHeight] = useState(56);
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
  const [draggedBlock, setDraggedBlock] = useState<OpenHours | null>(null);
  const [currentDraggedBlock, setCurrentDraggedBlock] = useState<string | null>(
    null
  );
  const [isDraggingOverDeleteZone, setIsDraggingOverDeleteZone] =
    useState(false);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    blockId: string;
  } | null>(null);
  const [resizing, setResizing] = useState<{
    blockId: string | null;
    initialY: number;
    initialHeight: number;
    initialEnd: number;
  }>({ blockId: null, initialY: 0, initialHeight: 0, initialEnd: 0 });
  const calendarGridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isSaving, openSaving, closeSaving] = useToggleState(false);
  const router = useRouter();

  useResizableBlock(
    openHours,
    resizing,
    setOpenHours,
    setResizing,
    hours,
    cellHeight
  );

  useEffect(() => {
    const calculateCellHeight = () => {
      if (!calendarGridRef.current) return;
      const gridHeight = calendarGridRef.current.clientHeight;
      const totalHours = hours.length;
      const calculatedHeight = Math.floor(gridHeight / totalHours);
      const boundedHeight = Math.min(Math.max(calculatedHeight, 64), 80);
      setCellHeight(boundedHeight);
    };
    calculateCellHeight();
    window.addEventListener("resize", calculateCellHeight);
    return () => {
      window.removeEventListener("resize", calculateCellHeight);
    };
  }, [hours.length]);

  useEffect(() => {
    if (
      technicianAllWeekTerritories &&
      technicianAllWeekTerritories.length > 0
    ) {
      const transformedHours = technicianAllWeekTerritories.map((territory) => {
        const { dayOfWeek, startHour, endHour } = parseTerritoryDateTime(
          territory.from,
          territory.to
        );
        return {
          id: getBlockId(dayOfWeek, startHour, endHour),
          days: dayOfWeek,
          start: startHour,
          end: endHour,
          territory: territory.name,
        };
      });
      setOpenHours(transformedHours);
      setOriginalOpenHours(transformedHours);
    }
  }, [technicianAllWeekTerritories]);

  const handleBlockContextMenu = (e: React.MouseEvent, blockId: string) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, blockId });
  };

  const handleUndoAllChanges = () => {
    setOpenHours([...originalOpenHours]);
  };

  const handleSaveAsDefault = async () => {
    // TODO: Implement save as default logic
  };

  const handleSaveWeek = async () => {
    openSaving();
    try {
      const formattedData = transformOpenHoursToTerritorySchedule(
        openHours,
        technician,
        territories,
        dateRange
      );
      await saveHoursOfOperation(formattedData as TerritorySchedule[]);
      toast({
        title: "Success",
        description: "Hours of operation saved successfully",
      });
      onClose?.();
      router.refresh();
    } catch (error) {
      console.error("Failed to save week schedule:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save hours of operation",
      });
    } finally {
      closeSaving();
    }
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    if (active) {
      setCurrentDraggedBlock(`${active.id}`);
      if (active.data.current && (active.data.current as OpenHours).id) {
        setDraggedBlock(active.data.current as OpenHours);
      }
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setCurrentDraggedBlock(null);
    setIsDraggingOverDeleteZone(false);
    setDraggedBlock(null);
    if (!active || !over) return;
    if (over.id === "delete-zone") {
      setOpenHours((prev) => prev.filter((block) => block.id !== active.id));
      return;
    }
    if (active.id.toString().startsWith("territory-")) {
      const territoryData = active.data.current as TerritoryDragData;
      const { day, hour } = over.data.current as { day: number; hour: number };
      const hasOverlap = openHours.some(
        (b) =>
          b.days === getDayIndex(day) &&
          ((hour >= b.start && hour < b.end) ||
            (hour + 1 > b.start && hour + 1 <= b.end) ||
            (hour <= b.start && hour + 1 >= b.end))
      );
      if (hasOverlap) {
        toast({
          variant: "destructive",
          title: "Cannot create block",
          description: "This time slot overlaps with another block",
        });
        return;
      }
      setOpenHours((prev) => [
        ...prev,
        {
          id: getBlockId(getDayIndex(day), hour, hour + 1),
          days: getDayIndex(day),
          start: hour,
          end: hour + 1,
          territory: territoryData.territory,
        },
      ]);
      return;
    }
    const block: OpenHours = active.data.current as OpenHours;
    const { day, hour } = over.data.current as { day: number; hour: number };
    const duration = block.end - block.start;
    const newStart = hour;
    const newEnd = hour + duration;
    const minHour = hours[0];
    const maxHour = hours[hours.length - 1] + 1;
    if (newStart < minHour || newEnd > maxHour) {
      toast({
        variant: "destructive",
        title: "Cannot move block",
        description: `Time blocks must stay within ${formatTime(minHour)} to ${formatTime(maxHour)}`,
      });
      return;
    }
    const hasOverlap = openHours.some(
      (b) =>
        b.days === getDayIndex(day) &&
        b.id !== block.id &&
        ((newStart >= b.start && newStart < b.end) ||
          (newEnd > b.start && newEnd <= b.end) ||
          (newStart <= b.start && newEnd >= b.end))
    );
    if (hasOverlap) {
      toast({
        variant: "destructive",
        title: "Cannot move block",
        description: "This time slot overlaps with another block",
      });
      return;
    }
    setOpenHours((prev) => [
      ...prev.filter((b) => b.id !== block.id),
      {
        ...block,
        days: getDayIndex(day),
        start: newStart,
        end: newEnd,
        id: getBlockId(getDayIndex(day), newStart, newEnd),
      },
    ]);
  };

  return {
    hours,
    cellHeight,
    setCellHeight,
    openHours,
    setOpenHours,
    originalOpenHours,
    setOriginalOpenHours,
    drawing,
    setDrawing,
    drawPreview,
    setDrawPreview,
    draggedBlock,
    setDraggedBlock,
    currentDraggedBlock,
    setCurrentDraggedBlock,
    isDraggingOverDeleteZone,
    setIsDraggingOverDeleteZone,
    contextMenu,
    setContextMenu,
    resizing,
    setResizing,
    calendarGridRef,
    isSaving,
    handleBlockContextMenu,
    handleUndoAllChanges,
    handleSaveAsDefault,
    handleSaveWeek,
    handleDragStart,
    handleDragEnd,
    technician,
    territories,
    dateRange,
  };
}
