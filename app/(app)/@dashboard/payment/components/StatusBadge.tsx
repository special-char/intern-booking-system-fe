import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface StatusBadgeProps {
   status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
   const statusConfig = {
      captured: {
         icon: CheckCircle2,
         className: "bg-green-100 text-green-700 border-green-200",
         label: "Completed",
      },
      authorized: {
         icon: Clock,
         className: "bg-yellow-100 text-yellow-700 border-yellow-200",
         label: "Authorized",
      },
      failed: {
         icon: AlertCircle,
         className: "bg-red-100 text-red-700 border-red-200",
         label: "Failed",
      },
      created: {
         icon: Clock,
         className: "bg-blue-100 text-blue-700 border-blue-200",
         label: "Created",
      },
      paid: {
         icon: CheckCircle2,
         className: "bg-green-100 text-green-700 border-green-200",
         label: "Paid",
      },
      attempted: {
         icon: Clock,
         className: "bg-orange-100 text-orange-700 border-orange-200",
         label: "Attempted",
      },
   }

   const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.created
   const Icon = config.icon

   return (
      <div
         className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${config.className}`}
      >
         <Icon className="w-3.5 h-3.5 mr-1.5" />
         {config.label}
      </div>
   )
}
