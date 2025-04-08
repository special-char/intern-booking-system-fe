"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function ZoomWatcher({ setZoom }: { setZoom: (zoom: number) => void }) {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      setZoom(map.getZoom());
    };
    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, setZoom]);

  return null;
}
