
interface HeaderProps {
  dateRange: {
    from: string
    to: string
  }
}

export function Header({ dateRange }: HeaderProps) {
  const fromDate: Date = new Date(dateRange.from);
  const toDate: Date = new Date(dateRange.to);

  const dayFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', { day: '2-digit' });
  const monthFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'long' });

  const fromDay: string = dayFormatter.format(fromDate);
  const toDay: string = dayFormatter.format(toDate);
  const month: string = monthFormatter.format(fromDate);
  const year: string = toDate.getFullYear().toString();

  return (
    <p className="text-center text-xl font-semibold relative">
      Week {fromDay} – {toDay} {month} <span className="text-sm font-normal absolute top-0 ml-2">{year}</span>
    </p>
  );
}