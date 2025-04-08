"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import MarkerCluster from "react-leaflet-markercluster";
import "./marks-layer.style.css";
import ReactDOMServer from "react-dom/server";
import { MarkerPin } from "@/icons/marker-pin";
import { ToolsIcon } from "@/icons/tools";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { ChevronRightIcon } from "lucide-react";
import { OrderStatusEnum } from "@/types/orders/order";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useAppointmentsData } from "@/modules/orders/common/hooks/use-appointments-data";

const createClusterCustomIcon = function (cluster: typeof MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true),
  });
};

function getMarkerIcon(status: OrderStatusEnum) {
  let color = "blue";
  let stroke = "blue";
  if (status === OrderStatusEnum.OnHold) {
    color = "#aa8fd2";
    stroke = "#660066";
  }
  if (status === OrderStatusEnum.Completed) {
    color = "#defce9";
    stroke = "#00c951";
  }
  if (status === OrderStatusEnum.Cancelled) {
    color = "#ffedd4";
    stroke = "#ff6900";
  }
  if (status === OrderStatusEnum.Refunded) {
    color = "#dbeafe";
    stroke = "#2b7fff";
  }
  if (status === OrderStatusEnum.Failed) {
    color = "#fee1e1";
    stroke = "#fb2c36";
  }

  const iconHtml = ReactDOMServer.renderToStaticMarkup(
    <MarkerPin color={color} stroke={stroke} />
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-marker-wrapper",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export function MarkersLayer({
  zoom,
  setSelectedEventId,
  ordersCalendarData,
}: {
  zoom: number;
  setSelectedEventId: (id: string) => void;
  ordersCalendarData: OrdersCalendar;
}) {
  const { events } = useAppointmentsData({
    ordersCalendar: ordersCalendarData,
  });
  const ZOOM_SHOW_MARKERS = 14;

  if (zoom < ZOOM_SHOW_MARKERS) {
    return null;
  }

  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
      spiderfyOnEveryZoom={true}
      iconCreateFunction={createClusterCustomIcon}
    >
      {events.map((event) => (
        <Marker
          key={event.id}
          position={event.position}
          icon={getMarkerIcon(event.status)}
        >
          <Popup>
            <div className="space-y-3 pt-4">
              <div className="flex gap-2 px-4">
                <ToolsIcon className="text-purple-600 mt-1" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {event.start.toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {`$${event.invoice.sum.toFixed(2)}`}
                    </p>
                    <p className="text-xs text-gray-500">order value</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4">
                <div className="w-4 h-4 bg-gray-200 rounded-sm flex items-center justify-center">
                  <UserIcon className="text-gray-500" />
                </div>

                <span className="text-sm font-semibold text-gray-700">
                  {event.technician.name}
                </span>
              </div>

              <div className="bg-blue-50 px-3">
                <Button
                  variant="link"
                  size="sm"
                  className="no-underline text-blue-600 flex items-center gap-0"
                  onClick={() => setSelectedEventId(event.id)}
                >
                  View more
                  <ChevronRightIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
}
