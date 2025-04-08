import { OrdersMap } from "../components/orders-map";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { StatusTabs, TabItem } from "../../common/components/status-tabs";
import { Card } from "@/components/shadcn/card";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { getOrdersCalendar } from "@/mocks/orders/orders-calendar";

export async function MapViewTemplate() {
  const tabsData: TabItem[] = [
    { value: "all", label: "All", count: 100 },
    { value: "on-hold", label: "On Hold", count: 10 },
    { value: "completed", label: "Completed", count: 10 },
    { value: "cancelled", label: "Cancelled", count: 10 },
    { value: "refunded", label: "Refunded", count: 10 },
    { value: "failed", label: "Failed", count: 10 },
  ];

  const ordersCalendar: OrdersCalendar | null = await getOrdersCalendar({
    date: new Date().toISOString(),
  });

  if (!ordersCalendar) {
    return <div>No orders calendar found</div>;
  }

  return (
    <Card className="flex flex-col gap-3 py-2 px-3">
      <StatusTabs defaultValue="all" tabs={tabsData} />
      <OrdersMap ordersCalendar={ordersCalendar} />
    </Card>
  );
}
