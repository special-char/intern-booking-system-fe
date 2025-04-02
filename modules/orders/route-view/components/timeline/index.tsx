import React from "react";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { TimelineHeader } from "./timeline-header";
import { TimelineContent } from "./timeline-content";
import { DriversPanel } from "./drivers-panel";

interface TimeLineProps {
  ordersRouteView: OrdersRouteView[];
}

export const TimeLine: React.FC<TimeLineProps> = ({ ordersRouteView }) => {
  return (
    <div className="space-y-2">
      <TimelineHeader />
      <div className="max-w-full max-h-[400px] bg-white rounded-lg pb-3">
        <div className="flex">
          <DriversPanel ordersRouteView={ordersRouteView} />
          <TimelineContent ordersRouteView={ordersRouteView} />
        </div>
      </div>
    </div>
  );
};
