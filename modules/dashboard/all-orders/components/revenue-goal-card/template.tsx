import { getRevenueGoal } from "@/mocks/orders/orders";
import RevenueGoalCard from ".";

export async function RevenueGoalCardTemplate() {
  const revenueGoal = await getRevenueGoal();

  if (!revenueGoal) {
    return <div className="text-center">Failed to load revenue goal</div>
  }

  return <RevenueGoalCard initialCurrent={revenueGoal.current} initialTarget={revenueGoal.target} />
}