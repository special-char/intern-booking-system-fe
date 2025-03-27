import { OrdersRouteView } from "@/types/orders/orders-route-view";

const MOCKED_ORDERS_ROUTE_VIEW: OrdersRouteView[] = [
  {
    id: "1",
    stops: [
      {
        lat: 28.75,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        lat: 28.75,
        lng: -81.3,
        type: "tire-inspection",
      },
      {
        lat: 28.65,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        lat: 28.65,
        lng: -81.3,
        type: "tire-inspection",
      },
    ],
  },
  {
    id: "2",
    stops: [
      {
        lat: 28.45,
        lng: -81.55,
        type: "tire-inspection",
      },
      {
        lat: 28.45,
        lng: -81.3,
        type: "tire-inspection",
      },
      {
        lat: 28.35,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        lat: 28.35,
        lng: -81.3,
        type: "tire-installation",
      },
    ],
  },
  {
    id: "3",
    stops: [
      {
        lat: 28.55,
        lng: -81.2,
        type: "tire-installation",
      },
      {
        lat: 28.55,
        lng: -81.0,
        type: "tire-inspection",
      },
      {
        lat: 28.45,
        lng: -81.2,
        type: "tire-installation",
      },
      {
        lat: 28.45,
        lng: -81.0,
        type: "tire-inspection",
      },
    ],
  },
];

async function mockFetchOrdersRouteView(): Promise<OrdersRouteView[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCKED_ORDERS_ROUTE_VIEW);
    }, 100)
  ) as Promise<OrdersRouteView[]>;
}

export async function getOrdersRouteView(): Promise<OrdersRouteView[] | null> {
  try {
    return await mockFetchOrdersRouteView();
  } catch (error) {
    console.error(error);
    return null;
  }
}
