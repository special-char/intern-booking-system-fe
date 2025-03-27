export type OrdersRouteView = {
  id: string;
  stops: {
    lat: number;
    lng: number;
    type: "tire-inspection" | "tire-installation";
  }[];
};
