import moment from "moment";

export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function getLocaleDateString(date?: Date): string {
  return moment(date).format('YYYY-MM-DD')
}