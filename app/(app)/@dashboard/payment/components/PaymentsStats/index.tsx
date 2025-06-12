import { ArrowUpRight, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
import { StatCard } from "./StatCard"
import { PaymentStats as PaymentStatsType } from "../../types"

interface PaymentsStatsProps {
   stats: PaymentStatsType
}

export function PaymentsStats({ stats }: PaymentsStatsProps) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard
            title="Total Revenue"
            value={`₹${stats.totalAmount.toFixed(2)}`}
            icon={ArrowUpRight}
            iconColor="#059669"
            description={`${stats.totalCount} transactions`}
         />
         <StatCard
            title="Completed Payments"
            value={stats.completedPayments}
            icon={CheckCircle2}
            iconColor="#059669"
            description="Successfully captured"
         />
         <StatCard
            title="Failed Payments"
            value={stats.failedPayments}
            icon={AlertCircle}
            iconColor="#DC2626"
            description="Payment failures"
         />
         <StatCard
            title="Success Rate"
            value={`${stats.successRate.toFixed(1)}%`}
            icon={TrendingUp}
            iconColor="#7C3AED"
            description="Payment success rate"
         />
      </div>
   )
}
