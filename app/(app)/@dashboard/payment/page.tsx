"use client"

import { CardHeader } from "@/components/shadcn/card"
import { ErrorBoundary } from "@/components/payment/error-boundary"

import { useState, useEffect } from "react"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table"
import {
  Search,
  Download,
  TrendingUp,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Calendar,
  ArrowUpRight,
  Loader2,
  Plus,
  RefreshCw,
  Eye,
  FileText,
  RotateCcw,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Badge } from "@/components/shadcn/badge"

// Types for Razorpay payment data
interface RazorpayPayment {
  id: string
  entity: string
  amount: number
  currency: string
  status: string
  order_id?: string
  invoice_id?: string
  international: boolean
  method: string
  amount_refunded: number
  refund_status?: string
  captured: boolean
  description?: string
  card_id?: string
  bank?: string
  wallet?: string
  vpa?: string
  email: string
  contact: string
  notes: Record<string, any>
  fee?: number
  tax?: number
  error_code?: string
  error_description?: string
  error_source?: string
  error_step?: string
  error_reason?: string
  acquirer_data: Record<string, any>
  created_at: number
}

interface PaymentStats {
  totalAmount: number
  completedPayments: number
  pendingAmount: number
  successRate: number
  totalCount: number
  failedPayments: number
  refundedAmount: number
}

