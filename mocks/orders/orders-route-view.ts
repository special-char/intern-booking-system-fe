import { OrdersRouteView } from "@/types/orders/orders-route-view";

const MOCKED_ORDERS_ROUTE_VIEW: OrdersRouteView[] = [
  {
    id: "1",
    driver: {
      id: "1",
      name: "John Doe",
    },
    totalTireInstallation: 2,
    totalTireInspection: 2,
    // TODO: Color will be generated in DTO using generateUniqueColors function
    color: "#F472B6",
    stops: [
      {
        id: "1",
        startHour: 7,
        endHour: 9,
        lat: 28.75,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        id: "2",
        startHour: 11,
        endHour: 12,
        lat: 28.75,
        lng: -81.3,
        type: "tire-inspection",
      },
      {
        id: "3",
        startHour: 13.5,
        endHour: 14.5,
        lat: 28.65,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        id: "4",
        startHour: 16,
        endHour: 18,
        lat: 28.65,
        lng: -81.3,
        type: "tire-inspection",
      },
    ],
  },
  {
    id: "2",
    driver: {
      id: "2",
      name: "Johnathan D'Souza",
    },
    totalTireInstallation: 2,
    totalTireInspection: 2,
    // TODO: Color will be generated in DTO using generateUniqueColors function
    color: "#C084FC",
    stops: [
      {
        id: "1",
        startHour: 8,
        endHour: 9.5,
        lat: 28.45,
        lng: -81.55,
        type: "tire-inspection",
      },
      {
        id: "2",
        startHour: 11,
        endHour: 12,
        lat: 28.45,
        lng: -81.3,
        type: "tire-inspection",
      },
      {
        id: "3",
        startHour: 14,
        endHour: 15,
        lat: 28.35,
        lng: -81.55,
        type: "tire-installation",
      },
      {
        id: "4",
        startHour: 16,
        endHour: 15,
        lat: 28.35,
        lng: -81.3,
        type: "tire-installation",
      },
    ],
  },
  {
    id: "3",
    driver: {
      id: "3",
      name: "Martin K.",
    },
    totalTireInstallation: 2,
    totalTireInspection: 2,
    // TODO: Color will be generated in DTO using generateUniqueColors function
    color: "#22C55E",
    stops: [
      {
        id: "1",
        startHour: 9,
        endHour: 10,
        lat: 28.55,
        lng: -81.2,
        type: "tire-installation",
      },
      {
        id: "2",
        startHour: 10.5,
        endHour: 11.5,
        lat: 28.55,
        lng: -81.0,
        type: "tire-inspection",
      },
      {
        id: "3",
        startHour: 12,
        endHour: 12.5,
        lat: 0,
        lng: 0,
        type: "break",
      },
      {
        id: "4",
        startHour: 13,
        endHour: 14,
        lat: 28.45,
        lng: -81.2,
        type: "tire-installation",
      },
      {
        id: "5",
        startHour: 14.5,
        endHour: 16,
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
