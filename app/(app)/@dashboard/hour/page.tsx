"use client";

import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { format, setHours } from "date-fns";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/sheet";

const HOURS = Array.from({ length: 13 }, (_, i) => 6 + i); // 6AM to 6PM
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Block = {
  id: string;
  day: number; // 0-6
  startHour: number; // 6-18
  endHour: number; // 7-19
};

function getBlockId(day: number, startHour: number, endHour: number) {
  return `${day}-${startHour}-${endHour}-${Math.random().toString(36).slice(2, 7)}`;
}

function HoursOfOperationPanel() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [drawing, setDrawing] = useState<null | {
    day: number;
    startHour: number;
  }>(null);
  const [drawPreview, setDrawPreview] = useState<null | {
    day: number;
    startHour: number;
    endHour: number;
  }>(null);

  // Draw-to-create
  const handleMouseDown = (day: number, hour: number) => {
    setDrawing({ day, startHour: hour });
    setDrawPreview({ day, startHour: hour, endHour: hour });
  };

  const handleMouseEnter = (day: number, hour: number) => {
    if (drawing && drawing.day === day) {
      setDrawPreview({
        day,
        startHour: Math.min(drawing.startHour, hour),
        endHour: Math.max(drawing.startHour, hour),
      });
    }
  };

  const handleMouseUp = (day: number, hour: number) => {
    if (drawing && drawPreview) {
      // Prevent zero-length blocks
      if (drawPreview.endHour !== drawPreview.startHour) {
        // Remove overlapping blocks for this day
        setBlocks((prev) => [
          ...prev.filter(
            (b) =>
              !(
                b.day === day &&
                ((drawPreview.startHour >= b.startHour &&
                  drawPreview.startHour < b.endHour) ||
                  (drawPreview.endHour + 1 > b.startHour &&
                    drawPreview.endHour + 1 <= b.endHour) ||
                  (drawPreview.startHour <= b.startHour &&
                    drawPreview.endHour + 1 >= b.endHour))
              )
          ),
          {
            id: getBlockId(day, drawPreview.startHour, drawPreview.endHour + 1),
            day,
            startHour: drawPreview.startHour,
            endHour: drawPreview.endHour + 1,
          },
        ]);
      }
    }
    setDrawing(null);
    setDrawPreview(null);
  };

  // Drag-to-move
  function BlockDraggable({ block }: { block: Block }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: block.id,
        data: block,
      });
    const top = (block.startHour - 6) * 40;
    const height = (block.endHour - block.startHour) * 40 - 4;
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`absolute left-0 right-0 mx-1 rounded bg-blue-500 text-white text-xs flex items-center px-2 shadow-md z-20 transition-all duration-75 ${isDragging ? "opacity-60" : ""
          }`}
        style={{
          top,
          height,
          cursor: "grab",
        }}
        title={`${format(setHours(new Date(), block.startHour), "h a")} - ${format(
          setHours(new Date(), block.endHour),
          "h a"
        )}`}
      >
        Working Hours
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
        className={`h-10 border-b border-l relative ${isOver ? "bg-blue-100" : ""
          }`}
      >
        {children}
      </div>
    );
  }

  // Handle drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over) {
      const block: Block = active.data.current;
      const { day, hour } = over.data.current;
      const duration = block.endHour - block.startHour;
      // Remove old, add new at drop position
      setBlocks((prev) => [
        ...prev.filter((b) => b.id !== block.id),
        {
          ...block,
          day,
          startHour: hour,
          endHour: hour + duration,
          id: getBlockId(day, hour, hour + duration),
        },
      ]);
    }
  };

  // Render blocks for a day
  const renderBlocks = (day: number) =>
    blocks
      .filter((b) => b.day === day)
      .map((b) => <BlockDraggable key={b.id} block={b} />);

  // Render draw preview
  const renderDrawPreview = (day: number) => {
    if (!drawPreview || drawPreview.day !== day) return null;
    const top = (drawPreview.startHour - 6) * 40;
    const height = (drawPreview.endHour - drawPreview.startHour + 1) * 40 - 4;
    return (
      <div
        className="absolute left-0 right-0 mx-1 rounded bg-blue-300 bg-opacity-60 text-xs flex items-center px-2 pointer-events-none z-10"
        style={{
          top,
          height,
        }}
      >
        New Block
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white overflow-auto">
      {/* Sidebar */}
      <div className="w-full md:w-96 p-4 md:p-6 border-b md:border-b-0 md:border-r bg-white flex flex-col justify-between">
        <div>
          {/* User Info */}
          <div className="flex items-center mb-6">
            <Image
              src=""
              alt="Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">Johnathan Scott</div>
            </div>
          </div>
          {/* Territories */}
          <div>
            <div className="flex items-center font-semibold mb-2">
              Territories
              <span className="ml-1 text-gray-400 cursor-pointer">ⓘ</span>
            </div>
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Central Florida</div>
              <div className="mb-2">
                <div className="p-2 mb-2 rounded border border-pink-300 bg-pink-50 text-pink-800 cursor-move">
                  South Orlando
                </div>
                <div className="p-2 mb-2 rounded border border-purple-300 bg-purple-50 text-purple-800 cursor-move">
                  East Orlando
                </div>
                <div className="p-2 mb-2 rounded border border-cyan-300 bg-cyan-50 text-cyan-800 cursor-move">
                  West Orlando
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">South Florida</div>
              <div className="mb-2">
                {/* Placeholder for more territories */}
              </div>
              <div className="text-xs text-gray-500 mb-1">
                Gulf Coast Florida
              </div>
              <div className="mb-2">
                {/* Placeholder for more territories */}
              </div>
            </div>
            {/* Absence */}
            <div className="mb-4">
              <div className="font-semibold mb-1">
                Absence <span className="text-gray-400 cursor-pointer">ⓘ</span>
              </div>
              <div className="p-2 border-2 border-dashed border-blue-400 rounded bg-blue-50 text-blue-700 cursor-move">
                Absence
              </div>
            </div>
            {/* Lunch Break */}
            <div className="mb-4">
              <div className="font-semibold mb-1">
                Lunch Break{" "}
                <span className="text-gray-400 cursor-pointer">ⓘ</span>
              </div>
              <div className="p-2 border-2 border-dashed border-gray-400 rounded bg-gray-100 text-gray-700 cursor-move">
                Lunch Break
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-2">
          <button className="w-full py-2 bg-gray-200 rounded">
            Undo all changes
          </button>
          <button className="w-full py-2 bg-gray-200 rounded">
            Save as default week
          </button>
          <button className="w-full py-2 bg-blue-600 text-white rounded">
            Save for this week only
          </button>
        </div>
      </div>
      {/* Calendar */}
      <div className="flex-1 p-2 md:p-8 overflow-x-auto">
        <div className="mb-4 text-xl font-semibold">Hours of Operation</div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="border rounded overflow-hidden select-none">
            {/* Days Header */}
            <div className="grid grid-cols-8 bg-gray-100 border-b">
              <div className="h-10 flex items-center justify-center font-bold"></div>
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="h-10 flex items-center justify-center font-bold"
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Time Grid */}
            <div className="relative">
              <div className="grid grid-cols-8">
                {/* Time Labels */}
                <div className="flex flex-col">
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="h-10 flex items-center justify-center text-xs border-b"
                    >
                      {format(setHours(new Date(), h), "h a")}
                    </div>
                  ))}
                </div>
                {/* Days Columns */}
                {DAYS.map((_, dayIdx) => (
                  <div key={dayIdx} className="relative">
                    {/* Blocks */}
                    {renderBlocks(dayIdx)}
                    {renderDrawPreview(dayIdx)}
                    {/* Grid Cells */}
                    {HOURS.map((hour) => (
                      <CellDroppable key={hour} day={dayIdx} hour={hour}>
                        <div
                          className={`absolute inset-0 ${drawing &&
                            drawing.day === dayIdx &&
                            drawPreview &&
                            isInDrawRange(drawPreview, hour)
                            ? "bg-blue-200"
                            : "hover:bg-blue-50"
                            }`}
                          onMouseDown={() => handleMouseDown(dayIdx, hour)}
                          onMouseEnter={() => handleMouseEnter(dayIdx, hour)}
                          onMouseUp={() => handleMouseUp(dayIdx, hour)}
                        />
                      </CellDroppable>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

function isInDrawRange(
  drawPreview: { startHour: number; endHour: number },
  hour: number
) {
  const min = Math.min(drawPreview.startHour, drawPreview.endHour);
  const max = Math.max(drawPreview.startHour, drawPreview.endHour);
  return hour >= min && hour <= max;
}

export default function Page() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto">
          Edit Hours of Operation
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[98vw] sm:max-w-[90vw] md:max-w-[900px] lg:max-w-[1200px] p-0"
      >
        <HoursOfOperationPanel />
      </SheetContent>
    </Sheet>
  );
}
