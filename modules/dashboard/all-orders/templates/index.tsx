import { Suspense } from "react";
import { OrdersStats } from "../components/orders-stats";
import { OrdersStatsSkeleton } from "../components/orders-stats/skeleton";
import RecentOrdersCard from "../components/recent-orders-card";
import { RecentOrdersCardSkeleton } from "../components/recent-orders-card/skeleton";
import { RevenueGoalCardSkeleton } from "../components/revenue-goal-card/skeleton";
import { RevenueGoalCardTemplate } from "../components/revenue-goal-card/template";

export default function OrdersTemplate() {

  return (
    <div className="grid grid-cols-8 gap-5">
      <div className="lg:col-span-6 col-span-8">
        <Suspense fallback={<OrdersStatsSkeleton />}>
          <OrdersStats />
        </Suspense>
      </div>
      <div className="lg:col-span-2 space-y-5 lg:-mt-10 col-span-8">
        <Suspense fallback={<RevenueGoalCardSkeleton />}>
          <RevenueGoalCardTemplate />
        </Suspense>
        <Suspense fallback={<RecentOrdersCardSkeleton />}>
          <RecentOrdersCard />
        </Suspense>
      </div>
    </div>
  );
}
