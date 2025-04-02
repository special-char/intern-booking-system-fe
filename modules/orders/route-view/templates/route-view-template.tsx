import React from "react";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { TimeLine } from "../components/timeline";
import { RouteMap } from "../components/route-map";
import { RouteViewProvider } from "@/contexts/route-view-context";

export function RouteViewTemplate({
  ordersRouteView,
}: {
  ordersRouteView: OrdersRouteView[];
}) {
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedYear = date.toLocaleDateString("en-GB", {
    year: "numeric",
  });

  return (
    <RouteViewProvider>
      <div className="space-y-5 mt-5 px-4">
        <h1 className="text-xl font-semibold text-center">
          {formattedDate}{" "}
          <span className="text-xs font-normal align-top">{formattedYear}</span>
        </h1>
        <RouteMap ordersRouteView={ordersRouteView} />
        <TimeLine ordersRouteView={ordersRouteView} />
      </div>
    </RouteViewProvider>
  );
}
