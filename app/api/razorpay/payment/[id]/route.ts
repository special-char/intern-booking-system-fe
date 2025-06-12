import { type NextRequest, NextResponse } from "next/server"

const RAZORPAY_KEY_ID = process.env.RAZORPAY_ID || "rzp_test_rLHlM5IgdsvolJ"
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_SECRET || "sNAmCLOT0Mxx3AgHcDUAcMM3"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const paymentId = params.id

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    // Create basic auth header
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Razorpay API Error:", errorText)
      throw new Error(`Razorpay API error: ${response.status}`)
    }

    const payment = await response.json()

    return NextResponse.json({
      success: true,
      payment,
    })
  } catch (error) {
    console.error("Error fetching payment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch payment details",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
