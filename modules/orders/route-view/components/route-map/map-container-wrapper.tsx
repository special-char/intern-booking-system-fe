"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import LeafletRoutingMachine from "../leaflet-routing-machine";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { ResizeMap } from "./resize-map";

export function MapContainerWrapper({
  ordersRouteView,
  setAllRoutesLoaded,
}: {
  ordersRouteView: OrdersRouteView[];
  setAllRoutesLoaded: (allRoutesLoaded: boolean) => void;
}) {
  return (
    <MapContainer
      center={[28.5383, -81.3792]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LeafletRoutingMachine
        onAllRoutesLoaded={() => setAllRoutesLoaded(true)}
        ordersRouteView={ordersRouteView}
      />
      <ResizeMap />
    </MapContainer>
  );
}
