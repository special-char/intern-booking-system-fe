import { RouteViewTemplate } from "@/modules/orders/route-view/templates/route-view-template";
import { getOrdersRouteView } from "@/mocks/orders-route-view";

export default async function RouteView() {
  const ordersRouteView = await getOrdersRouteView();

  if (!ordersRouteView) {
    return <div className="text-center">No orders route view found</div>;
  }

  return <RouteViewTemplate ordersRouteView={ordersRouteView} />;
}
