"use client";
import type React from "react";
import { SheetHeader, SheetTitle } from "@/components/shadcn/sheet";
import { HoursOfOperationPanelSidebar } from "./components/sidebar";
import { getWeekDays } from "@/utils/date";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { BlockDraggable } from "./components/BlockDraggable";
import type { HoursOfOperationFormProps } from "./types";
import { useHoursOfOperationPanel } from "./hooks/useHoursOfOperationPanel";
import { CalendarGrid } from "./components/CalendarGrid";
import { ActionButtons } from "./components/ActionButton";

export function HoursOfOperationPanel(props: HoursOfOperationFormProps) {
  const weekDays = getWeekDays(props.dateRange.from);
  const {
    hours,
    cellHeight,
    openHours,
    setResizing,
    calendarGridRef,
    draggedBlock,
    currentDraggedBlock,
    setIsDraggingOverDeleteZone,
    handleBlockContextMenu,
    handleUndoAllChanges,
    handleSaveAsDefault,
    handleSaveWeek,
    handleDragStart,
    handleDragEnd,
    isSaving,
    technician,
    territories,
    drawing,
    drawPreview,
  } = useHoursOfOperationPanel(props);

  return (
    <>
      <SheetHeader className="bg-background">
        <SheetTitle className="text-lg font-semibold">
          Hours of Operation
        </SheetTitle>
      </SheetHeader>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-[20%_1fr] h-full px-6 gap-6 overflow-hidden">
          <HoursOfOperationPanelSidebar
            technician={technician}
            territories={territories}
          />
          <CalendarGrid
            weekDays={weekDays}
            hours={hours}
            dateRange={props.dateRange}
            cellHeight={cellHeight}
            openHours={openHours}
            calendarGridRef={calendarGridRef}
            drawing={drawing}
            drawPreview={drawPreview}
            setResizing={setResizing}
            setIsDraggingOverDeleteZone={setIsDraggingOverDeleteZone}
            currentDraggedBlock={currentDraggedBlock}
            handleBlockContextMenu={handleBlockContextMenu}
          />
        </div>
        <DragOverlay>
          {draggedBlock ? (
            <BlockDraggable
              block={draggedBlock}
              isOverlay
              cellHeight={cellHeight}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <ActionButtons
        onUndo={handleUndoAllChanges}
        onSaveAsDefault={handleSaveAsDefault}
        onSaveWeek={handleSaveWeek}
        isSaving={isSaving}
      />
      {currentDraggedBlock && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50 animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
          Drag to time column to delete
        </div>
      )}
    </>
  );
}
