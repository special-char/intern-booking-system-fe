import moment from "moment";

export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function getLocalTodayDateString(date?: Date): string {
  return moment(date).format('YYYY-MM-DD')
}

export function getLocalNowDateString() {
  return moment().format("YYYY-MM-DDTHH:mm:ss");
}
