import { Card, CardContent, CardHeader } from "@/components/shadcn/card"
import { Button } from "@/components/shadcn/button"
import { RazorpayPayment } from "../types"

interface PaymentDetailsModalProps {
   payment: RazorpayPayment | null
   onClose: () => void
}

export function PaymentDetailsModal({ payment, onClose }: PaymentDetailsModalProps) {
   if (!payment) return null

   return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
         <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl">
            <CardHeader className="border-b bg-gray-50">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
                  <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-200">
                     ×
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Payment ID:</span>
                     <p className="font-mono text-gray-900">{payment.id}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Amount:</span>
                     <p className="text-gray-900">₹{(payment.amount / 100).toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Status:</span>
                     <p className="capitalize text-gray-900">{payment.status}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Method:</span>
                     <p className="capitalize text-gray-900">{payment.method}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Email:</span>
                     <p className="text-gray-900">{payment.email}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Contact:</span>
                     <p className="text-gray-900">{payment.contact}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Created:</span>
                     <p className="text-gray-900">{new Date(payment.created_at * 1000).toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="font-medium text-gray-600">Currency:</span>
                     <p className="text-gray-900">{payment.currency}</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
