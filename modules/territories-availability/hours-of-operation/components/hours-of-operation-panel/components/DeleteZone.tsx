import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteZoneProps {
    setIsDraggingOverDeleteZone: (isOver: boolean) => void;
    currentDraggedBlock: string | null;
}

export function DeleteZone({ setIsDraggingOverDeleteZone, currentDraggedBlock }: DeleteZoneProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: "delete-zone",
        data: { isDeleteZone: true },
    });

    useEffect(() => {
        setIsDraggingOverDeleteZone(isOver);
    }, [isOver, setIsDraggingOverDeleteZone]);

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "absolute right-0 top-0 bottom-0 w-12 z-10 flex items-center justify-center transition-all duration-200",
                isOver && currentDraggedBlock
                    ? "bg-destructive/5 border-r-2 border-destructive shadow-[-4px_0_8px_-4px_rgba(239,68,68,0.3)]"
                    : ""
            )}
        >
            {isOver && currentDraggedBlock && (
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive">
                    <Trash2 className="w-4 h-4 text-destructive" />
                </div>
            )}
        </div>
    );
} 