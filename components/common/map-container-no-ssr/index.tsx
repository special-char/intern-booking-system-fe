import dynamic from "next/dynamic";
import { MapContainerProps } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

export function MapContainerNoSSR({
  children,
  props,
}: {
  children: React.ReactNode;
  props: MapContainerProps;
}) {
  return <MapContainer {...props}>{children}</MapContainer>;
}
