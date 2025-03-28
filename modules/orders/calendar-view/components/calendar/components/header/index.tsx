interface HeaderProps {
  date: string
}

export function Header({ date }: HeaderProps) {
  const { mainDate, year } = formatDate();

  function formatDate() {
    const dateObj: Date = new Date(date);
    const year: string = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(dateObj);

    const mainDate: string = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(dateObj);

    return { mainDate, year };
  }

  return (
    <p className="text-center text-xl font-semibold relative">
      {mainDate} <span className="text-sm font-normal absolute top-0 ml-2">{year}</span>
    </p>
  );
}