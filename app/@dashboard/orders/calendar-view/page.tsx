import { OrdersCalendarViewTemplate } from "@/modules/orders/calendar-view/templates/calendar-view-template";
import { isValidDate } from "@/utils/date";
import { safeParseJSON } from "@/utils/safe-parse-json";

export default async function CalendarViewPage(props: { searchParams: Promise<{ date: string, filters: string }> }) {
  const today: string = new Date().toISOString().split('T')[0];
  const { date, filters } = await props?.searchParams ?? { date: today, filters: "" };
  const filtersObject: Record<string, boolean> = safeParseJSON(decodeURIComponent(filters));

  return (
    <OrdersCalendarViewTemplate
      date={isValidDate(date) ? date : today}
      filters={filtersObject}
    />
  )
}