import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { RazorpayPayment, PaymentStats } from "../types"

export const usePayments = () => {
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
   const { toast } = useToast()

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

   const fetchPayments = async (showToast = true) => {
      try {
         setLoading(true)
         console.log("Fetching payments and orders...")

         const [paymentsResponse, ordersResponse] = await Promise.all([
            fetch("/api/razorpay/payments"),
            fetch("/api/razorpay/orders"),
         ])

         let allTransactions: any[] = []

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

   const processRefund = async (paymentId: string, amount?: number) => {
      try {
         const response = await fetch("/api/razorpay/refund", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               paymentId,
               amount: amount ? amount * 100 : undefined,
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

   useEffect(() => {
      fetchPayments()
   }, [])

   return {
      payments,
      loading,
      refreshing,
      stats,
      fetchPayments,
      refreshPayments,
      processRefund,
   }
}
