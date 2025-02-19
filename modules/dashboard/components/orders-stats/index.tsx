import StatsCard from "@/modules/dashboard/components/stats-card";

export function OrdersStats() {
  const data = [
    {
      amount: 1000,
      percentageChange: 10,
      period: "last week",
      title: "Revenue goal for this month",
      description: "Revenue goal for this month",
    },
    {
      amount: 1000,
      percentageChange: 10,
      period: "last week",
      title: "Orders this week",
      description: "Revenue goal for this month",
    },
    {
      amount: 1000,
      percentageChange: 10,
      period: "last week",
      title: "Orders today",
      description: "Revenue goal for this month",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {data.map((item) => (
        <StatsCard key={item.title} {...item} className="col-span-2" />
      ))}
    </div>
  );
}
