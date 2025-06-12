// Types for Razorpay payment data
export interface RazorpayPayment {
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

export interface PaymentStats {
   totalAmount: number
   completedPayments: number
   pendingAmount: number
   successRate: number
   totalCount: number
   failedPayments: number
   refundedAmount: number
}
