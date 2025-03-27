import { OrdersCalendarViewTemplate } from "@/modules/orders/calendar-view/templates/calendar-view-template";
import { isValidDate } from "@/utils/date";

export default async function CalendarViewPage(props: { searchParams: Promise<{ date: string }> }) {
  const today: string = new Date().toISOString().split('T')[0];
  const { date } = await props?.searchParams ?? { date: today };

  return <OrdersCalendarViewTemplate date={isValidDate(date) ? date : today} />
}