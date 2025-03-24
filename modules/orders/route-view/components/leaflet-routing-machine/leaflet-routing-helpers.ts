import L from "leaflet";

function createCustomMarker(
  i: number,
  waypoint: L.Routing.Waypoint,
  driver: { stops: { lat: number; lng: number; type: string }[] },
  houseIconHtml: string
) {
  const commonMarkerStyle = `
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    `;

  if (i === 0 || i === driver.stops.length + 1) {
    return L.marker(waypoint.latLng, {
      icon: L.divIcon({
        className: "custom-marker base-marker",
        html: `
            <div style="
              color: #1E1B4B;
              background-color: #e8e8ed;
              border: 1px solid #1E1B4B;
              ${commonMarkerStyle}
            ">
              ${houseIconHtml}
            </div>
          `,
        iconSize: [16, 16],
        iconAnchor: [12, 12],
      }),
    });
  } else {
    const stopIndex = i - 1;
    const { type } = driver.stops[stopIndex];

    const color = type === "tire-inspection" ? "#EA580C" : "#7E22CE";
    const backgroundColor = type === "tire-inspection" ? "#FFF7ED" : "#FAF5FF";

    return L.marker(waypoint.latLng, {
      icon: L.divIcon({
        className: "custom-marker",
        html: `
            <div style="
              color: ${color};
              background-color: ${backgroundColor};
              border: 1px solid ${color};
              ${commonMarkerStyle}
            ">
              ${stopIndex + 1}
            </div>
          `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    });
  }
}

export function createWaypoints(
  driver: { stops: { lat: number; lng: number; type: string }[] },
  base: L.LatLngExpression
) {
  return [
    base,
    ...driver.stops.map((stop) => L.latLng(stop.lat, stop.lng)),
    base,
  ];
}

export function createRoutingPlan(
  waypoints: L.LatLng[],
  driver: { stops: { lat: number; lng: number; type: string }[] },
  houseIconHtml: string
) {
  return new L.Routing.Plan(waypoints, {
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker: (i, waypoint) =>
      createCustomMarker(i, waypoint, driver, houseIconHtml),
  });
}
