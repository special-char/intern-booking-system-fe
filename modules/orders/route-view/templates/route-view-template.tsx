"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import dynamic from "next/dynamic";
import { OrdersRouteView } from "@/types/order";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Skeleton } from "@/components/shadcn/skeleton";

const LeafletRoutingMachine = dynamic(
  () => import("../components/leaflet-routing-machine"),
  { ssr: false }
);

export function RouteViewTemplate({
  ordersRouteView,
}: {
  ordersRouteView: OrdersRouteView[];
}) {
  const [allRoutesLoaded, setAllRoutesLoaded] = useState(false);

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
    <div className="space-y-5 mt-5 px-4">
      <h1 className="text-xl font-semibold text-center">
        {formattedDate}{" "}
        <span className="text-xs font-normal align-top">{formattedYear}</span>
      </h1>
      <div className="w-full h-[400px] relative">
        <div className={`${allRoutesLoaded ? "" : "invisible"} w-full h-full`}>
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
          </MapContainer>
        </div>
        {!allRoutesLoaded && (
          <Skeleton className="absolute top-0 left-0 z-20 w-full h-full" />
        )}
      </div>
    </div>
  );
}
