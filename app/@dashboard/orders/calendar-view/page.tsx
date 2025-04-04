import { OrdersCalendarViewTemplate } from "@/modules/orders/calendar-view/templates/calendar-view-template";
import { getLocalTodayDateString, isValidDateString } from "@/utils/date";
import { safeParseJSON } from "@/utils/safe-parse-json";

export default async function CalendarViewPage(props: { searchParams: Promise<{ date: string, filters: string }> }) {
  const today: string = getLocalTodayDateString()
  const { date, filters } = await props?.searchParams ?? { date: today, filters: "" };
  const filtersObject: Record<string, boolean> = safeParseJSON(decodeURIComponent(filters));

  return (
    <OrdersCalendarViewTemplate
      date={isValidDateString(date) ? date : today}
      filters={filtersObject}
    />
  )
}