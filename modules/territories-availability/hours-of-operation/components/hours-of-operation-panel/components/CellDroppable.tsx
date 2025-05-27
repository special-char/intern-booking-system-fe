import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface CellDroppableProps {
    day: number;
    hour: number;
    children?: React.ReactNode;
    cellHeight?: number;
}

export function CellDroppable({ day, hour, children, cellHeight = 56 }: CellDroppableProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: `cell-${day}-${hour}`,
        data: { day, hour },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "last:border-b border-t relative",
                isOver && "bg-primary/10"
            )}
            style={{ height: cellHeight }}
        >
            {children}
        </div>
    );
} 