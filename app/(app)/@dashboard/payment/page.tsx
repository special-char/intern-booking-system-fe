"use client"

import { useState } from "react"
import { ErrorBoundary } from "@/components/payment/error-boundary"
import { usePayments } from "./hooks/usePayments"
import { PaymentsHeader } from "./components/PaymentsHeader"
import { PaymentsStats } from "./components/PaymentsStats"
import { PaymentsFilters } from "./components/PaymentsFilters"
import { PaymentsTable } from "./components/PaymentsTable"
import { PaymentDetailsModal } from "./components/PaymentDetailsModal"
import { Loader2 } from "lucide-react"
import { RazorpayPayment } from "./types"

const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("All Months")
  const [yearFilter, setYearFilter] = useState("All Years")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState<RazorpayPayment | null>(null)
  const pageSize = 10

  const { payments, loading, refreshing, stats, refreshPayments, processRefund } = usePayments()

  // Get unique years from payments
  const years = [
    "All Years",
    ...Array.from(
      new Set(
        payments.map((p) => {
          try {
            return new Date((p.created_at || 0) * 1000).getFullYear()
          } catch {
            return new Date().getFullYear()
          }
        }),
      ),
    ).map(String),
  ]

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    try {
      const matchesSearch =
        (payment.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.contact || "").includes(searchTerm) ||
        (payment.order_id && payment.order_id.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || payment.status === statusFilter
      const matchesMethod = methodFilter === "all" || payment.method === methodFilter

      const paymentDate = new Date((payment.created_at || 0) * 1000)
      const matchesMonth = monthFilter === "All Months" || paymentDate.getMonth() + 1 === months.indexOf(monthFilter)
      const matchesYear = yearFilter === "All Years" || paymentDate.getFullYear().toString() === yearFilter

      return matchesSearch && matchesStatus && matchesMethod && matchesMonth && matchesYear
    } catch (error) {
      console.error("Error filtering payment:", payment, error)
      return false
    }
  })

  // Handle export to PDF
  const handleExportPDF = async () => {
    try {
      const response = await fetch("/api/razorpay/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payments: filteredPayments }),
      })

      if (!response.ok) {
        throw new Error("Failed to export PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "razorpay_payments.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading payment data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-8">
        <PaymentsHeader onRefresh={refreshPayments} onExport={handleExportPDF} refreshing={refreshing} />
        <PaymentsStats stats={stats} />
        <PaymentsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          monthFilter={monthFilter}
          onMonthChange={setMonthFilter}
          yearFilter={yearFilter}
          onYearChange={setYearFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          methodFilter={methodFilter}
          onMethodChange={setMethodFilter}
          months={months}
          years={years}
        />
        <PaymentsTable
          payments={filteredPayments}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onViewDetails={(paymentId) => {
            const payment = payments.find((p) => p.id === paymentId)
            if (payment) setSelectedPayment(payment)
          }}
          onRefund={processRefund}
        />
        <PaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      </div>
    </div>
  )
}

export default function PaymentsPageWrapper() {
  return (
    <ErrorBoundary>
      <PaymentsPage />
    </ErrorBoundary>
  )
}
