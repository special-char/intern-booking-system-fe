import { getFormattedDate } from "@/modules/orders/calendar-view/utils";
import moment from "moment";

interface HeaderProps {
  date: string
}

export function Header({ date }: HeaderProps) {
  const { mainDate, year } = formatDate();

  function formatDate() {
    const dateObj: Date = moment(date).toDate();
    const year: string = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(dateObj);

    const mainDate: string = getFormattedDate(date);

    return { mainDate, year };
  }

  return (
    <p className="text-center text-xl font-semibold relative">
      {mainDate} <span className="text-sm font-normal absolute top-0 ml-2">{year}</span>
    </p>
  );
}