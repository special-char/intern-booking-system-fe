import { HoursOfOperationTemplate } from "@/modules/territories-availability/hours-of-operation/templates/hours-of-operation-template";
import { DateRange } from "@/types/date";
import { getLocalEndWeekDateString, getLocalStartWeekDateString, isValidDateString } from "@/utils/date";
import { safeParseJSON } from "@/utils/safe-parse-json";

export default async function HoursOfOperationPage(props: { searchParams: Promise<{ dateRange: string, filters: string, search: string }> }) {
  const params = await props.searchParams
  const { dateRange = "", filters = "", search = "" } = params;

  const dateRangeObject: DateRange = safeParseJSON(decodeURIComponent(dateRange));
  const filtersObject: Record<string, boolean> = safeParseJSON(decodeURIComponent(filters));

  const thisWeekDateRange = { from: getLocalStartWeekDateString(), to: getLocalEndWeekDateString() };

  return (
    <HoursOfOperationTemplate
      dateRange={
        Object.keys(dateRangeObject).length
          ? {
            from: isValidDateString(dateRangeObject.from) ? dateRangeObject.from : thisWeekDateRange.from,
            to: isValidDateString(dateRangeObject.to) ? dateRangeObject.to : thisWeekDateRange.to
          }
          : thisWeekDateRange
      }
      filters={filtersObject}
      search={search}
    />);
}