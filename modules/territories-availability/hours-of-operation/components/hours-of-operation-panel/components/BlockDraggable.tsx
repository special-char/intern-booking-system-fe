import React, { useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { OpenHours } from "../types";
import { formatTime, getTerritoryColor } from "../../../lib/utils";

interface BlockDraggableProps {
  block: OpenHours;
  isOverlay?: boolean;
  onContextMenu?: (e: React.MouseEvent, blockId: string) => void;
  onResizeStart?: (
    e: React.MouseEvent,
    block: OpenHours,
    height: number
  ) => void;
  cellHeight?: number;
}

export function BlockDraggable({
  block,
  isOverlay = false,
  onContextMenu,
  onResizeStart,
  cellHeight = 56,
}: BlockDraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: block,
  });

  const blockRef = useRef<HTMLDivElement>(null);
  const [isOnResizeHandle, setIsOnResizeHandle] = useState(false);

  const top = (block.start - 6) * cellHeight;
  const height = (block.end - block.start) * cellHeight - 4;
  const { color, bgColor } = getTerritoryColor(block.territory);
  const territoryLabel =
    block.territory.charAt(0).toUpperCase() + block.territory.slice(1);

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onResizeStart) onResizeStart(e, block, height);
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        blockRef.current = node;
      }}
      {...attributes}
      {...(!isOnResizeHandle && !isOverlay ? listeners : {})}
      className={cn(
        isOverlay
          ? "mx-1 p-2 rounded-md border font-medium flex flex-col shadow-lg z-50 transition-all duration-200"
          : "absolute left-0 right-0 mx-1 p-2 rounded-md border font-medium flex flex-col shadow-sm z-20 transition-all duration-200",
        isDragging && "border border-dashed",
        "hover:shadow-md hover:brightness-95 active:brightness-90"
      )}
      style={
        isOverlay
          ? {
              borderColor: color,
              backgroundColor: bgColor,
              height,
              width: "100%",
              pointerEvents: "none",
            }
          : {
              top,
              height,
              cursor: isOnResizeHandle ? "ns-resize" : "grab",
              borderColor: color,
              backgroundColor: bgColor,
            }
      }
      onContextMenu={
        onContextMenu ? (e) => onContextMenu(e, block.id) : undefined
      }
    >
      {!isDragging && (
        <>
          <div className="text-sm">{territoryLabel}</div>
          <div className="text-xs font-normal">
            {formatTime(block.start)} - {formatTime(block.end)}
          </div>
        </>
      )}
      {/* Improved resize handle */}
      <div
        data-resize-handle
        className={cn(
          "absolute left-0 right-0 bottom-0 h-2 flex items-center justify-center cursor-ns-resize rounded-b-md transition-all duration-200",
          "hover:bg-black/10 hover:bg-opacity-10"
        )}
        onMouseEnter={() => setIsOnResizeHandle(true)}
        onMouseLeave={() => setIsOnResizeHandle(false)}
        onMouseDown={handleResizeStart}
      ></div>
    </div>
  );
}
