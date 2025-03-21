import { StatsCardSkeleton } from "../stats-card/skeleton";

export function OrdersStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <StatsCardSkeleton key={index} />
      ))}
    </div>
  );
}
