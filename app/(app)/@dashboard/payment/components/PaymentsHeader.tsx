import { Button } from "@/components/shadcn/button"
import { Download, RefreshCw } from "lucide-react"

interface PaymentsHeaderProps {
   onRefresh: () => void
   onExport: () => void
   refreshing: boolean
}

export function PaymentsHeader({ onRefresh, onExport, refreshing }: PaymentsHeaderProps) {
   return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
         <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
               Payment History Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-base md:text-lg">
               Track and manage all your Razorpay transactions in real-time
            </p>
         </div>
         <div className="flex items-center gap-3">
            <Button onClick={onRefresh} disabled={refreshing} variant="outline" className="gap-2">
               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
               Refresh
            </Button>

            <div className="flex items-center gap-3">
               <Button
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={onExport}
               >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">Export PDF</span>
               </Button>
            </div>
         </div>
      </div>
   )
}
