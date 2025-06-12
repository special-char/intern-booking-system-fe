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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                     ×
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                     <span className="font-medium text-gray-600">Payment ID:</span>
                     <p className="font-mono">{payment.id}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Amount:</span>
                     <p>₹{(payment.amount / 100).toFixed(2)}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Status:</span>
                     <p className="capitalize">{payment.status}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Method:</span>
                     <p className="capitalize">{payment.method}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Email:</span>
                     <p>{payment.email}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Contact:</span>
                     <p>{payment.contact}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Created:</span>
                     <p>{new Date(payment.created_at * 1000).toLocaleString()}</p>
                  </div>
                  <div>
                     <span className="font-medium text-gray-600">Currency:</span>
                     <p>{payment.currency}</p>
                  </div>
               </div>

               {payment.notes && Object.keys(payment.notes).length > 0 && (
                  <div>
                     <span className="font-medium text-gray-600">Notes:</span>
                     <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(payment.notes, null, 2)}
                     </pre>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   )
}
