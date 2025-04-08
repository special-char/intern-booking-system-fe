"use client";

import type { OrdersCalendar as OrdersCalendarType } from "@/types/orders/orders-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { OrdersRegularCalendar } from "./regular";
import { OrdersUnroutedCalendar } from "./unrouted";

interface OrdersCalendarProps {
  ordersCalendar: OrdersCalendarType;
}

export function OrdersCalendar({ ordersCalendar }: OrdersCalendarProps) {
  if (ordersCalendar.isRouted) {
    return <OrdersRegularCalendar ordersCalendar={ordersCalendar} />;
  }
  return <OrdersUnroutedCalendar ordersCalendar={ordersCalendar} />;
}
