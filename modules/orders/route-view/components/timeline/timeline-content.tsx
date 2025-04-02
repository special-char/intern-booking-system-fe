"use client";

import DraggableScroll from "@/components/common/draggable-scroll";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { useEffect } from "react";
import { TimelineHoursHeader } from "./timeline-hours-header";
import { TimelineRow } from "./timeline-row";
import { useState } from "react";
import { useRef } from "react";

interface TimelineContentProps {
  ordersRouteView: OrdersRouteView[];
}

const HOUR_MIN_WIDTH = 80;
const START_BLOCK_WIDTH = 80;
const FINISH_BLOCK_WIDTH = 40;
const hoursRange = Array.from({ length: 14 }, (_, i) => 7 + i);
const timelineMinWidth =
  START_BLOCK_WIDTH + hoursRange.length * HOUR_MIN_WIDTH + FINISH_BLOCK_WIDTH;

export function TimelineContent({ ordersRouteView }: TimelineContentProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(timelineMinWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setContainerWidth(timelineRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const hourWidth =
    (containerWidth - START_BLOCK_WIDTH - FINISH_BLOCK_WIDTH) /
    hoursRange.length;

  return (
    <DraggableScroll className="flex-1 w-full" style={{ height: "100%" }}>
      <div
        ref={timelineRef}
        style={{ minWidth: timelineMinWidth, width: "100%" }}
        className="relative"
      >
        <TimelineHoursHeader
          hourWidth={hourWidth}
          hoursRange={hoursRange}
          START_BLOCK_WIDTH={START_BLOCK_WIDTH}
          FINISH_BLOCK_WIDTH={FINISH_BLOCK_WIDTH}
        />
        {ordersRouteView.map((driver) => (
          <TimelineRow
            key={driver.id}
            driver={driver}
            hourWidth={hourWidth}
            hoursRange={hoursRange}
            START_BLOCK_WIDTH={START_BLOCK_WIDTH}
            FINISH_BLOCK_WIDTH={FINISH_BLOCK_WIDTH}
          />
        ))}
      </div>
    </DraggableScroll>
  );
}
