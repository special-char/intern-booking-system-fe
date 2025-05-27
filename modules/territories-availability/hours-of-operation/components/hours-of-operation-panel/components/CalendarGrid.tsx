import React from "react";
import { cn } from "@/lib/utils";
import { BlockDraggable } from "./BlockDraggable";
import { CellDroppable } from "./CellDroppable";
import { DeleteZone } from "./DeleteZone";
import { formatTime, getDayIndex } from "../../../lib/utils";
import { TechnicianGridDateCell } from "../../technician-grid/components/header/date-cell";
import { Header } from "../../header";
import type { OpenHours } from "../types";
import { DateRange } from "@/types/date";

interface CalendarGridProps {
  weekDays: string[];
  hours: number[];
  cellHeight: number;
  openHours: OpenHours[];
  calendarGridRef: React.RefObject<HTMLDivElement | null>;
  drawing: any;
  drawPreview: any;
  dateRange: DateRange;
  setResizing: (r: any) => void;
  setIsDraggingOverDeleteZone: (b: boolean) => void;
  currentDraggedBlock: string | null;
  handleBlockContextMenu: (e: React.MouseEvent, blockId: string) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  weekDays,
  hours,
  cellHeight,
  openHours,
  calendarGridRef,
  drawing,
  dateRange,
  drawPreview,
  setResizing,
  setIsDraggingOverDeleteZone,
  currentDraggedBlock,
  handleBlockContextMenu,
}) => {
  const renderBlocks = (days: number) =>
    openHours
      .filter((oh) => oh.days === getDayIndex(days))
      .map((oh) => (
        <BlockDraggable
          key={oh.id}
          block={oh}
          onContextMenu={handleBlockContextMenu}
          onResizeStart={(e, block, height) => {
            document.body.style.cursor = "ns-resize";
            setResizing({
              blockId: block.id,
              initialY: e.clientY,
              initialHeight: height,
              initialEnd: block.end,
            });
          }}
          cellHeight={cellHeight}
        />
      ));

  return (
    <div className="py-4 overflow-auto rounded-lg border h-full bg-white">
      <Header dateRange={dateRange} />
      <div className="flex flex-col">
        <div className="grid grid-cols-[repeat(8,_minmax(6rem,auto))] border-b">
          <div />
          {weekDays.map((day) => (
            <TechnicianGridDateCell
              key={day}
              date={day}
              variant="HoursOfOperation"
            />
          ))}
        </div>
        <div
          ref={calendarGridRef}
          className="grid grid-cols-[repeat(8,_minmax(6rem,auto))] my-4"
        >
          <div className="relative">
            <DeleteZone
              setIsDraggingOverDeleteZone={setIsDraggingOverDeleteZone}
              currentDraggedBlock={currentDraggedBlock}
            />
            {hours.map((h) => (
              <div key={`time-${h}`} className="h-16 relative">
                <div className="absolute text-sm text-muted-foreground left-12 -translate-y-1/2 font-medium">
                  {formatTime(h)}
                </div>
              </div>
            ))}
          </div>
          {weekDays.map((day, dayIndex) => (
            <div
              key={`day-${day}`}
              className="border-r last:border-none relative"
            >
              {renderBlocks(dayIndex)}
              {hours.map((h) => (
                <CellDroppable
                  key={h}
                  day={dayIndex}
                  hour={h}
                  cellHeight={cellHeight}
                >
                  <div
                    className={cn(
                      "absolute inset-0 transition-colors duration-150",
                      drawing &&
                        drawing.days === dayIndex &&
                        drawPreview &&
                        h >= Math.min(drawPreview.start, drawPreview.end) &&
                        h <= Math.max(drawPreview.start, drawPreview.end)
                        ? "bg-primary/10"
                        : "hover:bg-primary/5"
                    )}
                  />
                </CellDroppable>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
