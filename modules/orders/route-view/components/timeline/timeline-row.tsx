import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { Flag } from "lucide-react";
import { Truck } from "lucide-react";
import { TimelineTask } from "./timeline-task";

interface TimelineRowProps {
  driver: OrdersRouteView;
  hourWidth: number;
  hoursRange: number[];
  START_BLOCK_WIDTH: number;
  FINISH_BLOCK_WIDTH: number;
}

export function TimelineRow({
  driver,
  hourWidth,
  hoursRange,
  START_BLOCK_WIDTH,
  FINISH_BLOCK_WIDTH,
}: TimelineRowProps) {
  let counter = 0;

  return (
    <div
      className="relative border-b border-gray-100"
      style={{ height: "62px" }}
    >
      <div className="flex border-r h-full">
        <div style={{ width: START_BLOCK_WIDTH }} />
        {hoursRange.map((hour) => (
          <div
            key={hour}
            className="border-r h-full"
            style={{ width: hourWidth }}
          />
        ))}
        <div style={{ width: FINISH_BLOCK_WIDTH }} />
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          left: START_BLOCK_WIDTH / 2,
          right: FINISH_BLOCK_WIDTH / 2,
          top: 28,
          height: "8px",
          backgroundColor: driver.color,
        }}
      />

      {driver.stops.map((stop) => {
        const displayIndex = stop.type === "break" ? null : counter++;
        return (
          <TimelineTask
            key={stop.id}
            stop={stop}
            index={displayIndex}
            hourWidth={hourWidth}
            START_BLOCK_WIDTH={START_BLOCK_WIDTH}
            hoursRange={hoursRange}
          />
        );
      })}

      <StartMarker />
      <FinishMarker />
    </div>
  );
}

const StartMarker: React.FC = () => (
  <div className="absolute ml-1 top-5 h-6 px-6 flex items-center justify-center text-xs rounded-lg bg-bg-secondary border border-border-primary">
    <Truck className="w-5 h-5 text-brand-primary-600" />
  </div>
);

const FinishMarker: React.FC = () => (
  <div className="absolute top-5 h-6 w-7 flex items-center justify-center text-xs rounded-lg border bg-bg-secondary border-border-primary right-0 mr-2">
    <Flag className="w-4 h-4 text-icon-error" />
  </div>
);
