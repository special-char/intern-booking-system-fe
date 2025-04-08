import { point, polygon as turfPolygon } from "@turf/helpers";
import { Polygon, Tooltip } from "react-leaflet";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { zones } from "../consts";
import { useMemo } from "react";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import "./zones-layer.styles.css";

export function ZonesLayer({
  zoom,
  ordersCalendarData,
}: {
  zoom: number;
  ordersCalendarData: OrdersCalendar;
}) {
  const ZOOM_THRESHOLD = 14;

  const markersData = useMemo(() => {
    return ordersCalendarData.data.flatMap((d) => d.events);
  }, [ordersCalendarData]);

  const closePolygon = (coords: [number, number][]): [number, number][] => {
    if (coords.length < 3) return coords;
    const [firstLat, firstLng] = coords[0];
    const [lastLat, lastLng] = coords[coords.length - 1];
    if (firstLat !== lastLat || firstLng !== lastLng) {
      return [...coords, coords[0]];
    }
    return coords;
  };

  const isPointInPolygon = (
    [lat, lng]: [number, number],
    polygonCoords: [number, number][]
  ): boolean => {
    const pt = point([lng, lat]);
    const poly = turfPolygon([
      closePolygon(polygonCoords).map(([lat, lng]) => [lng, lat]),
    ]);
    return booleanPointInPolygon(pt, poly);
  };

  const countMarkersInZone = (zone: {
    coordinates: [number, number][];
  }): number => {
    return markersData.filter((m) =>
      isPointInPolygon(m.position, zone.coordinates)
    ).length;
  };

  if (zoom > ZOOM_THRESHOLD) {
    return null;
  }
  return (
    <>
      {zones.map((zone) => {
        const markerCount = countMarkersInZone(zone);
        return (
          <Polygon
            key={zone.name}
            pathOptions={{ color: zone.color, fillOpacity: 0.2 }}
            positions={zone.coordinates}
          >
            <Tooltip direction="center" permanent>
              <div className="text-xl">{markerCount}</div>
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
}
