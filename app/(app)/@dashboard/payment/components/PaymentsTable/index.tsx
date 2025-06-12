import { Table, TableBody, TableCell } from "@/components/shadcn/table"
import { Badge } from "@/components/shadcn/badge"
import { FileText } from "lucide-react"
import { TableHeader } from "./TableHeader"
import { PaymentTableRow } from "./TableRow"
import { TablePagination } from "./TablePagination"
import { RazorpayPayment } from "../../types"

interface PaymentsTableProps {
   payments: RazorpayPayment[]
   currentPage: number
   pageSize: number
   onPageChange: (page: number) => void
   onViewDetails: (paymentId: string) => void
   onRefund: (paymentId: string) => void
}

export function PaymentsTable({
   payments,
   currentPage,
   pageSize,
   onPageChange,
   onViewDetails,
   onRefund,
}: PaymentsTableProps) {
   const totalPages = Math.ceil(payments.length / pageSize)
   const paginatedPayments = payments.slice((currentPage - 1) * pageSize, currentPage * pageSize)

   return (
      <div>
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <Badge variant="outline" className="text-gray-600">
               {payments.length} results
            </Badge>
         </div>
         <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="overflow-x-auto">
               <Table>
                  <TableHeader />
                  <TableBody>
                     {payments.length === 0 ? (
                        <tr>
                           <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                              <div className="flex flex-col items-center gap-3">
                                 <FileText className="w-12 h-12 text-gray-300" />
                                 <div>
                                    <p className="font-medium">No transactions found</p>
                                    <p className="text-sm">Try adjusting your search criteria or create a new payment</p>
                                 </div>
                              </div>
                           </TableCell>
                        </tr>
                     ) : (
                        paginatedPayments.map((payment, index) => (
                           <PaymentTableRow
                              key={payment.id}
                              payment={payment}
                              index={index}
                              onViewDetails={onViewDetails}
                              onRefund={onRefund}
                           />
                        ))
                     )}
                  </TableBody>
               </Table>
            </div>
         </div>
         <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={payments.length}
            pageSize={pageSize}
            onPageChange={onPageChange}
         />
      </div>
   )
}
