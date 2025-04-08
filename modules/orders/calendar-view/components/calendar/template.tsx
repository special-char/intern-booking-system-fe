import { OrdersCalendar as OrdersCalendarType } from "@/types/orders/orders-calendar";
import { OrdersCalendar } from ".";
import { getOrdersCalendar } from "@/mocks/orders/orders-calendar";

interface OrdersCalendarTemplateProps {
  date: string;
}

export async function OrdersCalendarTemplate({
  date,
}: OrdersCalendarTemplateProps) {
  const ordersCalendar: OrdersCalendarType | null = await getOrdersCalendar({
    date,
  });

  if (!ordersCalendar) {
    return <div>No orders calendar found</div>;
  }

  return <OrdersCalendar ordersCalendar={ordersCalendar} />;
}
