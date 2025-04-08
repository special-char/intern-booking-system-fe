"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { createPortal } from "react-dom";
import { OrderStatusEnum } from "@/types/orders/order";
import L from "leaflet";

export function LegendControl({ statuses }: { statuses: OrderStatusEnum[] }) {
  const map = useMap();
  const legendRef = useRef(document.createElement("div"));

  useEffect(() => {
    const legend = new L.Control({ position: "topright" });
    legend.onAdd = () => legendRef.current;
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return createPortal(<LegendContent statuses={statuses} />, legendRef.current);
}

function LegendContent({ statuses = [] }: { statuses: OrderStatusEnum[] }) {
  const statusColorMapping = {
    [OrderStatusEnum.OnHold]: "bg-purple-500",
    [OrderStatusEnum.Completed]: "bg-green-500",
    [OrderStatusEnum.Cancelled]: "bg-orange-500",
    [OrderStatusEnum.Refunded]: "bg-blue-500",
    [OrderStatusEnum.Failed]: "bg-red-500",
  };

  return (
    <div className="rounded-lg bg-white p-4 border text-text-secondary shadow-sm">
      {statuses.map((status) => (
        <div className="flex items-center mb-2" key={status}>
          <span
            className={`inline-block w-2 h-2 rounded-full mr-1 ${
              statusColorMapping[status as keyof typeof statusColorMapping] ||
              "bg-gray-500"
            }`}
          />
          <span>{status}</span>
        </div>
      ))}
    </div>
  );
}
