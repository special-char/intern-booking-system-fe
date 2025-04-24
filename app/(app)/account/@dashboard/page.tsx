import OrdersTemplate from "@/modules/dashboard/all-orders/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Dashboard - all orders",
  description: "Treadcommand | Dashboard - all orders",
};

export default async function AllOrdersPage() {
  return (
    <div className="px-6">
      <OrdersTemplate />
    </div>
  );
}
