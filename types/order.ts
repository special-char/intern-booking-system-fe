export type Order = {
  id: string;
  date: string;
  orderNumber: string;
  payment: "Paid" | "Not Paid";
  orderStatus: "Delivered" | "Pending" | "Cancelled" | "Shipped";
  totalAmount: number;
  qboStatus: "Synced" | "Pending" | "Failed";
  appointmentDate: string;
  technician: string;
};

export type OrdersRouteView = {
  id: string;
  stops: {
    lat: number;
    lng: number;
    type: "tire-inspection" | "tire-installation";
  }[];
};
