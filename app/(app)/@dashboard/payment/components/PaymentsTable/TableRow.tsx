import { TableCell, TableRow as ShadcnTableRow } from "@/components/shadcn/table"
import { Button } from "@/components/shadcn/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { MoreHorizontal, Eye, FileText, RotateCcw } from "lucide-react"
import { StatusBadge } from "../StatusBadge"
import { PaymentMethodIcon } from "../PaymentMethodIcon"
import { RazorpayPayment } from "../../types"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface PaymentTableRowProps {
   payment: RazorpayPayment
   index: number
   onViewDetails: (paymentId: string) => void
   onRefund: (paymentId: string) => void
}

export function PaymentTableRow({ payment, index, onViewDetails, onRefund }: PaymentTableRowProps) {
   const handleDownloadReceipt = () => {
      const doc = new jsPDF()

      // Add header
      doc.setFontSize(20)
      doc.text("Payment Receipt", 105, 20, { align: "center" })

      // Add payment details
      const details = [
         ["Payment ID", payment.id || "N/A"],
         ["Order ID", payment.order_id || "N/A"],
         ["Email", payment.email || "N/A"],
         ["Contact", payment.contact || "N/A"],
         ["Amount", `₹${((payment.amount || 0) / 100).toFixed(2)}`],
         ["Status", payment.status || "created"],
         ["Payment Method", payment.method || "N/A"],
         ["Date", new Date((payment.created_at || 0) * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
         })],
      ]

      if ((payment.amount_refunded || 0) > 0) {
         details.push(["Refunded Amount", `₹${((payment.amount_refunded || 0) / 100).toFixed(2)}`])
      }

      autoTable(doc, {
         startY: 30,
         head: [["Field", "Value"]],
         body: details,
         theme: "grid",
         headStyles: { fillColor: [79, 70, 229] },
         styles: { fontSize: 10 },
      })

      // Add footer
      const pageHeight = doc.internal.pageSize.height
      doc.setFontSize(8)
      doc.text("This is a computer-generated receipt and does not require a signature.", 105, pageHeight - 10, { align: "center" })

      // Save the PDF
      doc.save(`payment-receipt-${payment.id}.pdf`)
   }

   return (
      <ShadcnTableRow
         className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50`}
      >
         <TableCell className="px-6 py-4">
            <div className="space-y-0.5">
               <div className="font-medium text-gray-900 text-sm">{payment.id || "N/A"}</div>
               {payment.order_id && <div className="text-xs text-gray-500">Order: {payment.order_id}</div>}
            </div>
         </TableCell>
         <TableCell className="px-6 py-4">
            <div className="space-y-0.5">
               <div className="font-medium text-gray-900 text-sm">{payment.email || "N/A"}</div>
               <div className="text-xs text-gray-500">{payment.contact || "N/A"}</div>
            </div>
         </TableCell>
         <TableCell className="px-6 py-4 text-right">
            <div className="font-bold text-gray-900">₹{((payment.amount || 0) / 100).toFixed(2)}</div>
            {(payment.amount_refunded || 0) > 0 && (
               <div className="text-xs text-red-600">
                  Refunded: ₹{((payment.amount_refunded || 0) / 100).toFixed(2)}
               </div>
            )}
         </TableCell>
         <TableCell className="px-6 py-4">
            <StatusBadge status={payment.status || "created"} />
         </TableCell>
         <TableCell className="px-6 py-4">
            <div className="flex items-center gap-2">
               <PaymentMethodIcon method={payment.method || "card"} />
               <span className="text-gray-700 font-medium capitalize">{payment.method || "N/A"}</span>
            </div>
         </TableCell>
         <TableCell className="px-6 py-4 text-gray-700 text-sm">
            {new Date((payment.created_at || 0) * 1000).toLocaleDateString("en-US", {
               month: "short",
               day: "numeric",
               year: "numeric",
            })}
         </TableCell>
         <TableCell className="px-6 py-4">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-8 w-8 p-0 rounded-full text-gray-500 hover:bg-gray-200"
                  >
                     <MoreHorizontal className="w-4 h-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(payment.id)}>
                     <Eye className="w-4 h-4 mr-2" />
                     View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadReceipt}>
                     <FileText className="w-4 h-4 mr-2" />
                     Download Receipt
                  </DropdownMenuItem>
                  {payment.status === "captured" && (
                     <DropdownMenuItem className="text-red-600" onClick={() => onRefund(payment.id)}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Refund Payment
                     </DropdownMenuItem>
                  )}
               </DropdownMenuContent>
            </DropdownMenu>
         </TableCell>
      </ShadcnTableRow>
   )
}
