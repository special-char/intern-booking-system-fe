import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useRouteView } from "@/contexts/route-view-context";
export function ResizeMap() {
  const { isMapExpanded } = useRouteView();
  const map = useMap();

  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [isMapExpanded, map]);

  return null;
}
