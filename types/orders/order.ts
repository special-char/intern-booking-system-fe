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

export enum OrderStatusEnum {
  OnHold = "On Hold",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
  Failed = "Failed",
}
