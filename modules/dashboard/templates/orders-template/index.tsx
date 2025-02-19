import { OrdersStats } from "../../components/orders-stats";
import RecentOrdersCard from "../../components/recent-orders-card";
import RevenueGoalCard from "../../components/revenue-goal-card";

export default function OrdersTemplate() {
  return (
    <div className="grid grid-cols-8 gap-5">
      <div className="lg:col-span-6 col-span-8">
        <OrdersStats />
      </div>
      <div className="lg:col-span-2 space-y-5 lg:-mt-10 col-span-8">
        <RevenueGoalCard />
        <RecentOrdersCard />
      </div>
    </div>
  );
}
