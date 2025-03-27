import { Order } from "@/types/orders/order";
import { HttpTypes } from "@medusajs/types";

export type OrderPaginationDTO = {
  orders: Order[];
  count: number;
  offset: number;
  limit: number;
};

export const mapOrdersToDTO = (
  response: HttpTypes.AdminOrderListResponse
): OrderPaginationDTO => {
  const orders = response.orders.map((order) => ({
    id: order.id,
    date: new Date(order.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    }),
    orderNumber: order.display_id?.toString() ?? "",
    payment: getPaymentStatus(order.payment_status),
    orderStatus: getOrderStatus(order.status),
    totalAmount: 100,
    qboStatus: "Synced" as const,
    appointmentDate: "2024-01-01",
    technician: "John Doe",
  }));

  return {
    orders,
    count: response.count,
    offset: response.offset,
    limit: response.limit,
  };
};

export const getPaymentStatus = (status: string): "Paid" | "Not Paid" =>
  status === "authorized" ? "Paid" : "Not Paid";

export const getOrderStatus = (status: string): "Pending" | "Delivered" =>
  status === "pending" ? "Pending" : "Delivered";
