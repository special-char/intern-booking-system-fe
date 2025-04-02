export type OrdersRouteView = {
  id: string;
  color: string;
  driver: {
    id: string;
    name: string;
  };
  totalTireInstallation: number;
  totalTireInspection: number;
  stops: {
    id: string;
    startHour: number;
    endHour: number;
    lat: number;
    lng: number;
    type: "tire-inspection" | "tire-installation" | "break";
  }[];
};
