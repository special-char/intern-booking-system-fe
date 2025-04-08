import { OrderStatusEnum } from "@/types/orders/order";

export interface Zone {
  name: string;
  color: string;
  coordinates: [number, number][];
}

export const OrderStatuses: OrderStatusEnum[] = [
  OrderStatusEnum.OnHold,
  OrderStatusEnum.Completed,
  OrderStatusEnum.Cancelled,
  OrderStatusEnum.Refunded,
  OrderStatusEnum.Failed,
];

export const orlandoBounds = {
  minLat: 28.45,
  maxLat: 28.6,
  minLng: -81.41,
  maxLng: -81.27,
};

const centerLat = (orlandoBounds.minLat + orlandoBounds.maxLat) / 2;
const centerLng = (orlandoBounds.minLng + orlandoBounds.maxLng) / 2;

export const zones: Zone[] = [
  {
    name: "Orlando NW",
    color: "blue",
    coordinates: [
      [orlandoBounds.maxLat, orlandoBounds.minLng],
      [orlandoBounds.maxLat, centerLng],
      [centerLat, centerLng],
      [centerLat, orlandoBounds.minLng],
      [orlandoBounds.maxLat, orlandoBounds.minLng],
    ],
  },
  {
    name: "Orlando NE",
    color: "red",
    coordinates: [
      [orlandoBounds.maxLat, centerLng],
      [orlandoBounds.maxLat, orlandoBounds.maxLng],
      [centerLat, orlandoBounds.maxLng],
      [centerLat, centerLng],
      [orlandoBounds.maxLat, centerLng],
    ],
  },
  {
    name: "Orlando SW",
    color: "green",
    coordinates: [
      [centerLat, orlandoBounds.minLng],
      [centerLat, centerLng],
      [orlandoBounds.minLat, centerLng],
      [orlandoBounds.minLat, orlandoBounds.minLng],
      [centerLat, orlandoBounds.minLng],
    ],
  },
  {
    name: "Orlando SE",
    color: "orange",
    coordinates: [
      [centerLat, centerLng],
      [centerLat, orlandoBounds.maxLng],
      [orlandoBounds.minLat, orlandoBounds.maxLng],
      [orlandoBounds.minLat, centerLng],
      [centerLat, centerLng],
    ],
  },
];
