import { getOrderList } from "@/lib/data/order";
import {
  getEndOfDay,
  getEndOfCurrentWeek,
  getPercentageChange,
  getStartOfCurrentWeek,
  getStartOfDay,
} from "./utilts";
import StatsCard from "../stats-card";

export async function OrdersStats() {
  const now = new Date();

  const startOfToday = getStartOfDay(now);
  const endOfToday = getEndOfDay(now);

  const ordersTodayRes = await getOrderList({
    page: 1,
    limit: 9999,
    filters: {
      created_at: {
        $gte: startOfToday.toISOString(),
        $lte: endOfToday.toISOString(),
      },
      order: "-created_at",
    },
  });

  const todayOrdersCount = (ordersTodayRes?.orders ?? []).length;

  const startOfWeek = getStartOfCurrentWeek(now);
  const endOfWeek = getEndOfCurrentWeek(now);

  const ordersThisWeekRes = await getOrderList({
    page: 1,
    limit: 9999,
    filters: {
      created_at: {
        $gte: startOfWeek.toISOString(),
        $lte: endOfWeek.toISOString(),
      },
      order: "-created_at",
    },
  });

  const thisWeekValue = (ordersThisWeekRes?.orders ?? []).reduce(
    (acc, order) => acc + order.summary.current_order_total,
    0
  );

  const thisWeekOrdersCount = (ordersThisWeekRes?.orders ?? []).length;

  const lastWeekEnd = new Date(startOfWeek.getTime() - 1);
  const lastWeekStart = getStartOfCurrentWeek(lastWeekEnd);

  const ordersLastWeekRes = await getOrderList({
    page: 1,
    limit: 9999,
    filters: {
      created_at: {
        $gte: lastWeekStart.toISOString(),
        $lte: lastWeekEnd.toISOString(),
      },
      order: "-created_at",
    },
  });

  const lastWeekValue = (ordersLastWeekRes?.orders ?? []).reduce(
    (acc, order) => acc + order.summary.current_order_total,
    0
  );

  const changeThisWeek = getPercentageChange(lastWeekValue, thisWeekValue);

  const data = [
    {
      dollarAmount: thisWeekValue,
      percentageChange: changeThisWeek,
      period: "last week",
      title: "Revenue goal for all orders",
      description: "Revenue goal for this month",
    },

    {
      amount: thisWeekOrdersCount,
      percentageChange: changeThisWeek,
      period: "last week",
      title: "Orders this week",
      description: "Suma wartości zamówień z tego tygodnia",
    },
    {
      amount: todayOrdersCount,
      percentageChange: changeThisWeek,
      period: "last week",
      title: "Orders today",
      description: "Suma wartości zamówień z dzisiaj",
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
