"use client";

import { useState } from "react";
import { Skeleton } from "@/components/shadcn/skeleton";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import dynamic from "next/dynamic";
import { useRouteView } from "@/contexts/route-view-context";
import { cn } from "@/lib/utils";

const MapContainerWrapper = dynamic(
  () =>
    import("./map-container-wrapper").then((mod) => mod.MapContainerWrapper),
  {
    ssr: false,
  }
);

export function RouteMap({
  ordersRouteView,
}: {
  ordersRouteView: OrdersRouteView[];
}) {
  const [allRoutesLoaded, setAllRoutesLoaded] = useState(false);
  const { isMapExpanded } = useRouteView();

  return (
    <div
      className={cn(
        "w-full h-[400px] relative",
        isMapExpanded ? "h-[600px]" : "h-[240px]"
      )}
    >
      <div className={`${allRoutesLoaded ? "" : "invisible"} w-full h-full`}>
        <MapContainerWrapper
          ordersRouteView={ordersRouteView}
          setAllRoutesLoaded={setAllRoutesLoaded}
        />
      </div>
      {!allRoutesLoaded && (
        <Skeleton className="absolute top-0 left-0 z-20 w-full h-full" />
      )}
    </div>
  );
}
