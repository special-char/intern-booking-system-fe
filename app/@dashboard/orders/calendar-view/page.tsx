import { OrdersCalendarViewTemplate } from "@/modules/orders/calendar-view/templates/calendar-view-template";
import { getLocalDateString, isValidDateString } from "@/utils/date";
import { safeParseJSON } from "@/utils/safe-parse-json";

export default async function CalendarViewPage(props: { searchParams: Promise<{ date: string, filters: string }> }) {
  const today: string = getLocalDateString()
  const { date, filters } =
    !!Object.keys(await props?.searchParams).length
      ? await props?.searchParams
      : { date: today, filters: "" };
  const filtersObject: Record<string, boolean> = safeParseJSON(decodeURIComponent(filters));

  return (
    <OrdersCalendarViewTemplate
      date={isValidDateString(date) ? date : today}
      filters={filtersObject}
    />
  )
}