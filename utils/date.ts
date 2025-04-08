import moment, { Moment } from "moment";

export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function getLocalDateString(date?: Date): string {
  return moment(date).format('YYYY-MM-DD')
}

export function getLocalStartWeekDateString(date?: Date): string {
  return moment(date).startOf("isoWeek").format("YYYY-MM-DD");
}
export function getLocalEndWeekDateString(date?: Date): string {
  return moment(date).endOf("isoWeek").format("YYYY-MM-DD");
}

export function getLocalNowDateString() {
  return moment().format("YYYY-MM-DDTHH:mm:ss");
}

export function getWeekDays(dateString: string): string[] {
  const inputDate: Moment = moment(dateString);
  const monday: Moment = inputDate.clone().startOf('isoWeek');

  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(monday.clone().add(i, 'days').format("YYYY-MM-DD"));
  }

  return weekDates;
}