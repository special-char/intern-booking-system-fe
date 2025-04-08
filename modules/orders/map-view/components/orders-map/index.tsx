"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";
import { MapContainerNoSSR } from "@/components/common/map-container-no-ssr";
import { OrderStatuses } from "../consts";
import { AppointmentDetails } from "@/modules/orders/common/components/appointment-details";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useAppointmentDetails } from "@/modules/orders/common/hooks/use-appointment-details";

const ZonesLayer = dynamic(
  () => import("../zones-layer").then((mod) => mod.ZonesLayer),
  { ssr: false }
);
const MarkersLayer = dynamic(
  () => import("../marks-layer").then((mod) => mod.MarkersLayer),
  { ssr: false }
);
const ZoomWatcher = dynamic(
  () => import("../zoom-watcher").then((mod) => mod.ZoomWatcher),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const LegendControl = dynamic(
  () => import("../legend").then((mod) => mod.LegendControl),
  { ssr: false }
);

export function OrdersMap({
  ordersCalendar,
}: {
  ordersCalendar: OrdersCalendar;
}) {
  const [zoom, setZoom] = useState<number>(10);
  const center: [number, number] = [28.54, -81.38];

  const {
    ordersCalendarData,
    appointmentDetails,
    selectedEventId,
    setSelectedEventId,
    onClose,
    onUpdate,
    updateEvent,
  } = useAppointmentDetails(ordersCalendar);

  return (
    <>
      {appointmentDetails && (
        <AppointmentDetails
          isOpen={!!selectedEventId}
          onClose={onClose}
          data={appointmentDetails}
          onAppointmentChange={onUpdate}
          onEventChange={updateEvent}
        />
      )}

      <MapContainerNoSSR
        props={{
          center: center,
          zoom: zoom,
          style: { height: "70vh", width: "100%", zIndex: 0 },
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomWatcher setZoom={setZoom} />
        <ZonesLayer zoom={zoom} ordersCalendarData={ordersCalendarData} />
        <MarkersLayer
          zoom={zoom}
          setSelectedEventId={setSelectedEventId}
          ordersCalendarData={ordersCalendarData}
        />
        <LegendControl statuses={OrderStatuses} />
      </MapContainerNoSSR>
    </>
  );
}
