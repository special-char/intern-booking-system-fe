"use client";

import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { OrdersRouteView } from "@/types/orders/orders-route-view";
import { House } from "lucide-react";
import { createRoutingPlan } from "./leaflet-routing-helpers";
import { createWaypoints } from "./leaflet-routing-helpers";

export interface LeafletRoutingMachineProps {
  onAllRoutesLoaded?: () => void;
  ordersRouteView: OrdersRouteView[];
}

function LeafletRoutingMachine({
  onAllRoutesLoaded,
  ordersRouteView,
}: LeafletRoutingMachineProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const base = L.latLng(28.5383, -81.3792);

    const drivers = ordersRouteView.map((order) => ({
      color: order.color,
      stops: order.stops
        .filter((stop) => stop.type !== "break")
        .map((stop) => ({
          lat: stop.lat,
          lng: stop.lng,
          type: stop.type,
        })),
    }));

    let finishedCount = 0;
    const totalCount = drivers.length;

    function checkLoaded() {
      finishedCount++;
      if (finishedCount === totalCount) {
        onAllRoutesLoaded?.();
      }
    }

    const houseIconHtml = ReactDOMServer.renderToStaticMarkup(
      <House size={14} />
    );

    drivers.forEach((driver) => {
      const waypoints = createWaypoints(driver, base);
      const plan = createRoutingPlan(
        waypoints as L.LatLng[],
        driver,
        houseIconHtml
      );

      const lineOptions: L.Routing.LineOptions = {
        styles: [{ color: driver.color, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      };

      const control = L.Routing.control({
        plan,
        lineOptions,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        router: new L.Routing.OSRMv1({
          serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
          timeout: 30000,
        }),
      });

      control.on("routesfound", checkLoaded);
      control.on("routingerror", checkLoaded);
      control.addTo(map);
    });
  }, [map, onAllRoutesLoaded, ordersRouteView]);

  return null;
}

export default LeafletRoutingMachine;
