import { HoursOfOperationTemplate } from "@/modules/territories-availability/hours-of-operation/templates/hours-of-operation-template";
import { getLocalEndWeekDateString, getLocalStartWeekDateString } from "@/utils/date";

export default async function HoursOfOperationPage(props: { searchParams: Promise<{ dateRange: { from: string, to: string } }> }) {
  const { dateRange } =
    !!Object.keys(await props?.searchParams).length
      ? await props?.searchParams
      : { dateRange: { from: getLocalStartWeekDateString(), to: getLocalEndWeekDateString() } };

  return (<HoursOfOperationTemplate dateRange={dateRange} />);
}