// Component for displaying payment status
function StatusBadge({ status }: { status: string }) {
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

// Component for displaying payment method icons
function PaymentMethodIcon({ method }: { method: string }) {
  const iconMap = {
    card: CreditCard,
    netbanking: DollarSign,
    wallet: TrendingUp,
    upi: CreditCard,
    emi: CreditCard,
    order: FileText,
  }

  const Icon = iconMap[method as keyof typeof iconMap] || CreditCard
  return <Icon className="w-4.5 h-4.5 text-gray-500" />
}

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
  const [payments, setPayments] = useState<RazorpayPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState<PaymentStats>({
    totalAmount: 0,
    completedPayments: 0,
    pendingAmount: 0,
    successRate: 0,
    totalCount: 0,
    failedPayments: 0,
    refundedAmount: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("All Months")
  const [yearFilter, setYearFilter] = useState("All Years")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState<RazorpayPayment | null>(null)
  const pageSize = 10
  const { toast } = useToast()

  // Fetch payments from Razorpay
  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async (showToast = true) => {
    try {
      setLoading(true)
      console.log("Fetching payments and orders...")

      // Fetch both payments and orders
      const [paymentsResponse, ordersResponse] = await Promise.all([
        fetch("/api/razorpay/payments"),
        fetch("/api/razorpay/orders"),
      ])

      let allTransactions: any[] = []

      // Process payments
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json()
        if (paymentsData.success && Array.isArray(paymentsData.payments)) {
          const validPayments = paymentsData.payments.filter(
            (payment: RazorpayPayment) =>
              payment &&
              typeof payment === "object" &&
              payment.id &&
              typeof payment.amount === "number" &&
              typeof payment.created_at === "number",
          )
          allTransactions = [...allTransactions, ...validPayments]
        }
      }

      // Process orders
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        if (ordersData.success && Array.isArray(ordersData.orders)) {
          const validOrders = ordersData.orders
            .filter(
              (order: RazorpayPayment) =>
                order &&
                typeof order === "object" &&
                order.id &&
                typeof order.amount === "number" &&
                typeof order.created_at === "number",
            )
            .map((order: RazorpayPayment) => ({
              ...order,
              entity: "order",
              method: "order",
              email: order.notes?.email || "N/A",
              contact: order.notes?.contact || "N/A",
              amount_refunded: 0,
            }))
          allTransactions = [...allTransactions, ...validOrders]
        }
      }

      // Sort by creation date (newest first)
      allTransactions.sort((a, b) => b.created_at - a.created_at)

      setPayments(allTransactions)
      calculateStats(allTransactions)

      if (showToast) {
        toast({
          title: "Success",
          description: `Loaded ${allTransactions.length} transactions from Razorpay`,
        })
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

      if (showToast) {
        toast({
          title: "Error Loading Transactions",
          description: errorMessage,
          variant: "destructive",
        })
      }

      setPayments([])
      setStats({
        totalAmount: 0,
        completedPayments: 0,
        pendingAmount: 0,
        successRate: 0,
        totalCount: 0,
        failedPayments: 0,
        refundedAmount: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const refreshPayments = async () => {
    setRefreshing(true)
    await fetchPayments(false)
    setRefreshing(false)
    toast({
      title: "Refreshed",
      description: "Payment data has been updated",
    })
  }

  const calculateStats = (paymentsData: RazorpayPayment[]) => {
    try {
      const totalAmount = paymentsData.reduce((sum, payment) => {
        const amount = typeof payment.amount === "number" ? payment.amount : 0
        return sum + amount / 100
      }, 0)

      const completedPayments = paymentsData.filter((p) => p.status === "captured").length
      const failedPayments = paymentsData.filter((p) => p.status === "failed").length

      const pendingAmount = paymentsData
        .filter((p) => p.status === "authorized" || p.status === "created")
        .reduce((sum, p) => {
          const amount = typeof p.amount === "number" ? p.amount : 0
          return sum + amount / 100
        }, 0)

      const refundedAmount = paymentsData.reduce((sum, payment) => {
        const amount = typeof payment.amount_refunded === "number" ? payment.amount_refunded : 0
        return sum + amount / 100
      }, 0)

      const successRate = paymentsData.length > 0 ? (completedPayments / paymentsData.length) * 100 : 0

      setStats({
        totalAmount,
        completedPayments,
        pendingAmount,
        successRate,
        totalCount: paymentsData.length,
        failedPayments,
        refundedAmount,
      })
    } catch (error) {
      console.error("Error calculating stats:", error)
    }
  }

  // View payment details
  const viewPaymentDetails = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/razorpay/payment/${paymentId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedPayment(data.payment)
      } else {
        throw new Error("Failed to fetch payment details")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch payment details",
        variant: "destructive",
      })
    }
  }

  // Process refund
  const processRefund = async (paymentId: string, amount?: number) => {
    try {
      const response = await fetch("/api/razorpay/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          amount: amount ? amount * 100 : undefined, // Convert to paise
          notes: {
            reason: "Refund requested from dashboard",
            processed_by: "admin",
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Refund Processed",
          description: `Refund ID: ${data.refund.id}`,
        })
        // Refresh payments to show updated data
        refreshPayments()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to process refund")
      }
    } catch (error) {
      toast({
        title: "Refund Failed",
        description: error instanceof Error ? error.message : "Failed to process refund",
        variant: "destructive",
      })
    }
  }

  // Filter payments with safe checks
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

  // Get unique years from payments with safe checks
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

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / pageSize)
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Export to PDF
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

      toast({
        title: "Success",
        description: "Payment data exported successfully!",
      })
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      })
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
        {/* Header Section */}
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
            <Button onClick={refreshPayments} disabled={refreshing} variant="outline" className="gap-2">
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <div className="flex items-center gap-3">
              <Button
                className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                onClick={handleExportPDF}
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Export PDF</span>
              </Button>
            </div>

          </div>
        </div>




        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">₹{stats.totalAmount.toFixed(2)}</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>{stats.totalCount} transactions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-500">Completed Payments</div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{stats.completedPayments}</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span>Successfully captured</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-500">Failed Payments</div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{stats.failedPayments}</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-red-600 font-medium">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>Payment failures</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-500">Success Rate</div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{stats.successRate.toFixed(1)}%</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-purple-600 font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Payment success rate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          <div className="relative flex-1 max-w-full w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
              placeholder="Search by payment ID, email, contact, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-10 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-gray-800 transition-all placeholder-gray-400 w-full"
            />
          </div>

          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-[140px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors text-xs h-9">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-[120px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors text-xs h-9">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-[150px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors text-xs h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="captured">Captured</SelectItem>
              <SelectItem value="authorized">Authorized</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-full sm:w-auto sm:max-w-[150px] border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors text-xs h-9">
              <SelectValue placeholder="All Methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="netbanking">Net Banking</SelectItem>
              <SelectItem value="wallet">Wallet</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="order">Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payments Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <Badge variant="outline" className="text-gray-600">
              {filteredPayments.length} results
            </Badge>
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b border-gray-200">
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment ID
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                      Amount
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Method
                    </TableHead>
                    <TableHead className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                          <FileText className="w-12 h-12 text-gray-300" />
                          <div>
                            <p className="font-medium">No transactions found</p>
                            <p className="text-sm">Try adjusting your search criteria or create a new payment</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPayments.map((payment, index) => (
                      <TableRow
                        key={payment.id}
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
                              <DropdownMenuItem onClick={() => viewPaymentDetails(payment.id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                Download Receipt
                              </DropdownMenuItem>
                              {payment.status === "captured" && (
                                <DropdownMenuItem className="text-red-600" onClick={() => processRefund(payment.id)}>
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Refund Payment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
            <div className="text-sm text-gray-600">
              <span>Showing </span>
              <span className="font-semibold">{paginatedPayments.length}</span>
              <span> of </span>
              <span className="font-semibold">{filteredPayments.length}</span>
              <span> transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                const pageNum = currentPage <= 3 ? idx + 1 : currentPage - 2 + idx
                if (pageNum > totalPages) return null
                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="sm"
                    className={currentPage === pageNum ? "bg-indigo-50 text-indigo-700 border-indigo-300" : ""}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Payment Details</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Payment ID:</span>
                    <p className="font-mono">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Amount:</span>
                    <p>₹{(selectedPayment.amount / 100).toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Status:</span>
                    <p className="capitalize">{selectedPayment.status}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Method:</span>
                    <p className="capitalize">{selectedPayment.method}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p>{selectedPayment.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Contact:</span>
                    <p>{selectedPayment.contact}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Created:</span>
                    <p>{new Date(selectedPayment.created_at * 1000).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Currency:</span>
                    <p>{selectedPayment.currency}</p>
                  </div>
                </div>

                {selectedPayment.notes && Object.keys(selectedPayment.notes).length > 0 && (
                  <div>
                    <span className="font-medium text-gray-600">Notes:</span>
                    <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(selectedPayment.notes, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
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
