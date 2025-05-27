import { useEffect } from "react";
import type { OpenHours } from "../types";

interface ResizingState {
    blockId: string | null;
    initialY: number;
    initialHeight: number;
    initialEnd: number;
}

type SetOpenHours = React.Dispatch<React.SetStateAction<OpenHours[]>>;
type SetResizing = React.Dispatch<React.SetStateAction<ResizingState>>;

export function useResizableBlock(
    openHours: OpenHours[],
    resizing: ResizingState,
    setOpenHours: SetOpenHours,
    setResizing: SetResizing,
    hours: number[],
    cellHeight: number
) {
    useEffect(() => {
        if (!resizing.blockId) return;

        const block = openHours.find((b) => b.id === resizing.blockId);
        if (!block) return;

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();

            const deltaY = e.clientY - resizing.initialY;
            const hourDelta = Math.round(deltaY / cellHeight);
            const newEnd = resizing.initialEnd + hourDelta;

            // Constraints
            let finalEnd = newEnd;
            finalEnd = Math.max(block.start + 1, finalEnd);
            const maxHour = hours[hours.length - 1] + 1;
            finalEnd = Math.min(finalEnd, maxHour);

            // Prevent overlap with other blocks
            const blocksOnDay = openHours.filter(
                (b) => b.days === block.days && b.id !== block.id
            );
            const laterBlocks = blocksOnDay.filter((b) => b.start > block.start);
            const nextBlock =
                laterBlocks.length > 0
                    ? laterBlocks.reduce(
                        (closest, current) =>
                            current.start < closest.start ? current : closest,
                        laterBlocks[0]
                    )
                    : null;
            if (nextBlock && finalEnd > nextBlock.start) {
                finalEnd = nextBlock.start;
            }

            if (finalEnd !== block.end) {
                setOpenHours((prev) =>
                    prev.map((b) => (b.id === block.id ? { ...b, end: finalEnd } : b))
                );
            }
        };

        const handleMouseUp = () => {
            document.body.style.cursor = "";
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            setResizing({
                blockId: null,
                initialY: 0,
                initialHeight: 0,
                initialEnd: 0,
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [resizing, openHours, hours, cellHeight, setOpenHours, setResizing]);
} 