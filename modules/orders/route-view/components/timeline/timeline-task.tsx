import { cn } from "@/lib/utils";

interface TimelineTaskProps {
  stop: {
    id: string;
    startHour: number;
    endHour: number;
    type: string;
  };
  index: number | null;
  hourWidth: number;
  START_BLOCK_WIDTH: number;
  hoursRange: number[];
}

function getTaskBackground(stop: { type: string }) {
  switch (stop.type) {
    case "break":
      return "bg-bg-secondary border border-border-primary";
    case "tire-inspection":
      return "bg-orange-50 border border-orange-600 text-orange-600";
    case "tire-installation":
      return "bg-purple-50 border border-purple-600 text-purple-600";
    default:
      return "bg-bg-secondary border border-border-primary";
  }
}

export function TimelineTask({
  stop,
  index,
  hourWidth,
  START_BLOCK_WIDTH,
  hoursRange,
}: TimelineTaskProps) {
  const startOffset =
    START_BLOCK_WIDTH + (stop.startHour - hoursRange[0]) * hourWidth;
  const taskDuration = (stop.endHour - stop.startHour) * hourWidth;
  return (
    <div
      className={cn(
        "absolute top-5 h-6 flex items-center justify-center text-xs rounded-lg font-semibold pl-1",
        getTaskBackground(stop)
      )}
      style={{
        left: startOffset,
        width: taskDuration,
        minWidth: "50px",
      }}
    >
      {stop.type === "break" ? "🍔" : index !== null ? index + 1 : ""}
    </div>
  );
}
