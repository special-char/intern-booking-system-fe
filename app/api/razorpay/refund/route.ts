import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID || "rzp_test_rLHlM5IgdsvolJ"
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET || "sNAmCLOT0Mxx3AgHcDUAcMM3"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, amount, notes } = await request.json()

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    // Create basic auth header
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    const refundData: any = {}
    if (amount) refundData.amount = amount
    if (notes) refundData.notes = notes

    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refundData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Razorpay Refund API Error:", errorText)
      throw new Error(`Razorpay API error: ${response.status}`)
    }

    const refund = await response.json()

    return NextResponse.json({
      success: true,
      refund,
    })
  } catch (error) {
    console.error("Error processing refund:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process refund",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
