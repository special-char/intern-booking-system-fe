export function getStartOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function getEndOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function getStartOfCurrentWeek(date: Date): Date {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = (day + 6) % 7;
  current.setDate(current.getDate() - diffToMonday);
  current.setHours(0, 0, 0, 0);
  return current;
}

export function getEndOfCurrentWeek(date: Date): Date {
  const start = getStartOfCurrentWeek(date);
  start.setDate(start.getDate() + 6);
  start.setHours(23, 59, 59, 999);
  return start;
}

export function getPercentageChange(
  oldValue: number,
  newValue: number
): number {
  if (oldValue === 0 && newValue === 0) {
    return 0;
  }
  if (oldValue === 0 && newValue !== 0) {
    return 100;
  }
  return ((newValue - oldValue) / oldValue) * 100;
}
